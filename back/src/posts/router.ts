import * as trpc from '@trpc/server';
import { z } from 'zod';
import { fakeRepo } from './repository';
import { postSchema } from './schema';

export const postRouter = trpc
  .router()
  .query('all', {
    output: z.array(postSchema),
    async resolve() {
      return fakeRepo.all();
    },
  })
  .mutation('create', {
    input: postSchema,
    async resolve({ input }) {
      fakeRepo.add(input);
    },
  })
  .mutation('delete', {
    input: z.object({ message : z.string()}),
    async resolve({ input }) {
      fakeRepo.delete(input.message);
    },
  })
  .mutation('modify', {
    input: z.object({
      targetMessage: z.string(),
      newMessage: z.string(),
    }),
    async resolve({input}){
      fakeRepo.modify(input)
    }
  });
