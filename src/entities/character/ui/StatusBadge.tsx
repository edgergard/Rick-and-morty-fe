import { cn } from '@/shared/lib';
import type { CharacterStatus } from '../model/types';

const tones: Record<CharacterStatus, { dot: string; text: string }> = {
  Alive: { dot: 'bg-portal shadow-[0_0_10px] shadow-portal', text: 'text-portal' },
  Dead: { dot: 'bg-rose-500 shadow-[0_0_10px] shadow-rose-500', text: 'text-rose-400' },
  unknown: { dot: 'bg-zinc-400', text: 'text-zinc-300' },
};

export function StatusBadge({
  status,
  className,
}: {
  status: CharacterStatus;
  className?: string;
}) {
  const tone = tones[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-2.5 py-1',
        'font-mono text-[11px] uppercase tracking-wider backdrop-blur-md',
        tone.text,
        className,
      )}
    >
      <span
        className={cn('size-1.5 rounded-full', tone.dot, status === 'Alive' && 'animate-pulse')}
      />
      {status}
    </span>
  );
}
