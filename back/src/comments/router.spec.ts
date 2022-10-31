import { FakePostRepo } from '../posts/repository';
import { FakeCommentRepo } from './repository';
import { commentRouter } from './router';

const POST_ID = 5;

describe('comments', () => {
  it('scenario', async () => {
    // caller를 만들고
    const caller = commentRouter.createCaller({
      postRepo: FakePostRepo([{
        id: POST_ID,
        message: '찬민아 결혼 축하해',
        images: [],
      }]),
      commentRepo: FakeCommentRepo([])
    });

    // 처음에는 post의 댓글 목록은 비어있다.
    expect(await caller.query('read', { postId: POST_ID })).toStrictEqual([]);
    // post에 댓글을 추가한다.
    await caller.mutation('create', {
      id: POST_ID,
      message: '안녕',
    });
    // post에 댓글을 추가했다.
    expect(await caller.query('read', { postId: POST_ID })).toStrictEqual([
      {
        id: 1,
        message: '안녕',
        postId: POST_ID
      },
    ]);

    await caller.mutation('update', {
      postId: POST_ID,
      commentId: 1, 
      message:'바이'
    });

    expect(await caller.query('read', { postId: POST_ID })).toStrictEqual([
      {
        id: 1,
        message: '바이',
        postId: POST_ID
      },
    ]);

    // mutation으로 데이터를 변경한다
    await caller.mutation('delete', {
      postId: POST_ID,
      commentId: 1, 
    });

    // 기대하는대로 데이터가 변경되었는지, query해서 확인한다
    expect(await caller.query('read', { postId: POST_ID })).toStrictEqual([]);
  });
});
