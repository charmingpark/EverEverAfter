import * as trpc from '@trpc/server';
import { z } from 'zod';

const postSchema = z.object({
  message: z.string().min(1),
  images: z.array(z.string().url()),
});

type PostT = z.infer<typeof postSchema>;

let fakeDB: PostT[] = [];

export const postRouter = trpc
  .router()
  .query('all', {
    output: z.array(postSchema),
    async resolve() {
      return fakeDB;
    },
  })
  .mutation('create', {
    input: postSchema,
    async resolve({ input }) {
      fakeDB = [...fakeDB, input];
    },
  });
