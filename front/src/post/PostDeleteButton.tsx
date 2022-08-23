import React from "react";
import { useQueryClient } from "react-query";
import { PostT } from "../../../back/src/posts/schema";
import { trpc } from "../trpc";

export default function PostDeleteButton({ postId }: { postId: PostT['id'] }){
  const queryClient = useQueryClient();
  const { mutateAsync: deletePost } = trpc.useMutation(['post.delete'], {
    onSuccess() {
      queryClient.invalidateQueries('post.all');
    },
  });

  return (
    <button className="btn btn-error btn-sm" onClick={() => {
      if(confirm("정말로 삭제하시겠어요?")) deletePost({ targetId: postId })
    }}>
      삭제
    </button>
  )
}