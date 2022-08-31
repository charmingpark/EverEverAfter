import { commentRouter } from './comments/router';
import { createRouter } from './createRouter';
import { postRouter } from './posts/router';
import { userRouter } from './users/user';

export const appRouter = createRouter()
  .merge('post.', postRouter)
  .merge('comment.', commentRouter)
  .merge('user.', userRouter);

export type AppRouter = typeof appRouter;
