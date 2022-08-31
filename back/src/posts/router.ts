import * as trpc from '@trpc/server';
import { z } from 'zod';
import { postSchema } from './schema';
import type { PostRepoContext } from './PostRepoContext';

export const postRouter = trpc
  .router<PostRepoContext>()
  .query('all', {
    output: z.array(postSchema),
    async resolve({ ctx }) {
      return ctx.postRepo.all();
    },
  })
  .mutation('create', {
    input: postSchema.omit({ id: true }),
    async resolve({ input, ctx }) {
      ctx.postRepo.add(input);
    },
  })
  .mutation('delete', {
    input: z.object({
      targetId: z.number(),
    }),
    async resolve({ input, ctx }) {
      ctx.postRepo.delete(input.targetId);
    },
  })
  .mutation('modify', {
    input: z.object({
      targetId: z.number(),
      newMessage: z.string(),
    }),
    async resolve({ input, ctx }) {
      ctx.postRepo.modify(input);
    },
  });
