import * as trpc from '@trpc/server';
import { z } from 'zod';
import type { CommentRepoContext } from './CommentRepoContext';
import { commentSchema } from './schema';

export const commentRouter = trpc
  .router<CommentRepoContext>()
  .query('read', {
    // input: postSchema.pick({ id: true}),
    // postSchema의 id를 활용하는것이 목적성에 맞을까?
    // 처음에는 postSchema의 타입을 활용해야한다고 생각했는데
    // request를 보내주는것을 이미 front가 알고있기에 이렇게 사용해도 무방하다 생각되어 이렇게 작성했다.
    input: z.number(),
    output: z.array(commentSchema),
    async resolve({ input, ctx }) {
      return ctx.commentRepo.getCommentsByPostId(input);
    },
  })
  .mutation('create', {
    input: z.object({
      // id: postSchema.pick({ id: true}),
      id: z.number(),
      comment: commentSchema.omit({ id: true }),
    }),
    async resolve({ input, ctx }) {
      ctx.commentRepo.addCommentToPost(input.id, input.comment);
    },
  })
  .mutation('update', {
    input: z.object({
      postId: z.number(),
      commentId: z.number(),
      message: z.string() 
    }),
    async resolve({ input: { postId, commentId, message }, ctx }) {
      ctx.commentRepo.updateComment(postId, commentId, message)
    },  
  })
  .mutation('delete', {
    input: z.object({
      postId: z.number(),
      commentId: z.number(),
    }),
    async resolve({ input : { postId, commentId }, ctx }) {
      ctx.commentRepo.deleteComment(postId, commentId);
    },  
  });