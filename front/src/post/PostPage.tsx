import { trpc } from '../trpc';
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PostForm from './PostForm';
import PostList from './PostList';

export const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  url: 'https://61pif65yuf.execute-api.ap-northeast-2.amazonaws.com/'
  // url: 'http://localhost:8000',
});

export default function PostPage() {

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}
      children={
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<span>로딩 중</span>}>
            <PostForm />
            <PostList />
          </Suspense>
        </QueryClientProvider>
      }
    />
  );
}
