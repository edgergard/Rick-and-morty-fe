import { GraphQLClient } from 'graphql-request';
import { QueryClient } from '@tanstack/react-query';
import { API_URL } from '@/shared/config';

export const gqlClient = new GraphQLClient(API_URL);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
