import { PostT } from '../posts/schema';
import { ICommentRepository } from './repository';
import { CommentT } from './schema';

export function createTest(
  label: string,
  setupRepo: (init: CommentT[]) => Promise<{
    repo: ICommentRepository,
    postId: PostT['id'],
  }>,
  teardown: () => Promise<void> = async () => undefined,
) {
  describe(label, () => {
    afterEach(async () => {
      await teardown();
    });
    
    it('scenario', async () => {
      const { repo, postId } = await setupRepo([]);
      
      // 처음에는 id가 1인 post의 댓글 목록은 비어있다.
      expect(await repo.getCommentsByPostId(postId)).toStrictEqual([]);

      // id가 1인 post에 댓글을 추가한다.
      await repo.addCommentToPost(postId, '안녕');
      const COMMENT_ID = 1;
      // id가 1인 post에 id가 1인 댓글이 추가되었다.
      expect(await repo.getCommentsByPostId(postId)).toStrictEqual([
        { id: COMMENT_ID, message: '안녕', postId }
      ]);
      
      await repo.updateComment(postId, COMMENT_ID,'바이');

      // expect(actual).toStrictEqual(expected)
      // actual 과 expected 가 같은가?
      expect(await repo.getCommentsByPostId(postId)).toStrictEqual([
        { id: COMMENT_ID, message: '바이', postId }
      ]);

      await repo.deleteComment(postId, COMMENT_ID);
      expect(await repo.getCommentsByPostId(postId)).toStrictEqual([]);
    });
  });
}
  