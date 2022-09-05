import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { PostT } from '../../../back/src/posts/schema';
import { trpc } from '../trpc';
import PostDeleteButton from './PostDeleteButton';

function PostItem({ post }: { post: PostT }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(post.message);

  // 수정 mutation 만들기
  const queryClient = useQueryClient();
  const { mutateAsync: modifyPost, isLoading } = trpc.useMutation(
    ['post.modify'],
    {
      onSuccess() {
        queryClient.invalidateQueries('post.all');
        setIsEditing(false);
      },
    }
  );
  return (
    <li className="w-full mb-2 mt-2 rounded-lg border-2">
      {post.images.map((src) => (
        <img key={src} src={src} className="rounded-lg"/>
      ))}
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            modifyPost({
              targetId: post.id,
              newMessage,
            });
          }}
        >
          <input
            className="input input-bordered"
            type="text"
            value={newMessage}
            placeholder={post.message}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary btn-sm mb-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? '...Loading' : '수정 완료'}
            </button>

            <PostDeleteButton postId={post.id} />
          </div>
        </form>
      ) : (
        <div className="p-2">
          <p className="text-lg">{post.message}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary btn-sm mb-2"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              수정하기
            </button>

            <PostDeleteButton postId={post.id} />
          </div>
        </div>
      )}
    </li>
  );
}

const fakePosts = [
  {
    id: 10000,
    message: '찬민아 결혼 정말 축하해',
    images: [
      'https://www.brides.com/thmb/umh5TKE4fIOD5bbbmfTHzqqj2lM=/735x0/brides-cover-image-36476d79c52f4b6d8bc9894d859649a6.jpeg',
    ],
  },
  {
    id: 10001,
    message: '결혼 정말 축하해',
    images: [
      'https://www.brides.com/thmb/umh5TKE4fIOD5bbbmfTHzqqj2lM=/735x0/brides-cover-image-36476d79c52f4b6d8bc9894d859649a6.jpeg',
    ],
  },
];

export default function PostList() {
  const { data } = trpc.useQuery(['post.all'], { suspense: true });

  const posts: PostT[] = data;
  return (
    <ul className="overflow-y-auto h-full">
      {posts.concat(fakePosts).map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <li className="shadow-md w-full flex justify-center p-4 text-4xl">
        차밍의 백년가약
      </li>
    </ul>
  );
}
