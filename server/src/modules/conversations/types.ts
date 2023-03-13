export type DBMessage = {
  id: string;
  text: string;
  //files: string[];
  sender: string;
  room: string;
  createdAt: string;
  updatedAt: string;
};

export type DBConversation = {
  id: string;
  //name: string;
  users: string[];
  //TODO there's no need for messages i think
  //messages: string[] | null;
  createdAt: string;
  updatedAt: string;
};

type ConversationUser = { id: string; name: string; isMe: boolean } | null;

type ConversationMessage = {
  id: string;
  text: string;
  //files: string[];
  sender: string;
  room: string;
  createdAt: string;
  updatedAt: string;
  isMe: boolean;
};

type Conversation = {
  id: string;
  //name: string;
  users: ConversationUser[];
  messages: ConversationMessage[] | null;
  createdAt: string;
  updatedAt: string;
};

export type ConversationRes = Conversation | null;

export type ConversationsRes = Conversation[] | null;
