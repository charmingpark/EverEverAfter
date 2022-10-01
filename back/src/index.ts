import * as trpc from '@trpc/server';
import { commentRouter } from './comments/router';
import type { ContextT } from './createContext';
import { postRouter } from './posts/router';
import { userRouter } from './users/user';

export const appRouter = trpc
  .router<ContextT>()
  .merge('post.', postRouter)
  .merge('comment.', commentRouter)
  .merge('user.', userRouter);

export type AppRouter = typeof appRouter;
