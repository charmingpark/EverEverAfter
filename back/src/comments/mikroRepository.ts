import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { PostEntity } from '../posts/mikroEntity';
import { CommentEntity } from './mikroEntity';
import { ICommentRepository } from './repository';

export function MikroCommentRepository(
  em: MikroORM<SqliteDriver>['em']
): ICommentRepository {
  return {
    async getCommentsByPostId(postId) {
      const list = await em.qb(CommentEntity)
        .select(['id', 'message'])
        .where({post : {id : postId}})
        .execute()
 
      return list.map(e=> ({ ...e, postId }))
    },
    async addCommentToPost(postId, message) {
      const post = em.getReference<PostEntity>(PostEntity, postId);

      await em.qb(CommentEntity).insert({
        message,
        post
      })
    },
    async updateComment(postId, commentId, newMessage) {
      return em.qb(CommentEntity)
        .update({ message: newMessage })
        .where({ id: commentId, post: { id: postId } })
        .execute();
    },
    async deleteComment(postId, commentId) {
      return em.qb(CommentEntity)
        .delete({
          id: commentId,
          post: { id: postId }
        })
        .execute();
    },
    async deleteCommentsInPost(postId){
      return em.qb(CommentEntity)
        .delete({ post: { id: postId } })
        .execute();
    }
  };
}