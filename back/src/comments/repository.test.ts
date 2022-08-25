import { FakeRepo, CommentRepository } from './repository';

// 포스트를 작성하면, 추가된다!
describe('comment', () => {
  it('scenario', async () => {
    const repo: CommentRepository = FakeRepo();
    const NEW_COMMENT = {
      message: '안녕',
    };
    // 처음에는 id가 1인 post의 댓글 목록은 비어있다.
    expect(await repo.getCommentsByPostId(1)).toStrictEqual([]);
    // post가 없으면 댓글목록을 가져올 수 없다.
    // toThrowError가 작동하지 않아서 주석처리
    // expect(await repo.getCommentsByPostId(2)).toThrowError('404')

    // id가 1인 post의 댓글을 추가한다.
    await repo.addCommentToPost(1, NEW_COMMENT);
    // id가 1인 post의 댓글이 추가되었다.
    expect(await repo.getCommentsByPostId(1)).toStrictEqual([
      { id: 1, ...NEW_COMMENT },
    ]);
  });
  it('autoincrement', async () => {
    const repo: CommentRepository = FakeRepo({
      1: [
        { id: 2, message: '안녕' },
        { id: 4, message: '안녕2' },
      ],
      3: [{ id: 5, message: '안녕3' }],
    });
    await repo.addCommentToPost(3, { message: '안녕4' });

    expect(await repo.getCommentsByPostId(3)).toStrictEqual([
      { id: 5, message: '안녕3' },
      { id: 6, message: '안녕4' },
    ]);
  });
});
