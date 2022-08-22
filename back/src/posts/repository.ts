import type { PostT } from "./schema";

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
