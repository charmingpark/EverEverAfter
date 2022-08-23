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
    <li className="card shadow-md m-2 p-2 w-80">
      {post.images.map((src) => (
        <img key={src} src={src} />
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
        <>
          <h3 className="text-lg font-bold">{post.message}</h3>
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
        </>
      )}
    </li>
  );
}

export default function PostList() {
  const { data } = trpc.useQuery(['post.all'], { suspense: true });

  const posts: PostT[] = data;
  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
