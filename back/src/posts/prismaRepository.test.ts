import { PrismaClient } from '@prisma/client';
import { invariant } from '../invariant';
import { PrismaRepo } from './prismaRepository';

const NEW_POST = {
  message: 'test',
  images: [
    'https://pbs.twimg.com/profile_banners/1261543922309849088/1615648508/1500x500',
  ],
};
const MODIFIED_MESSAGE = '찬민아 결혼 축하해';

// 포스트를 작성하면, 추가된다!
describe('post', () => {
  const prisma = new PrismaClient();

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('scenario', async () => {
    await prisma.image.deleteMany();
    await prisma.post.deleteMany();
    const repo = PrismaRepo(prisma);
    // 처음에는 비어 있는데
    expect(await repo.all()).toStrictEqual([]);
    // 새 post를 추가하면
    await repo.add(NEW_POST);
    // post가 들어 있는 배열이 온다.
    const data = await repo.all();

    expect(data).toMatchObject([NEW_POST]);

    invariant(data[0] !== undefined, '값이 존재해야한다');
    const TARGET_ID = data[0].id;

    // post의 message를 수정하면
    await repo.modify({
      targetId: TARGET_ID,
      newMessage: MODIFIED_MESSAGE,
    });
    // 수정된 post의 배열이 온다
    expect(await repo.all()).toMatchObject([{
      message: MODIFIED_MESSAGE,
      images: [
        'https://pbs.twimg.com/profile_banners/1261543922309849088/1615648508/1500x500',
      ],
    }]);

    await repo.delete(TARGET_ID);

    expect(await repo.all()).toStrictEqual([]);
  });
});
