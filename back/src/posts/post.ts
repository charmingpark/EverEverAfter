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
  modify: (input: { targetMessage: string, newMessage: string }) => Promise<void>
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
  },
  async modify({targetMessage, newMessage}){
    const newDB = [...fakeDB];
    
    const targetIndex = fakeDB.findIndex((post) => post.message === targetMessage);

    if(targetIndex === -1){
      throw new Error(`404 not found for ${targetMessage}`);
    }

    const old = newDB[targetIndex]!;
    newDB[targetIndex] = {
      message: newMessage,
      images: old.images
    }
    fakeDB = newDB;
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
  })
  .mutation('modify', {
    input: z.object({
      targetMessage: z.string(),
      newMessage: z.string(),
    }),
    async resolve({input}){
      fakeRepo.modify(input)
    }
  });
