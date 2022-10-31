import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { PostT } from '../../../back/src/posts/schema';
import { trpc } from '../trpc';
import PostDeleteButton from './PostDeleteButton';

// 목표: 디자인에 맞춰서 방명록 카드를 만들고 싶다
// 문제: 작성 시간, 작성자와 같은 정보가 없다
// 해결: 목 데이터를 만들다 => 프런트에서 하드 코딩

// const [isEditing, setIsEditing] = useState(false);
//   const [newMessage, setNewMessage] = useState(post.message);

//   // 수정 mutation 만들기
//   const queryClient = useQueryClient();
//   const { mutateAsync, isLoading } = trpc.useMutation(
//     ['post.modify'],
//     {
//       onSuccess() {
//         queryClient.invalidateQueries('post.all');
//         setIsEditing(false);
//       },
//     }
//   );

function PostItem({ post }: { post: PostT }) {
  return (
    <li className="w-full p-2 border-2">
      <header>
        <p>글쓴이: 김태희</p>
        <p>작성시간: 2022.10.10</p>
      </header>
      <p>{post.message}</p>
    </li>
  );
}

export default function PostList() {
  const { data: posts } = trpc.useQuery(['post.all'], { suspense: true });

  console.log(posts);
  
  return (
    <ul className="overflow-y-auto h-full flex flex-col gap-2">
      {posts!.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      {/* TODO: 게시글의 최신글이 맨 위로 오게 한다. */}
      <li className="w-full flex justify-center p-4 text-4xl">
        {posts!.length === 0 ? "방명록 게시글이 없습니다." : "~~~" }
      </li>
    </ul>
  );
}