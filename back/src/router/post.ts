import * as trpc from '@trpc/server';
import { z } from 'zod';

const postSchema = z.object({
  message: z.string().min(1),
  images: z.array(z.string().url()),
});

type PostT = z.infer<typeof postSchema>;

export interface PostRepository {
  all: () => Promise<PostT[]>,
  add: (newPost: PostT) => Promise<void>,
  delete : (message:string)=> Promise<void>,
}

let fakeDB: PostT[] = [];

export const fakeRepo: PostRepository = {
  async all(){
    return fakeDB;
  },
  async add(newPost){
    fakeDB = [...fakeDB, newPost];
  },
  async delete(message){
    fakeDB = fakeDB.filter((post)=> post.message !== message);
  }
}

export const postRouter = trpc
  .router()
  .query('all', {
    output: z.array(postSchema),
    async resolve() {
      return fakeRepo.all();
    },
  })
  .mutation('create', {
    input: postSchema,
    async resolve({ input }) {
      fakeRepo.add(input);
    },
  })
  .mutation('delete', {
    input: z.object({ message : z.string()}),
    async resolve({ input }) {
      fakeRepo.delete(input.message);
    },
  });