import { useCallback, useSyncExternalStore } from 'react';
import { onlineManager, useQueryClient, type QueryClient } from '@tanstack/react-query';
import { MAX_RETRIES } from './client';

export type ApiStatus =
  | { state: 'ok' }
  | { state: 'offline' }
  | { state: 'retrying'; attempt: number; maxAttempts: number };

/**
 * Derives one app-wide API state from the React Query cache, so any screen gets the same
 * banner without wiring its own UI. Only queries something is rendering are considered.
 * Returns a string so useSyncExternalStore gets a stable, comparable snapshot.
 */
function snapshot(client: QueryClient): string {
  const queries = client
    .getQueryCache()
    .getAll()
    .filter((q) => q.getObserversCount() > 0);

  // Queries also pause while the tab is hidden, so 'paused' alone doesn't mean offline.
  if (!onlineManager.isOnline() && queries.some((q) => q.state.fetchStatus === 'paused')) {
    return 'offline';
  }

  const failures = queries
    .filter((q) => q.state.fetchStatus === 'fetching' && q.state.fetchFailureCount > 0)
    .map((q) => q.state.fetchFailureCount);

  return failures.length ? `retrying:${Math.max(...failures)}` : 'ok';
}

function parse(value: string): ApiStatus {
  if (value === 'offline') return { state: 'offline' };
  if (value.startsWith('retrying:')) {
    return { state: 'retrying', attempt: Number(value.slice(9)), maxAttempts: MAX_RETRIES };
  }
  return { state: 'ok' };
}

export function useApiStatus() {
  const client = useQueryClient();
  const subscribe = useCallback(
    (onChange: () => void) => {
      const unsubCache = client.getQueryCache().subscribe(onChange);
      const unsubOnline = onlineManager.subscribe(onChange);
      return () => {
        unsubCache();
        unsubOnline();
      };
    },
    [client],
  );
  const value = useSyncExternalStore(subscribe, () => snapshot(client));
  return { status: parse(value) };
}
