import { CommentRepoContext } from './comments/CommentRepoContext';
import { FakeCommentRepo } from './comments/repository';
import type { PostRepoContext } from './posts/PostRepoContext';
import { FakePostRepo } from './posts/repository';

export type ContextT = PostRepoContext & CommentRepoContext;

const postRepo = FakePostRepo([]);
const commentRepo = FakeCommentRepo([]);

// lambda event를 받을 상황이 있으면 context에 event를 주입받아야 할 것이다.
// https://trpc.io/docs/v9/aws-lambda#3-use-the-amazon-api-gateway-adapter

export async function createContext(): Promise<ContextT> {
  return { postRepo, commentRepo };
}
