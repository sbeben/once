import z from "zod";
import { UserResponse } from "../users/schemas.js";

export const ProfileSchema = z.object({
  id: z.string(), //z.union([z.string().uuid(), z.literal("me")]),
});

export const ProfileSuccess = z.object({ user: UserResponse });
//TODO later concat with UserResponse.merge(Posts)
