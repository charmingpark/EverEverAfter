import type { PostT } from '../posts/schema';
import type { CommentT } from './schema';

export interface ICommentRepository {
  getCommentsByPostId: (postId: PostT['id']) => Promise<CommentT[]>;
  addCommentToPost: (
    postId: PostT['id'],
    newComment: Omit<CommentT, 'id'>
  ) => Promise<void>;
}

type _FakeDB = {
  [postId: PostT['id']]: CommentT[];
};
// post가 하나 작성되어있다고 가정했다.
export function FakeCommentRepo(init: _FakeDB): ICommentRepository {
  const _fakeDB = init;

  let _count = Math.max(
    0,
    ...Object.values(init).flatMap((comments) =>
      comments.map((comment) => comment.id)
    )
  );

  return {
    async getCommentsByPostId(postId) {
      const comments = _fakeDB[postId];
      if (comments === undefined) {
        throw Error('404 not found');
      }

      return comments;
    },
    async addCommentToPost(postId, newComment) {
      const comments = _fakeDB[postId];
      if (comments === undefined) {
        throw Error('404 not found');
      }

      _count++;
      comments.push({
        id: _count,
        ...newComment,
      });
    },
  };
}
