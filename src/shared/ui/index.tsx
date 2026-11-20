import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib';

type Variant = 'primary' | 'ghost' | 'outline';

const variants: Record<Variant, string> = {
  primary:
    'bg-portal text-ink hover:bg-portal-300 shadow-[0_0_24px_-6px] shadow-portal/60 font-semibold',
  ghost: 'text-fg-muted hover:text-fg hover:bg-white/5',
  outline: 'border border-line text-fg hover:border-portal/50 hover:bg-white/5',
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: 'sm' | 'md' | 'icon';
};

export function Button({ variant = 'outline', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl text-sm transition-all duration-200',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal',
        'disabled:pointer-events-none disabled:opacity-40',
        size === 'sm' && 'h-9 px-3',
        size === 'md' && 'h-11 px-4',
        size === 'icon' && 'size-10',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-white/[0.06]', className)} />;
}

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  /** "alert" makes screen readers announce it, e.g. for a failed request. */
  role?: 'alert';
};

export function EmptyState({ icon, title, description, action, role }: EmptyStateProps) {
  return (
    <div
      role={role}
      className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-line px-6 py-20 text-center"
    >
      <div className="grid size-14 place-items-center rounded-2xl bg-white/5 text-portal">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="max-w-sm text-sm text-fg-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="portal-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ecfccb" />
          <stop offset="45%" stopColor="#a3e635" />
          <stop offset="100%" stopColor="#3f6212" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill="url(#portal-gradient)" />
      <path
        d="M16 5c5 0 9 4 9 9s-3 8-7 8-6-3-6-6 2-4 4-4 3 1 3 3"
        fill="none"
        stroke="#1a2e05"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

type ErrorNoticeProps = { message: string; onRetry: () => void; retrying?: boolean };

/** Compact inline error, for when older data is still on screen and only a refresh failed. */
export function ErrorNotice({ message, onRetry, retrying }: ErrorNoticeProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-2xl border border-rose-400/25 bg-rose-500/10 p-4 text-sm text-rose-100 sm:flex-row sm:items-center"
    >
      <p className="flex-1">{message}</p>
      <Button
        size="sm"
        variant="outline"
        onClick={onRetry}
        disabled={retrying}
        className="shrink-0"
      >
        Try again
      </Button>
    </div>
  );
}
