import * as trpc from '@trpc/server';
import { postRouter } from './post';
import { userRouter } from './user';

export const appRouter = trpc
  .router()
  .merge('user.', userRouter)
  .merge('post.', postRouter);

export type AppRouter = typeof appRouter;
