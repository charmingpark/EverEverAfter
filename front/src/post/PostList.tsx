import { trpc } from '../trpc';
import React, { useState, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

type UserT = { name: string };

function PostList() {
  const postsQuery = trpc.useQuery(['post.all'], { suspense: true });

  return (
    <ul>
    {postsQuery.data.map((post) => (
      <li key={post.message}>
        <h3>{post.message}</h3>
        {post.images.map(src => <img key={src} src={src} />)}
      </li>
    ))}
  </ul>
  );
}

function PostPage() {
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
          <Suspense>
            <PostList />
          </Suspense>
        </QueryClientProvider>
      }
    />
  );
}

export default PostPage;
