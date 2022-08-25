import type { PostT } from '../posts/schema';
import type { CommentT } from './schema';

export interface CommentRepository {
  getCommentsByPostId: (postId: PostT['id']) => Promise<CommentT[]>;
  addCommentToPost: (
    postId: PostT['id'],
    newComment: Omit<CommentT, 'id'>,
  ) => Promise<void>;
}

type _FakeDB = {
  [postId: PostT['id']]: CommentT[];
};
// post가 하나 작성되어있다고 가정했다.
export function FakeRepo(init: _FakeDB = { 1: [] }): CommentRepository {
  let _fakeDB = init;

  let _count = Math.max(
    0,
    ...Object.values(init).flatMap((comments) =>
      comments.map((comment) => comment.id),
    ),
  );

  return {
    async getCommentsByPostId(postId) {
      if (!(postId in _fakeDB)) {
        throw Error('404 not found');
      }

      return _fakeDB[postId]!;
    },
    async addCommentToPost(postId, newComment) {
      if (!(postId in _fakeDB)) {
        throw Error('404 not found');
      }

      _count++;

      _fakeDB[postId]!.push({
        id: _count,
        ...newComment,
      });
    },
  };
}

export const fakeRepo: CommentRepository = FakeRepo();
