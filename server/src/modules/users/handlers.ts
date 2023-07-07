import { db } from "../../../index.js";
import { DBResponse } from "../db/types.js";
import { CreateUser, DBUser } from "./types.js";

export const findUserByEmail = async (email: string): DBResponse<DBUser> => {
  const { data, error } = (await db
    .from("users")
    .select()
    .eq("email", email)
    .single()) as any;
  return { data, error };
};

export const findUserById = async (id: string): DBResponse<DBUser> => {
  const { data, error } = (await db
    .from("users")
    .select()
    .eq("id", id)
    .single()) as any;
  return { data, error };
};

//TODO handle schema
export const createUser = async (user: CreateUser): DBResponse<DBUser> => {
  const { data, error } = (await db
    .from("users")
    .insert(user)
    .select()
    .single()) as any;
  console.log(data, error);
  return { data, error };
};

export const searchUser = async (query: string): DBResponse<DBUser> => {
  const { data, error } = (await db
    .from("users")
    .select()
    .ilike("name", `%${query}%`)) as any;
  return { data, error };
};
