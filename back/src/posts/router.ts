
import { z } from 'zod';
import { createRouter } from '../createRouter';
import { postSchema } from './schema';

export const postRouter = createRouter()
  .query('all', {
    output: z.array(postSchema),
    async resolve({ ctx }) {
      return ctx.postRepo.all();
    },
  })
  .mutation('create', {
    input: postSchema.omit({ id: true }),
    async resolve({ input, ctx }) {
      return ctx.postRepo.add(input);
    },
  })
  .mutation('delete', {
    input: z.object({
      targetId: z.number(),
    }),
    async resolve({ input, ctx }) {
      await ctx.commentRepo.deleteCommentsInPost(input.targetId);

      return ctx.postRepo.delete(input.targetId);
    },
  })
  .mutation('modify', {
    input: z.object({
      targetId: z.number(),
      newMessage: z.string(),
    }),
    async resolve({ input, ctx }) {
      return ctx.postRepo.modify(input);
    },
  });
