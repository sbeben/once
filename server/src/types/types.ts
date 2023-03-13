export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  id: string;
  text: string;
  files: string[];
  sender: string;
  room: string;
  createdAt: string;
  updatedAt: string;
};

export type Room = {
  id: string;
  name: string;
  users: string[];
  messages: Message[];
  createdAt: string;
  updatedAt: string;
};
