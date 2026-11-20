import { useEffect } from 'react';
import { Link } from 'react-router';
import { History, ListFilter, Trash2, X } from 'lucide-react';
import { FILTER_LABELS, filtersToSearch, type FilterKey } from '@/features/character-filters';
import { cn, timeAgo } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { useHistory, type HistoryEntry } from './store';

export function HistoryDrawer() {
  const { entries, isOpen, close, clear, remove } = useHistory();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <div
      className={cn('fixed inset-0 z-50', !isOpen && 'pointer-events-none')}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={cn(
          'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Activity history"
        inert={!isOpen}
        className={cn(
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-ink/95 backdrop-blur-xl',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">History</h2>
            <p className="text-xs text-fg-muted">Characters you viewed and searches you ran</p>
          </div>
          <Button variant="ghost" size="icon" onClick={close} aria-label="Close history">
            <X className="size-5" />
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          {entries.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-fg-muted">
              <History className="size-8 text-fg-subtle" />
              <p className="text-sm">Nothing here yet. Go explore the multiverse!</p>
            </div>
          ) : (
            <ul className="space-y-1">
              {entries.map((entry) => (
                <li key={entry.id} className="group relative">
                  <EntryLink entry={entry} onNavigate={close} />
                  <button
                    type="button"
                    onClick={() => remove(entry.id)}
                    aria-label="Remove entry"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1.5 text-fg-subtle opacity-0 transition hover:bg-white/10 hover:text-fg group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <X className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {entries.length > 0 && (
          <footer className="border-t border-line p-4">
            <Button
              variant="ghost"
              className="w-full text-rose-400 hover:text-rose-300"
              onClick={clear}
            >
              <Trash2 className="size-4" /> Clear history
            </Button>
          </footer>
        )}
      </aside>
    </div>
  );
}

function EntryLink({ entry, onNavigate }: { entry: HistoryEntry; onNavigate: () => void }) {
  const base = 'flex items-center gap-3 rounded-xl p-3 pr-12 transition-colors hover:bg-white/5';

  if (entry.kind === 'view') {
    return (
      <Link to={`/character/${entry.characterId}`} onClick={onNavigate} className={base}>
        <img src={entry.image} alt="" className="size-10 rounded-lg object-cover" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{entry.name}</p>
          <p className="text-xs text-fg-subtle">Viewed · {timeAgo(entry.at)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/${filtersToSearch(entry.filters)}`} onClick={onNavigate} className={base}>
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-portal/10 text-portal">
        <ListFilter className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm">
          {(Object.entries(entry.filters) as [FilterKey, string][])
            .map(([key, value]) => `${FILTER_LABELS[key]}: ${value}`)
            .join(' · ')}
        </p>
        <p className="text-xs text-fg-subtle">Searched · {timeAgo(entry.at)}</p>
      </div>
    </Link>
  );
}
