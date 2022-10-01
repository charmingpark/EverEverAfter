import { FakeCommentRepo } from './repository';

const POST_ID_1 = 1;

// 포스트를 작성하면, 추가된다!
describe('comment', () => {
  it('scenario', async () => {
    const repo = FakeCommentRepo([]);
    // 처음에는 id가 1인 post의 댓글 목록은 비어있다.
    expect(await repo.getCommentsByPostId(POST_ID_1)).toStrictEqual([]);

    // id가 1인 post에 댓글을 추가한다.
    await repo.addCommentToPost(POST_ID_1, '안녕');
    const COMMENT_ID = 1;
    // id가 1인 post에 id가 1인 댓글이 추가되었다.
    expect(await repo.getCommentsByPostId(POST_ID_1)).toStrictEqual([
      { id: COMMENT_ID, message: '안녕', postId: POST_ID_1 },
    ]);
    
    await repo.updateComment(POST_ID_1, COMMENT_ID,'바이');

    // expect(actual).toStrictEqual(expected)
    // actual 과 expected 가 같은가?
    expect(await repo.getCommentsByPostId(POST_ID_1)).toStrictEqual([
      { id: COMMENT_ID, message: '바이', postId: POST_ID_1 },
    ]);

    await repo.deleteComment(POST_ID_1, COMMENT_ID);
    expect(await repo.getCommentsByPostId(POST_ID_1)).toStrictEqual([]);
  });
  
  it('autoincrement', async () => {
    const repo = FakeCommentRepo([
      { id: 2, message: '안녕', postId: 1 },
      { id: 4, message: '안녕2', postId: 1 },
      { id: 5, message: '안녕3', postId: 3 }
    ]);
    await repo.addCommentToPost(3, '안녕4');

    expect(await repo.getCommentsByPostId(3)).toStrictEqual([
      { id: 5, message: '안녕3', postId: 3 },
      { id: 6, message: '안녕4', postId: 3 },
    ]);
  });
});
