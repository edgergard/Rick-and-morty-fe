import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

type Item = number | 'gap';

/** 1 … 4 5 [6] 7 8 … 42 */
function getPageItems(page: number, total: number, siblings = 1): Item[] {
  const pages = new Set([1, total]);
  for (let p = page - siblings; p <= page + siblings; p += 1) {
    if (p >= 1 && p <= total) pages.add(p);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((p, i) => {
    const prev = sorted[i - 1];
    if (prev === undefined || p - prev === 1) return [p];
    return p - prev === 2 ? [prev + 1, p] : ['gap' as const, p];
  });
}

type Props = { page: number; total: number; onChange: (page: number) => void };

export function Pagination({ page, total, onChange }: Props) {
  if (total <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      <Button
        size="icon"
        variant="ghost"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
      </Button>

      {getPageItems(page, total).map((item, index) =>
        item === 'gap' ? (
          <span key={`gap-${index}`} className="w-8 text-center text-fg-subtle">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              'size-10 cursor-pointer rounded-xl font-mono text-sm transition-all',
              item === page
                ? 'bg-portal font-semibold text-ink shadow-[0_0_20px_-4px] shadow-portal/60'
                : 'text-fg-muted hover:bg-white/5 hover:text-fg',
            )}
          >
            {item}
          </button>
        ),
      )}

      <Button
        size="icon"
        variant="ghost"
        disabled={page >= total}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}
