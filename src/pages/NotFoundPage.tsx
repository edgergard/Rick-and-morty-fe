import { Link } from 'react-router';
import { Logo } from '@/shared/ui';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-6 py-32 text-center">
      <Logo className="size-20 animate-[spin_8s_linear_infinite]" />
      <h1 className="font-mono text-6xl font-bold text-portal">404</h1>
      <p className="text-fg-muted">Wubba lubba dub dub! This page fell through a portal.</p>
      <Link
        to="/"
        className="rounded-xl bg-portal px-5 py-2.5 text-sm font-semibold text-ink hover:bg-portal-300"
      >
        Take me home
      </Link>
    </div>
  );
}
