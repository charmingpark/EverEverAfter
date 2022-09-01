import { FakeCommentRepo } from './repository';
import { commentRouter } from './router';

const POST_ID_1 = 1;

describe('comments', () => {
  it('scenario', async () => {
    // caller를 만들고
    const caller = commentRouter.createCaller({
      commentRepo: FakeCommentRepo({ [POST_ID_1]: [] })
    });

    expect(() => caller.query('read', 2)).rejects.toThrowError('404');

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

    await caller.mutation('update', {
      postId: POST_ID_1,
      commentId: 1, 
      message:'바이'
    })

    expect(await caller.query('read', POST_ID_1)).toStrictEqual([
      {
        id: 1,
        message: '바이',
      },
    ]);

    // mutation으로 데이터를 변경한다
    await caller.mutation('delete', {
      postId: POST_ID_1,
      commentId: 1, 
    })

    // 기대하는대로 데이터가 변경되었는지, query해서 확인한다
    expect(await caller.query('read', POST_ID_1)).toStrictEqual([]);
  });
});
