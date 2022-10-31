import { invariant } from '../invariant';
import { PostRepository } from './repository';

const NEW_POST = {
  id: 1,
  message: 'test',
  images: [],
};
const MODIFIED_MESSAGE = '찬민아 결혼 축하해';

export function createTest(
  label: string,
  setupRepo: () => Promise<PostRepository>,
  teardown: () => Promise<void> = async () => undefined,
) {
  describe(label, () => {
    afterEach(async () => {
      await teardown();
    });

    it('scenario', async () => {
      const repo = await setupRepo();
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
      expect(await repo.all()).toMatchObject([
        {
          id: 1,
          message: MODIFIED_MESSAGE,
          images: [],
        },
      ]);

      await repo.delete(TARGET_ID);

      expect(await repo.all()).toStrictEqual([]);
    });
  });
}
