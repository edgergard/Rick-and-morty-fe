import { useEffect, useState, type ImgHTMLAttributes } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/shared/lib';

const MAX_ATTEMPTS = 3;

type Phase = 'loading' | 'waiting' | 'failed';
type LoadState = { src: string; attempt: number; phase: Phase };

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'> & { src: string; alt: string };

/**
 * Avatars come from the same rate-limited host as the API, so a burst of page loads can
 * make some of them fail. Retry a couple of times with a growing delay, then show a
 * placeholder instead of the browser's broken-image icon.
 */
export function CharacterImage({ src, alt, className, ...props }: Props) {
  const [state, setState] = useState<LoadState>({ src, attempt: 0, phase: 'loading' });

  // A new src starts over (React's "adjust state on prop change" pattern).
  const current: LoadState = state.src === src ? state : { src, attempt: 0, phase: 'loading' };
  if (current !== state) setState(current);

  useEffect(() => {
    if (current.phase !== 'waiting') return;
    const timer = window.setTimeout(
      () => setState((s) => ({ ...s, attempt: s.attempt + 1, phase: 'loading' })),
      1500 * (current.attempt + 1),
    );
    return () => window.clearTimeout(timer);
  }, [current.phase, current.attempt]);

  if (current.phase === 'failed') {
    return (
      <div
        role="img"
        aria-label={`${alt} (image unavailable)`}
        className={cn('grid place-items-center bg-white/[0.04] text-fg-subtle', className)}
      >
        <ImageOff className="size-8" aria-hidden />
      </div>
    );
  }

  return (
    <img
      {...props}
      // A new key remounts the element so the browser requests the image again.
      key={`${current.src}#${current.attempt}`}
      src={current.src}
      alt={alt}
      className={cn(className, current.phase === 'waiting' && 'invisible')}
      onError={() =>
        setState((s) => ({
          ...s,
          phase: s.attempt + 1 < MAX_ATTEMPTS ? 'waiting' : 'failed',
        }))
      }
    />
  );
}
