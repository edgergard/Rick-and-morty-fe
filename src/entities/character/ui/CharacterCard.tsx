import { Link } from 'react-router';
import { MapPin, Tv } from 'lucide-react';
import { Skeleton } from '@/shared/ui';
import type { CharacterPreview } from '../model/types';
import { CharacterImage } from './CharacterImage';
import { StatusBadge } from './StatusBadge';

export function CharacterCard({ character }: { character: CharacterPreview }) {
  const { id, name, image, status, species, location, episode } = character;
  const firstEpisode = episode[0];

  return (
    <Link
      to={`/character/${id}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-portal/40 hover:shadow-[0_24px_60px_-24px] hover:shadow-portal/40 focus-visible:outline-2 focus-visible:outline-portal"
    >
      <div className="relative aspect-square overflow-hidden">
        <CharacterImage
          src={image}
          alt={name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
        <StatusBadge status={status} className="absolute left-3 top-3" />
      </div>

      <div className="relative -mt-10 flex flex-1 flex-col gap-4 p-5 pt-0">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
            {species}
          </p>
          <h3 className="line-clamp-1 text-lg font-semibold tracking-tight transition-colors group-hover:text-portal">
            {name}
          </h3>
        </div>

        <dl className="mt-auto space-y-1.5 text-sm text-fg-muted">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Last known location</dt>
            <MapPin className="size-3.5 shrink-0 text-fg-subtle" aria-hidden />
            <dd className="line-clamp-1">{location.name}</dd>
          </div>
          {firstEpisode && (
            <div className="flex items-center gap-2">
              <dt className="sr-only">First seen in</dt>
              <Tv className="size-3.5 shrink-0 text-fg-subtle" aria-hidden />
              <dd className="line-clamp-1">
                <span className="font-mono text-xs text-fg-subtle">{firstEpisode.episode}</span>{' '}
                {firstEpisode.name}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </Link>
  );
}

export function CharacterCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-surface">
      <Skeleton className="aspect-square rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
