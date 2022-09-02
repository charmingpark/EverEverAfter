import type { PostT } from './schema';

export interface PostRepository {
  has: (id: PostT['id']) => Promise<boolean>;
  all: () => Promise<PostT[]>;
  add: (newPost: Omit<PostT, 'id'>) => Promise<void>;
  delete: (targetId: PostT['id']) => Promise<void>;
  modify: (input: {
    targetId: PostT['id'];
    newMessage: string;
  }) => Promise<void>;
}

export function FakePostRepo(init: PostT[]): PostRepository {
  let _fakeDB = init;
  let _count = Math.max(0, ...init.map((post) => post.id));

  return {
    async has(id){
      return _fakeDB.some(post => post.id === id);
    },
    async all() {
      return _fakeDB;
    },
    async add(newPost) {
      _count++;
      _fakeDB = [
        ..._fakeDB,
        {
          id: _count,
          ...newPost,
        },
      ];
    },
    async delete(targetId) {
      _fakeDB = _fakeDB.filter((post) => post.id !== targetId);
    },
    async modify({ targetId, newMessage }) {
      const newDB = [..._fakeDB];

      const targetIndex = newDB.findIndex((post) => post.id === targetId);

      if (targetIndex === -1) {
        throw new Error(`404 not found for ${targetId}`);
      }

      const old = newDB[targetIndex];
      if(old){
        newDB[targetIndex] = {
          ...old,
          message: newMessage,
        };
        _fakeDB = newDB;
      }
    },
  };
}



