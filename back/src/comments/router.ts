import { z } from 'zod';
import { createRouter } from '../createRouter';
import { invariant } from '../invariant';
import { commentSchema } from './schema';

export const commentRouter = createRouter()
  .query('read', {
    // input: postSchema.pick({ id: true }),
    // postSchema의 id를 활용하는것이 목적성에 맞을까?
    // 처음에는 postSchema의 타입을 활용해야한다고 생각했는데
    // request를 보내주는것을 이미 front가 알고있기에 이렇게 사용해도 무방하다 생각되어 이렇게 작성했다.
    input: z.object({
      postId: z.number(),
    }),
    output: z.array(commentSchema),
    async resolve({ input: { postId }, ctx }) {
      invariant(await ctx.postRepo.has(postId), '404 not found');

      return ctx.commentRepo.getCommentsByPostId(postId);
    },
  })
  .mutation('create', {
    input: z.object({
      // id: postSchema.pick({ id: true}),
      id: z.number(),
      message: commentSchema.shape.message,
    }),
    async resolve({ input, ctx }) {
      invariant(await ctx.postRepo.has(input.id), '404 not found');

      return ctx.commentRepo.addCommentToPost(input.id, input.message);
    },
  })
  .mutation('update', {
    input: z.object({
      postId: z.number(),
      commentId: z.number(),
      message: z.string(),
    }),
    async resolve({ input: { postId, commentId, message }, ctx }) {
      invariant(await ctx.postRepo.has(postId), '404 not found');

      return ctx.commentRepo.updateComment(postId, commentId, message);
    },
  })
  .mutation('delete', {
    input: z.object({
      postId: z.number(),
      commentId: z.number(),
    }),
    async resolve({ input: { postId, commentId }, ctx }) {
      invariant(await ctx.postRepo.has(postId), '404 not found');

      return ctx.commentRepo.deleteComment(postId, commentId);
    },
  });
