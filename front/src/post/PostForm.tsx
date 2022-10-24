import React, { useRef, useState } from 'react';
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

  const messageArea = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <label
        className="btn btn-circle btn-primary absolute right-4 bottom-4"
        aria-label="방명록 쓰기"
        onClick={() => {
          setIsWriting(true);
          setTimeout(() => {messageArea.current?.focus();}, 100)
        }}
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
      </label>
      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={isWriting}
        readOnly={true}
        hidden={true}
      />
      <div className="modal">
        <form
          className="modal-box h-full "
          onSubmit={(e) => {
            e.preventDefault();
            createMutation.mutateAsync({
              message: postInput,
              images: ['https://www.brides.com/thmb/umh5TKE4fIOD5bbbmfTHzqqj2lM=/735x0/brides-cover-image-36476d79c52f4b6d8bc9894d859649a6.jpeg'],
            });
            setPostInput('');
            setIsWriting(false);
          }}
        >
          {/* <img 
            src="https://www.brides.com/thmb/umh5TKE4fIOD5bbbmfTHzqqj2lM=/735x0/brides-cover-image-36476d79c52f4b6d8bc9894d859649a6.jpeg"
            className="w-full mb-2"
          /> */}
          <textarea
            ref={messageArea}
            className="textarea textarea-bordered w-full h-3/4"
            value={postInput}
            placeholder= {`${"'작성자 이름'"}` + " 님, 박찬민님과 김동진님께 축하메시지를 남겨주세요."}
            onChange={(e) => setPostInput(e.target.value)}
          />
          {/* TODO: 꾸미기 select box */}
          <div className="modal-action p-1 mt-2">
            <button className="btn btn-error btn-sm" type="submit">
              취소
            </button>
            <button className="btn btn-primary btn-sm" type="submit">
              등록
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
