import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { PostT } from '../../../back/src/posts/schema';
import { trpc } from '../trpc';
import PostDeleteButton from './PostDeleteButton';

// 목표: 디자인에 맞춰서 방명록 카드를 만들고 싶다
// 문제: 작성 시간, 작성자와 같은 정보가 없다
// 해결: 목 데이터를 만들다 => 프런트에서 하드 코딩

function PostItem({ post }: { post: PostT }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(post.message);

  // 수정 mutation 만들기
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = trpc.useMutation(
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
      {/* {post.images.map((src) => (
        <img key={src} src={src} className="rounded-lg"/>
      ))} */}
      <header>
        <p>글쓴이: 김태희</p>
      </header>
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutateAsync({
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
      <div>
        <button>❤️</button>
        <button>😄</button>
        이모지 반응?
      </div>
      {/* TODO: 댓글 - merge 후에 */}
    </li>
  );
}

export default function PostList() {
  const { data: posts } = trpc.useQuery(['post.all'], { suspense: true });

  return (
    <ul className="overflow-y-auto h-full">
      {posts!.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <li className="shadow-md w-full flex justify-center p-4 text-4xl">
        차밍의 백년가약
      </li>
    </ul>
  );
}
