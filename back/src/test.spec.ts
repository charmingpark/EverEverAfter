import { appRouter } from ".";

const NEW_POST = {
  message: 'test',
  images: ["https://pbs.twimg.com/profile_banners/1261543922309849088/1615648508/1500x500"]
};

describe("posts", () => {
  it('scenario', async () => {
    const ctx = {};
    // caller를 만들고
    const caller = appRouter.createCaller(ctx);

    // 처음에는 비어 있는데
    expect(await caller.query('post.all')).toStrictEqual([]);
    // 새 post를 추가하면
    await caller.mutation('post.create', NEW_POST);
    // post가 들어 있는 배열이 온다.
    expect(await caller.query('post.all')).toStrictEqual([NEW_POST]);

    await caller.mutation('post.modify', {
      targetMessage: NEW_POST.message,
      newMessage: 'modified'
    })

    expect(await caller.query('post.all')).toStrictEqual([{
      message: 'modified',
      images: NEW_POST.images,
    }]);
  });
});
