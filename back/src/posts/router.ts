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
    input: postSchema
      .omit({ id: true }),
    async resolve({ input }) {
      fakeRepo.add(input);
    },
  })
  .mutation('delete', {
    input: z.object({ 
      targetId: z.number()
    }),
    async resolve({ input }) {
      fakeRepo.delete(input.targetId);
    },
  })
  .mutation('modify', {
    input: z.object({
      targetId: z.number(),
      newMessage: z.string(),
    }),
    async resolve({input}){
      fakeRepo.modify(input)
    }
  });
