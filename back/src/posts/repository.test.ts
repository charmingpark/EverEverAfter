import { PostRepository, FakeRepo } from './repository';

const NEW_POST = {
  message: 'test',
  images: [
    'https://pbs.twimg.com/profile_banners/1261543922309849088/1615648508/1500x500',
  ],
};
const MODIFY_POST_MESSAGE = 'test2';
const MODIFIED_POST = {
  id: 1,
  message: 'test2',
  images: [
    'https://pbs.twimg.com/profile_banners/1261543922309849088/1615648508/1500x500',
  ],
};

// 포스트를 작성하면, 추가된다!
describe('post', () => {
  it('scenario', async () => {
    const repo: PostRepository = FakeRepo();
    // 처음에는 비어 있는데
    expect(await repo.all()).toStrictEqual([]);
    // 새 post를 추가하면
    await repo.add(NEW_POST);
    // post가 들어 있는 배열이 온다.
    expect(await repo.all()).toStrictEqual([
      {
        id: 1,
        ...NEW_POST,
      },
    ]);
    // post의 message를 수정하면
    await repo.modify({
      targetId: 1,
      newMessage: MODIFY_POST_MESSAGE,
    });
    // 수정된 post의 배열이 온다
    expect(await repo.all()).toStrictEqual([MODIFIED_POST]);

    await repo.delete(1);

    expect(await repo.all()).toStrictEqual([]);
  });

  it('autoincrement', async () => {
    const repo = FakeRepo([
      {
        id: 5,
        message: 'test2',
        images: [],
      },
    ]);
    await repo.add(NEW_POST);
    await repo.add(NEW_POST);
    await repo.add(NEW_POST);
    await repo.add(NEW_POST);

    const results = await repo.all();
    expect(results.map((post) => post.id)).toStrictEqual([5, 6, 7, 8, 9]);
  });
});
