import { ClientError, GraphQLClient } from 'graphql-request';
import { QueryClient } from '@tanstack/react-query';
import { API_URL } from '@/shared/config';

/**
 * GET instead of POST: a GET without a JSON body is a "simple" CORS request, so the browser
 * skips the OPTIONS preflight (half the requests), and the API's CDN can cache the response.
 * The Rick and Morty API rate-limits by IP, and its rate-limit response (Cloudflare 1015 / 429)
 * carries no CORS headers, so in the browser it surfaces as a generic "Failed to fetch".
 */
export const gqlClient = new GraphQLClient(API_URL, { method: 'GET' });

const httpStatus = (error: unknown) =>
  error instanceof ClientError ? error.response.status : undefined;

/** Network failures (incl. CORS-less 429s), explicit 429s and 5xx are worth retrying. */
export function isTransientError(error: unknown) {
  if (error instanceof TypeError) return true; // "Failed to fetch"
  const status = httpStatus(error);
  return status === 429 || (status !== undefined && status >= 500);
}

export function describeError(error: unknown) {
  if (isTransientError(error)) {
    return 'The Rick and Morty API is busy or limiting requests right now. Wait a few seconds and try again.';
  }
  return error instanceof Error ? error.message : 'Something went wrong.';
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => failureCount < 3 && isTransientError(error),
      // 1s, 2s, 4s — gives the rate-limit window time to refill.
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    },
  },
});
