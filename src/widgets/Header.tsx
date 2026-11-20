import { Link } from 'react-router';
import { History } from 'lucide-react';
import { useHistory } from '@/features/history';
import { GITHUB_URL } from '@/shared/config';
import { Button, GithubIcon, Logo } from '@/shared/ui';

export function Header() {
  const open = useHistory((s) => s.open);
  const count = useHistory((s) => s.entries.length);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <Logo className="size-8 transition-transform duration-500 group-hover:rotate-180" />
          <span className="font-semibold tracking-tight">
            Rick<span className="text-portal">&</span>Morty
            <span className="ml-2 hidden font-mono text-[11px] font-normal uppercase tracking-widest text-fg-subtle sm:inline">
              Multiverse
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={open} className="relative">
            <History className="size-4" />
            <span className="hidden sm:inline">History</span>
            {count > 0 && (
              <span className="grid min-w-5 place-items-center rounded-full bg-portal/15 px-1.5 font-mono text-[10px] text-portal">
                {count}
              </span>
            )}
          </Button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Source code on GitHub"
            className="grid size-9 place-items-center rounded-xl text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
          >
            <GithubIcon className="size-4.5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
