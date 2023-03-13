export type Role = "client" | "shop";

export type CreateUser = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

export type DBUser = {
  id: string;
  email: string;
  name: string;
  password: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};
