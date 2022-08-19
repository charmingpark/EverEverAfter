import * as trpc from '@trpc/server';
import { string, z } from 'zod';

const postSchema = z.object({
  message: z.string().min(1),
  images: z.array(z.string().url()),
});

type PostT = z.infer<typeof postSchema>;

export interface PostRepository {
  all: () => Promise<PostT[]>,
  add: (newPost: PostT) => Promise<void>,
  modify: (targetMessage: string, newMessage: string) => Promise<void>
}

let fakeDB: PostT[] = [];

export const fakeRepo: PostRepository = {
  async all(){
    return fakeDB;
  },
  async add(newPost){
    fakeDB = [...fakeDB, newPost];
  },
  async modify(targetMessage, newMessage){
    fakeDB = fakeDB.map((post) => {
      if(post.message === targetMessage) {
        const modifiedPost = {
          message: newMessage,
          images: post.images
        }
        return modifiedPost
      }else{
        return post
      }
    }
    )
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
  // 만약 modify에 두가지 인자를 넣어야한다면..?
  .mutation('modify', {
    input: z.string(),
    async resolve({input}){
      fakeRepo.modify(input, input)
    }
  })
  ;
