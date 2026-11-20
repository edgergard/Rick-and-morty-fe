import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import type { CharacterFilters } from '@/entities/character';

export const FILTER_KEYS = ['name', 'status', 'species', 'type', 'gender'] as const;
export type FilterKey = (typeof FILTER_KEYS)[number];

export const FILTER_LABELS: Record<FilterKey, string> = {
  name: 'Name',
  status: 'Status',
  species: 'Species',
  type: 'Type',
  gender: 'Gender',
};

export const pickActiveFilters = (filters: Partial<CharacterFilters>) =>
  Object.fromEntries(
    Object.entries(filters).filter(([, value]) => Boolean(value)),
  ) as Partial<CharacterFilters>;

export const filtersToSearch = (filters: Partial<CharacterFilters>) =>
  `?${new URLSearchParams(pickActiveFilters(filters) as Record<string, string>)}`;

/** Single source of truth for list state: everything lives in the URL, so it is shareable. */
export function useCharacterFilters() {
  const [params, setParams] = useSearchParams();

  const filters = useMemo(
    () =>
      Object.fromEntries(
        FILTER_KEYS.map((key) => [key, params.get(key) ?? '']),
      ) as unknown as CharacterFilters,
    [params],
  );

  const page = Math.max(1, Number(params.get('page')) || 1);

  const setFilter = useCallback(
    (key: FilterKey, value: string) =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value) next.set(key, value);
          else next.delete(key);
          next.delete('page');
          return next;
        },
        { replace: true },
      ),
    [setParams],
  );

  const setPage = useCallback(
    (nextPage: number) =>
      setParams((prev) => {
        const next = new URLSearchParams(prev);
        if (nextPage > 1) next.set('page', String(nextPage));
        else next.delete('page');
        return next;
      }),
    [setParams],
  );

  const reset = useCallback(() => setParams({}), [setParams]);

  const active = useMemo(() => pickActiveFilters(filters), [filters]);

  return {
    filters,
    active,
    activeCount: Object.keys(active).length,
    page,
    setFilter,
    setPage,
    reset,
  };
}
