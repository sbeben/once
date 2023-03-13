export type FetchedUser = {
  id: string;
  email: string;
  name: string;
  password?: string;
  //avatar: string
  created_at: string;
  updated_at: string;
  role: "client";
};

export type FetchedMessage = {
  id: string;
  text: string;
  //files: string[]
  sender: string;
  room: string;
  isMe: boolean;
  created_at: string;
  updated_at: string;
};

export type FetchedConversation = {
  id: string;
  //name: string
  users: { id: string; name: string; isMe: boolean }[];
  messages: FetchedMessage[];
  created_at: string;
  updated_at: string;
};

export type FetchedPost = {
  id: string;
  author?: FetchedUser;
  text: string;
  //images: string[];
  created_at: string;
  updated_at: string;
};

export type FetchedProfile = {
  user: FetchedUser;
  posts: FetchedPost[];
};
