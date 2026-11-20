import { API_DOCS_URL, GITHUB_URL } from '@/shared/config';
import { Logo } from '@/shared/ui';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-fg-muted sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <Logo className="size-5" />
          <span>Built by edgergard · {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-5">
          <a href={API_DOCS_URL} target="_blank" rel="noreferrer" className="hover:text-portal">
            Data: The Rick and Morty API
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-portal">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
