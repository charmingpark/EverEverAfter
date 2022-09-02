import { createTest } from './createTest';
import { FakePostRepo } from './repository';

createTest(
  'FakePostRepo',
  async () => FakePostRepo([])
);
