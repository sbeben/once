import { FieldChange } from "../api/types";

export type GoToChat = { userId: string };

export type WSConversation = {
  id: string;
  //name: string;
  users: { id: string; name: string; isMe: boolean }[];
  messages: {
    id: string;
    text: string;
    //files: string[];
    sender: string;
    room: string;
    created_at: string;
    updated_at: string;
    isMe: boolean;
  }[];
  created_at: string;
  updated_at: string;
};

export type WSMessage = {
  id: string;
  room: string;
  text: string;
  sender: string;
  isMe: boolean;
  created_at: string;
  updated_at: string;
};

export type WSEventReceived =
  | {
      type: "roomMessage";
      data: WSMessage;
    }
  | {
      type: "roomList";
      data: WSConversation[];
    }
  | { type: "roomCreated"; data: WSConversation }
  | { type: "roomJoined"; data: { id: string } };

export type MessageDraft = {
  text: string;
  //files: File[]
};

export type MessageFormData = {
  room: string;
} & MessageDraft;

export type MessageDraftChange = FieldChange<MessageDraft>;
