export type Role = "shop" | "client";
export type Login = { email: string; password: string };
export type Register = {
  name: string;
  email: string;
  password: string;
  role: Role
};
export type UserInfo = {
  id?: string;
  email: string;
  name?: string;
  //avatar: string;
  role: Role;
};
