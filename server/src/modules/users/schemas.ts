import z from "zod";

export const UserResponse = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string(),
  role: z.literal("client"),
});
