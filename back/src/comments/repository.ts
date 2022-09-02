import { invariant } from '../invariant';
import type { CommentT } from './schema';

export interface ICommentRepository {
  getCommentsByPostId: (postId: CommentT['postId']) => Promise<CommentT[]>;
  addCommentToPost: (
    postId: CommentT['postId'],
    message: CommentT['message']
  ) => Promise<void>;
  updateComment: (
    postId: CommentT['postId'],
    commentId: CommentT['id'],
    newMessage: CommentT['message']
  ) => Promise<void>;
  deleteComment: (
    postId: CommentT['postId'],
    commentId: CommentT['id']
  ) => Promise<void>;
  deleteCommentsInPost: (
    postId: CommentT['postId'],
  ) => Promise<void>;
}

type _FakeDB = CommentT[];

// post가 하나 작성되어있다고 가정했다.
export function FakeCommentRepo(init: _FakeDB): ICommentRepository {
  let _fakeDB = init;

  let _count = Math.max(0, ...init.map((comment) => comment.id));

  async function _getCommentById(
    postId: CommentT['postId'],
    commentId: CommentT['id']
  ) {
    const comment = _fakeDB.find(
      (comment) => comment.postId === postId && comment.id == commentId
    );
    invariant(comment !== undefined, `코멘트<${commentId}>가 존재하지 않습니다`);
    return comment;
  }

  return {
    async getCommentsByPostId(postId) {
      return _fakeDB.filter((comment) => comment.postId === postId);
    },
    async addCommentToPost(postId, message) {
      _count++;
      const newComment = {
        id: _count,
        message,
        postId,
      };
      _fakeDB = [..._fakeDB, newComment];
    },
    async updateComment(postId, commentId, newMessage) {
      const targetComment = await _getCommentById(postId, commentId);

      targetComment.message = newMessage;
    },
    async deleteComment(postId, commentId) {
      const targetComment = await _getCommentById(postId, commentId);

      _fakeDB = _fakeDB.filter((comment) => comment !== targetComment);
    },
    async deleteCommentsInPost(postId){
      _fakeDB = _fakeDB.filter((comment) => comment.postId !== postId);
    }
  };
}
