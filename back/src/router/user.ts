import * as trpc from '@trpc/server';
import { z } from 'zod';

const userSchema = z.object({ name: z.string().min(5) });
type UserT = z.infer<typeof userSchema>;

let fakeDB: UserT[] = [];

export const userRouter = trpc
  .router()
  .query('get', {
    async resolve() {
      return fakeDB;
    },
  })
  .mutation('create', {
    input: userSchema,
    async resolve({ input }) {
      fakeDB = [...fakeDB, input];
      console.log('fakeDB', fakeDB);
    },
  })
  .mutation('clear', {
    input: z.object({}),
    async resolve() {
      fakeDB = [];
    },
  });
