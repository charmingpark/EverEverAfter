import { z } from "zod";

export const commentSchema = z.object({
  id: z.number(),
  message: z.string().min(1),
});

export type CommentT = z.infer<typeof commentSchema>;