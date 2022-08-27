import { CommentRepoContext } from './comments/CommentRepoContext';
import { FakeCommentRepo } from './comments/repository';
import type { PostRepoContext } from './posts/PostRepoContext';
import { FakePostRepo } from './posts/repository';

export type ContextT = PostRepoContext & CommentRepoContext;

export async function createContext(): Promise<ContextT> {
  return {
    postRepo: FakePostRepo([]),
    commentRepo: FakeCommentRepo({}),
  };
}
