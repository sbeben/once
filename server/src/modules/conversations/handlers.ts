import { PostgrestError } from "@supabase/supabase-js";
import { db } from "../../../index.js";
import { DBResponse } from "../db/types.js";
import { findUserById } from "../users/handlers.js";
import {
  ConversationRes,
  ConversationsRes,
  DBConversation,
  DBMessage,
} from "./types.js";

export const findUserRooms = async (
  userId: string
): DBResponse<DBConversation[]> => {
  const { data, error } = (await db
    .from("conversations")
    .select()
    .contains("users", [userId])) as any;
  return { data, error };
};

export const findRoomUsers = async (roomId: string): DBResponse<string[]> => {
  const { data, error } = await db
    .from("conversations")
    .select("users")
    .eq("id", roomId)
    .single();
  return { data: data?.users, error };
};

export const findRoomMessages = async (
  roomId: string
): DBResponse<DBMessage[]> => {
  const { data, error } = (await db
    .from("messages")
    .select()
    .eq("room", roomId)) as any;
  return { data, error };
};

//TODO handle errors
export const getRoomList = async (
  userId: string
): DBResponse<ConversationsRes> => {
  const { data: self, error: selfError } = await findUserById(userId);
  if (!self) return { data: null, error: selfError };
  const { data: conversations, error } = await findUserRooms(userId);
  let result: { data: ConversationsRes; error: PostgrestError | null } = {
    data: [],
    error,
  };
  if (conversations) {
    const promises = conversations.map(async (conv) => {
      //get messages of room at first
      const { data: messages, error: messErr } = await findRoomMessages(
        conv.id
      );
      const mappedMessages =
        messages?.map((message) => {
          let isMe = false;
          if (message.sender === userId) {
            isMe = true;
          }
          return { ...message, isMe };
        }) || null;
      if (messErr) {
        result.error = messErr;
      }
      //then map users to room object
      const otherUsers = conv.users.filter((uId) => uId !== userId);
      const promisedUsers = otherUsers.map(async (u) => {
        const { data: roomUser, error: roomUserError } = await findUserById(u);
        if (roomUser) {
          //probably dont need isMe
          return { id: roomUser.id, name: roomUser.name, isMe: false };
        } else {
          return null;
        }
      });
      const resolvedUsers = await Promise.all(promisedUsers);
      return {
        ...conv,
        messages: mappedMessages,
        users: [...resolvedUsers, { id: self.id, name: self.name, isMe: true }],
      };
    });
    const resolved = await Promise.all(promises);
    result = { data: resolved, error };
  }
  return result;
};

export const isConversationExist = async (
  userIds: string[]
): DBResponse<ConversationRes> => {
  const { data, error } = (await db
    .from("conversations")
    .select()
    .contains("users", userIds)
    .single()) as any;
  if (data) return { data, error: null };
  return { data: null, error };
};

export const createConversation = async (
  userIds: string[]
): DBResponse<DBConversation> => {
  const { data, error } = (await db
    .from("conversations")
    .insert({ users: userIds })
    .select()
    .single()) as any;
  return { data, error };
};

export const createAndRetrieveConversation = async (
  userId: string,
  creatorId: string
): DBResponse<ConversationRes> => {
  const { data, error } = await createConversation([userId, creatorId]);
  if (!data) return { data: null, error };
  const promisedUsers = data.users.map(async (uId) => {
    const { data: user, error: userErr } = await findUserById(uId);
    if (user) {
      return {
        id: user.id,
        name: user.name,
        isMe: user.id === creatorId ? true : false,
      };
    } else {
      return null;
    }
  });
  const users = await Promise.all(promisedUsers);
  return { data: { ...data, messages: null, users }, error };
};

//TODO recreate this with rpc call if needed https://github.com/supabase/supabase/discussions/1570
export const createMessage = async ({
  room,
  sender,
  text,
}: {
  room: string;
  sender: string;
  text: string;
}): DBResponse<DBMessage> => {
  const { data, error } = (await db
    .from("messages")
    .insert({ room, sender, text })
    .select()
    .single()) as any;
  // const { data: roomData, error: roomErr } = await db
  //   .from("conversations")
  //   .select()
  //   .eq("id", roomId)
  //   .single();
  // const newMessages = [...roomData.messages, message.id];
  // const { data: updatedRoom, error: updRoomErr } = await db
  //   .from("conversations")
  //   .update({ messages: newMessages })
  //   .eq("id", roomId);
  return { data, error };
};
