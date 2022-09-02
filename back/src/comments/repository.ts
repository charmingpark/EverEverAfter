import type { PostT } from "../posts/schema";
import type { CommentT } from "./schema";

export interface ICommentRepository {
  getCommentsByPostId: (postId: PostT["id"]) => Promise<CommentT[]>;
  addCommentToPost: (
    postId: PostT["id"],
    newComment: Omit<CommentT, "id">
  ) => Promise<void>;
  updateComment: (
    postId: PostT["id"],
    commentId: CommentT["id"],
    newMessage: CommentT["message"]
  ) => Promise<void>;
  deleteComment: (
    postId: PostT["id"],
    commentId: CommentT["id"]
  ) => Promise<void>;
}

type _FakeDB = {
  [postId: PostT["id"]]: CommentT[];
};
// post가 하나 작성되어있다고 가정했다.
export function FakeCommentRepo(init: _FakeDB): ICommentRepository {
  let _fakeDB = init;

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
        throw Error("404 not found");
      }

      return comments;
    },
    async addCommentToPost(postId, newComment) {
      const comments = _fakeDB[postId];
      if (comments === undefined) {
        throw Error("404 not found");
      }

      _count++;
      comments.push({
        id: _count,
        ...newComment,
      });
    },
    async updateComment(
      postId,
      commentId,
      newMessage,
    ) {
      const comments = _fakeDB[postId];
      if(!comments){
        //에러메세지 어떻게 쓸 지 모르겠어요...
        throw Error('????')
      }
      
      const targetComment = comments.find(comment=> comment.id == commentId);
      if(!targetComment){
        throw Error('????')
      }

      targetComment.message = newMessage;
    },
    async deleteComment (
      postId,
      commentId,
    ) {
      const comments = _fakeDB[postId];
      if(!comments){
        throw Error('????')
      }
      
      const targetComment = comments.find(comment=> comment.id == commentId);
      if(!targetComment){
        throw Error('????')         
      }

      _fakeDB[postId] = comments.filter(comment=> comment !== targetComment)
    }
  };
}
