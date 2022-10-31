import { createTest } from './createTest';
import { FakeCommentRepo } from './repository';

createTest(
  'FakeCommentRepo',
  async (init) => {
    return {
      repo: FakeCommentRepo(init),
      postId: 1,
    };
  }
);