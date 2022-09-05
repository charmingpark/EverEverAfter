import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { trpc } from '../trpc';

export default function PostForm() {
  const queryClient = useQueryClient();

  const createMutation = trpc.useMutation(['post.create'], {
    onSuccess() {
      queryClient.invalidateQueries('post.all');
    },
  });
  const [postInput, setPostInput] = useState('');

  const [isWriting, setIsWriting] = useState(false);

  return (
    <>
      {isWriting ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createMutation.mutateAsync({
              message: postInput,
              images: [],
            });
            setPostInput('');
            setIsWriting(false);
          }}
        >
          <input
            className="input input-bordered"
            type="text"
            value={postInput}
            placeholder="ex) 차밍아 결혼 축하해"
            onChange={(e) => setPostInput(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            올리기
          </button>
        </form>
      ) : (
        <button
          className="btn btn-circle btn-primary absolute right-4 bottom-4"
          aria-label="방명록 쓰기"
          onClick={() => setIsWriting(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      )}
    </>
  );
}
