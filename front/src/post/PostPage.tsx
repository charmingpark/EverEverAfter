import { trpc } from '../trpc';
import React, { useState, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PostForm from './PostForm';
import PostList from './PostList';

export default function PostPage() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:5000/trpc',
    })
  );

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
