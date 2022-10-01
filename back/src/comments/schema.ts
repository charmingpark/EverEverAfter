import { z } from 'zod';
import { postSchema } from '../posts/schema';

export const commentSchema = z.object({
  id: z.number(),
  message: z.string().min(1),
  postId: postSchema.shape.id
});

export type CommentT = z.infer<typeof commentSchema>;
