import { createTestContext } from '../createContext';
import { FakeCommentRepo } from './repository';
import { commentRouter } from './router';

const POST_ID_1 = 1;

describe('comments', () => {
  it('scenario', async () => {
    // caller를 만들고
    const ctx = await createTestContext({
      commentRepo: FakeCommentRepo({ [POST_ID_1]: [] })
    });
    const caller = commentRouter.createCaller(ctx);

    // 처음에는 id가 1인 post의 댓글 목록은 비어있다.
    expect(await caller.query('read', POST_ID_1)).toStrictEqual([]);
    // id가 1인 post의 댓글을 추가한다.
    await caller.mutation('create', {
      id: POST_ID_1,
      comment: {
        message: '안녕',
      },
    });
    // id가 1인 post의 댓글이 추가되었다.
    expect(await caller.query('read', POST_ID_1)).toStrictEqual([
      {
        id: 1,
        message: '안녕',
      },
    ]);

    expect(() => caller.query('read', 2)).rejects.toThrowError('404');
  });
});
