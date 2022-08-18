import { trpc } from '../trpc';
import React, { useState, Suspense } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';

type UserT = { name: string };

function Signup() {
  const usersQuery = trpc.useQuery(['user.get'], { suspense: true });

  const queryClient = useQueryClient();

  const createUserMutation = trpc.useMutation(['user.create'], {
    onMutate(data) {
      queryClient.setQueryData(['user.get'], (old: UserT[]) => [...old, data]);
    },
  });

  const clearUserMutation = trpc.useMutation(['user.clear'], {
    onMutate() {
      queryClient.setQueryData(['user.get'], (old: UserT[]) => []);
    },
  });

  return (
    <>
      <button
        className="btn btn-primary m-3"
        onClick={() => {
          createUserMutation.mutateAsync({
            name: 'test' + Math.floor(Math.random() * 10000),
          });
        }}
      >
        add user
      </button>
      <button
        className="btn btn-primary m-3"
        onClick={() => clearUserMutation.mutateAsync({})}
      >
        초기화
      </button>
      <ul>
        {usersQuery.data.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

function TrpcSignup() {
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
            <Signup />
          </Suspense>
        </QueryClientProvider>
      }
    />
  );
}

export default TrpcSignup;
