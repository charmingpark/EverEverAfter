import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { trpc } from "../trpc";


export default function PostForm() {
  const queryClient = useQueryClient();

  const createMutation = trpc.useMutation(['post.create'], {
    onSuccess() {
      queryClient.invalidateQueries('post.all');
    },
  });
  const [postInput, setPostInput] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createMutation.mutateAsync({
          message: postInput,
          images: [],
        });
        setPostInput('');
      }}
    >
      <input
        className="input input-bordered"
        type="text"
        value={postInput}
        onChange={(e) => setPostInput(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        테스트 방명록 추가
      </button>
    </form>
  );
}