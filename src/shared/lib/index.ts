import { useEffect, useState } from 'react';

export { clsx as cn } from 'clsx';

export function useDebouncedValue<T>(value: T, delay = 350): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function downloadFile(content: string, filename: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = Object.assign(document.createElement('a'), { href: url, download: filename });
  link.click();
  URL.revokeObjectURL(url);
}

type Cell = string | number | null | undefined;

const escapeCell = (cell: Cell) => {
  const value = String(cell ?? '');
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
};

export function toCsv<T>(rows: T[], columns: { header: string; value: (row: T) => Cell }[]) {
  const head = columns.map((c) => escapeCell(c.header)).join(',');
  const body = rows.map((row) => columns.map((c) => escapeCell(c.value(row))).join(','));
  return [head, ...body].join('\n');
}

const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

export function timeAgo(timestamp: number) {
  const seconds = Math.round((timestamp - Date.now()) / 1000);
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, size] of steps) {
    if (Math.abs(seconds) >= size) return relative.format(Math.round(seconds / size), unit);
  }
  return 'just now';
}
