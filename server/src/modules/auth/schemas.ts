// export type Login = { email: string; password: string };
import z from "zod";
import { UserResponse } from "../users/schemas.js";
export const LoginSchema = z.object({
  email: z
    .string()
    .nonempty("E-mail should be provided")
    .email("Please provide a valid e-mail"),
  password: z.string().nonempty("There shoud be a password"),
});

export const LoginSuccess = UserResponse;

export const RegisterSchema = z.object({
  name: z
    .string()
    .nonempty("Please specify tour name")
    .min(4, "Name should be at least 4 letters long")
    .max(32, "Name is to long"),
  email: z
    .string()
    .nonempty("E-mail should be provided")
    .email("Please provide a valid e-mail"),
  password: z
    .string()
    .nonempty("Please provide password")
    .min(4, "Password should be at least 4 letters long")
    .max(32, "Password is to long"),
  role: z.literal("client"),
});

export const RegisterSuccess = UserResponse;

export const UserFromJWT = z.object({
  user: z.object({ id: z.string(), role: z.literal("client") }),
});
