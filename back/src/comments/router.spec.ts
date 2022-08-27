import { router } from '@trpc/server';
import { commentRouter } from './router';

const POST_ID_1 = 1;

describe('comments', () => {
  it('scenario', async () => {
    const ctx = {};
    // caller를 만들고
    const caller = router().merge('comment.', commentRouter).createCaller(ctx);

    // 처음에는 id가 1인 post의 댓글 목록은 비어있다.
    expect(await caller.query('comment.read', POST_ID_1)).toStrictEqual([]);
    // id가 1인 post의 댓글을 추가한다.
    await caller.mutation('comment.create', {
      id: POST_ID_1,
      comment: {
        message: '안녕',
      },
    });
    // id가 1인 post의 댓글이 추가되었다.
    expect(await caller.query('comment.read', POST_ID_1)).toStrictEqual([
      {
        id: 1,
        message: '안녕',
      },
    ]);

    expect(() => caller.query('comment.read', 2)).rejects.toThrowError('404');
  });
});
