import * as trpc from '@trpc/server';
import { z } from 'zod';

const userSchema = z.object({ name: z.string().min(5) })
type UserT = z.infer<typeof userSchema>;

let fakeDB: UserT[] = [];

export const appRouter = trpc
  .router()
  .query('getUsers', {
    async resolve() {
      return fakeDB;
    },
  })
  .mutation('createUser', {
    input: userSchema,
    async resolve({ input }) {
      fakeDB = [...fakeDB, input];
    },
  })
  .mutation('clearUser', {
    input: z.object({}),
    async resolve() {
      fakeDB = [];
    },
  })

// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter;
