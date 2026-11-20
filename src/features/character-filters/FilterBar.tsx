import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { GENDERS, STATUSES } from '@/entities/character';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { DebouncedInput } from './DebouncedInput';
import { FILTER_LABELS, type FilterKey, useCharacterFilters } from './model';

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  ...STATUSES.map((s) => ({ value: s, label: s })),
];

export function FilterBar({ actions }: { actions?: React.ReactNode }) {
  const { filters, active, activeCount, setFilter, reset } = useCharacterFilters();
  const [expanded, setExpanded] = useState(
    Boolean(filters.species || filters.type || filters.gender),
  );
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" focuses search, like on GitHub.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <DebouncedInput
          ref={searchRef}
          value={filters.name}
          onCommit={(value) => setFilter('name', value)}
          placeholder="Search characters…"
          aria-label="Search by name"
          icon={<Search className="size-4" />}
          trailing={
            <kbd className="hidden rounded-md border border-line px-1.5 font-mono text-[10px] text-fg-subtle sm:block">
              /
            </kbd>
          }
          className="lg:w-80"
        />

        <div
          role="radiogroup"
          aria-label="Status"
          className="flex h-11 items-center gap-1 rounded-xl border border-line bg-surface p-1"
        >
          {STATUS_OPTIONS.map(({ value, label }) => {
            const checked = filters.status === value;
            return (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={checked}
                onClick={() => setFilter('status', value)}
                className={cn(
                  'h-full flex-1 cursor-pointer rounded-lg px-3 text-sm capitalize transition-all',
                  checked ? 'bg-white/10 text-fg shadow-sm' : 'text-fg-muted hover:text-fg',
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 lg:ml-auto">
          <Button
            variant={expanded ? 'outline' : 'ghost'}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            <SlidersHorizontal className="size-4" />
            More filters
            <ChevronDown className={cn('size-4 transition-transform', expanded && 'rotate-180')} />
          </Button>
          {actions}
        </div>
      </div>

      <div
        className={cn(
          'grid transition-all duration-300',
          expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="grid gap-3 pt-1 sm:grid-cols-3">
            <DebouncedInput
              value={filters.species}
              onCommit={(value) => setFilter('species', value)}
              placeholder="Species — e.g. Human, Alien"
              aria-label="Species"
            />
            <DebouncedInput
              value={filters.type}
              onCommit={(value) => setFilter('type', value)}
              placeholder="Type — e.g. Parasite"
              aria-label="Type"
            />
            <div className="relative">
              <select
                value={filters.gender}
                onChange={(event) => setFilter('gender', event.target.value)}
                aria-label="Gender"
                className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-line bg-surface px-3.5 text-sm outline-none focus:border-portal/60"
              >
                <option value="">Any gender</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g} className="capitalize">
                    {g}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 size-4 text-fg-subtle" />
            </div>
          </div>
        </div>
      </div>

      {activeCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {(Object.entries(active) as [FilterKey, string][]).map(([key, value]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key, '')}
              className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-portal/30 bg-portal/10 py-1 pl-3 pr-2 text-xs text-portal transition-colors hover:bg-portal/20"
            >
              <span className="text-portal/60">{FILTER_LABELS[key]}:</span> {value}
              <X className="size-3 opacity-60 group-hover:opacity-100" />
            </button>
          ))}
          <button
            type="button"
            onClick={reset}
            className="cursor-pointer px-2 text-xs text-fg-muted underline-offset-4 hover:text-fg hover:underline"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
