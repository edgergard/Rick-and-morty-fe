import { useState, type ReactNode } from 'react';
import { LoaderCircle, WifiOff } from 'lucide-react';
import { useApiStatus, type ApiStatus } from '@/shared/api/status';
import { cn } from '@/shared/lib';

type VisibleStatus = Exclude<ApiStatus, { state: 'ok' }>;

/**
 * App-wide toast for transient API problems: automatic retries (rate limiting, flaky
 * network) and being offline. A final failure is shown inline by the page itself,
 * next to a "Try again" button (role="alert"), so it is not repeated here.
 */
export function ApiStatusBanner() {
  const { status } = useApiStatus();
  const visible = status.state !== 'ok';

  // Keep the last message rendered while the toast fades out.
  const [shown, setShown] = useState<VisibleStatus | null>(null);
  if (visible && (shown?.state !== status.state || !sameAttempt(shown, status))) {
    setShown(status);
  }

  return (
    <div
      role="status"
      aria-live="polite"
      // Purely informational: never block taps on whatever is underneath.
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 transition-all duration-300 motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
      )}
    >
      {/* Content stays mounted for the fade-out but is only announced while visible. */}
      <div
        className={cn(
          'w-full max-w-xl transition-[visibility] duration-300',
          !visible && 'invisible',
        )}
      >
        {shown?.state === 'retrying' && (
          <Toast tone="warn" icon={<LoaderCircle className="size-5 animate-spin text-amber-300" />}>
            <p className="font-semibold">The Rick and Morty API is responding slowly</p>
            <p className="text-amber-100/75">
              It may be limiting requests. Retrying automatically… ({shown.attempt}/
              {shown.maxAttempts})
            </p>
          </Toast>
        )}

        {shown?.state === 'offline' && (
          <Toast tone="error" icon={<WifiOff className="size-5 text-rose-300" />}>
            <p className="font-semibold">You're offline</p>
            <p className="text-rose-100/75">We'll load the data as soon as you're back online.</p>
          </Toast>
        )}
      </div>
    </div>
  );
}

const sameAttempt = (a: VisibleStatus | null, b: VisibleStatus) =>
  a?.state === 'retrying' && b.state === 'retrying' ? a.attempt === b.attempt : true;

function Toast({
  tone,
  icon,
  children,
}: {
  tone: 'warn' | 'error';
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-2xl border p-4 text-sm shadow-2xl',
        tone === 'warn'
          ? 'border-amber-400/30 bg-[#2a1d06] text-amber-50'
          : 'border-rose-400/30 bg-[#2a0a12] text-rose-50',
      )}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>{children}</div>
    </div>
  );
}
