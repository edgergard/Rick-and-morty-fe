import { useEffect, useRef } from 'react';
import { AlertTriangle, SearchX } from 'lucide-react';
import { CharacterCard, CharacterCardSkeleton, useCharacters } from '@/entities/character';
import { FilterBar, useCharacterFilters } from '@/features/character-filters';
import { ExportCsvButton } from '@/features/export-csv';
import { useHistory } from '@/features/history';
import { cn } from '@/shared/lib';
import { Button, EmptyState } from '@/shared/ui';
import { Pagination } from '@/widgets/Pagination';

export function HomePage() {
  const { filters, active, activeCount, page, setPage, reset } = useCharacterFilters();
  const { data, isPending, isError, error, isPlaceholderData, refetch } = useCharacters(
    page,
    filters,
  );
  const addFilter = useHistory((s) => s.addFilter);
  const resultsRef = useRef<HTMLElement>(null);

  const activeKey = JSON.stringify(active);
  useEffect(() => {
    if (activeCount > 0) addFilter(JSON.parse(activeKey));
  }, [activeKey, activeCount, addFilter]);

  const changePage = (next: number) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const characters = data?.results ?? [];

  return (
    <>
      <section className="relative pb-10 pt-14 sm:pt-20">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-fg-muted">
          <span className="size-1.5 animate-pulse rounded-full bg-portal" />
          Live from the Rick and Morty API
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Every character across the{' '}
          <span className="bg-gradient-to-r from-portal via-lime-200 to-cyan-300 bg-clip-text text-transparent">
            infinite multiverse
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-fg-muted sm:text-lg">
          Search, filter and dive into the details of{' '}
          {data ? data.info.count.toLocaleString() : 'hundreds of'}{' '}
          {activeCount ? 'matching ' : ''}characters — from Ricks and Mortys to sentient pickles.
        </p>
      </section>

      <section ref={resultsRef} className="scroll-mt-20 space-y-8">
        <FilterBar actions={<ExportCsvButton characters={characters} page={page} />} />

        {isError ? (
          <EmptyState
            icon={<AlertTriangle className="size-6" />}
            title="The portal gun misfired"
            description={error.message}
            action={<Button onClick={() => refetch()}>Try again</Button>}
          />
        ) : !isPending && characters.length === 0 ? (
          <EmptyState
            icon={<SearchX className="size-6" />}
            title="No characters in this dimension"
            description="Nobody matches these filters. Try loosening them up."
            action={<Button onClick={reset}>Reset filters</Button>}
          />
        ) : (
          <div
            className={cn(
              'grid gap-5 transition-opacity sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
              isPlaceholderData && 'opacity-50',
            )}
          >
            {isPending
              ? Array.from({ length: 8 }, (_, i) => <CharacterCardSkeleton key={i} />)
              : characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
          </div>
        )}

        {data && <Pagination page={page} total={data.info.pages} onChange={changePage} />}
      </section>
    </>
  );
}
