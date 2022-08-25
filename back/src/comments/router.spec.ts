import { router } from '@trpc/server';
import { commentRouter } from "./router";

describe("comments", () => {
  it('scenario', async () => {
    const ctx = {};
    // caller를 만들고
    const caller = router()
      .merge('comment.', commentRouter)
      .createCaller(ctx);

      const NEW_COMMENT = {
        message: "안녕"
      }

    // 처음에는 id가 1인 post의 댓글 목록은 비어있다.
    expect(await caller.query('comment.read', 1)).toStrictEqual([])
    // id가 1인 post의 댓글을 추가한다.
    await caller.mutation('comment.create', {id: 1, comment: NEW_COMMENT})
    // id가 1인 post의 댓글이 추가되었다.
    expect(await caller.query('comment.read', 1)).toStrictEqual([{
      id: 1,
      ...NEW_COMMENT
    }])

  });
});
