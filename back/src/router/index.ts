import * as trpc from '@trpc/server';
import { postRouter } from './post';
import { userRouter } from './user';

const logger = console;

export const appRouter = trpc
  .router()
  .middleware(async ({ path, type, next }) => {
    const start = Date.now();
    const result = await next();
    const durationMs = Date.now() - start;
    result.ok
      ? logger.log(`[OK] ${type}: ${path} ${durationMs}ms`)
      : logger.log(`[ERROR] ${type}: ${path} ${durationMs}ms`);
    return result;
  })
  .merge('user.', userRouter)
  .merge('post.', postRouter)

export type AppRouter = typeof appRouter;
