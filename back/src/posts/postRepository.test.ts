import { PostRepository, fakeRepo } from "./post";

const NEW_POST = {
  message: 'test',
  images: ["https://pbs.twimg.com/profile_banners/1261543922309849088/1615648508/1500x500"]
};
const MODIFY_POST_MESSAGE = "test2"
const MODIFIED_POST = {
  message: 'test2',
  images: ["https://pbs.twimg.com/profile_banners/1261543922309849088/1615648508/1500x500"]
};

const repo: PostRepository = fakeRepo;

// 포스트를 작성하면, 추가된다!
describe("post", () => {
  it('scenario', async () => {
    // 처음에는 비어 있는데
    expect(await repo.all()).toStrictEqual([]);
    // 새 post를 추가하면
    await repo.add(NEW_POST);
    // post가 들어 있는 배열이 온다.
    expect(await repo.all()).toStrictEqual([NEW_POST]);
    // post의 message를 수정하면
    await repo.modify({
      targetMessage: NEW_POST.message,
      newMessage: MODIFY_POST_MESSAGE
    })
    // 수정된 post의 배열이 온다
    expect(await repo.all()).toStrictEqual([MODIFIED_POST])

    await repo.delete(NEW_POST.message);

    expect(await repo.all()).toStrictEqual([]);
  });
});
