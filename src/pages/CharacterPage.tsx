import { describeError } from '@/shared/api/client';
import { useEffect, useMemo, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Dna,
  Globe,
  MapPin,
  Sparkles,
  Tv,
  User,
} from 'lucide-react';
import { StatusBadge, useCharacter, type Episode } from '@/entities/character';
import { useHistory } from '@/features/history';
import { Button, EmptyState, Skeleton } from '@/shared/ui';

const groupBySeason = (episodes: Episode[]) =>
  episodes.reduce<Record<string, Episode[]>>((acc, ep) => {
    const season = ep.episode.slice(0, 3); // "S01"
    (acc[season] ??= []).push(ep);
    return acc;
  }, {});

export function CharacterPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: character, isPending, isError, error } = useCharacter(id);
  const addView = useHistory((s) => s.addView);

  useEffect(() => {
    if (character) addView(character);
    window.scrollTo({ top: 0 });
  }, [character, addView]);

  const seasons = useMemo(() => groupBySeason(character?.episode ?? []), [character]);

  if (isPending) return <CharacterSkeleton />;

  if (isError || !character) {
    return (
      <div className="py-20">
        <EmptyState
          icon={<User className="size-6" />}
          title="Character not found"
          description={
            isError ? describeError(error) : 'This being does not exist in any known dimension.'
          }
          action={<Button onClick={() => navigate('/')}>Back to all characters</Button>}
        />
      </div>
    );
  }

  const numericId = Number(character.id);

  return (
    <article className="space-y-10 pt-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="size-4" /> Back
        </Button>
        <div className="flex items-center gap-1">
          <Link
            to={`/character/${numericId - 1}`}
            aria-label="Previous character"
            aria-disabled={numericId <= 1}
            className="grid size-9 place-items-center rounded-xl text-fg-muted hover:bg-white/5 hover:text-fg aria-disabled:pointer-events-none aria-disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </Link>
          <span className="font-mono text-xs text-fg-subtle">#{character.id}</span>
          <Link
            to={`/character/${numericId + 1}`}
            aria-label="Next character"
            className="grid size-9 place-items-center rounded-xl text-fg-muted hover:bg-white/5 hover:text-fg"
          >
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </div>

      <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="absolute -inset-6 rounded-full bg-portal/20 blur-3xl" aria-hidden />
          <img
            src={character.image}
            alt={character.name}
            className="relative aspect-square w-full rounded-[2rem] border border-white/10 object-cover shadow-2xl"
          />
          <StatusBadge status={character.status} className="absolute left-4 top-4" />
        </div>

        <div className="space-y-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-portal">
              {character.species}
              {character.type && ` · ${character.type}`}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{character.name}</h1>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <Fact icon={<Dna />} label="Species" value={character.species} />
            <Fact icon={<User />} label="Gender" value={character.gender} />
            <Fact
              icon={<Globe />}
              label="Origin"
              value={character.origin.name}
              hint={character.origin.dimension}
            />
            <Fact
              icon={<MapPin />}
              label="Last known location"
              value={character.location.name}
              hint={character.location.dimension}
            />
            <Fact
              icon={<Tv />}
              label="Episodes"
              value={`${character.episode.length} appearances`}
            />
            <Fact
              icon={<Sparkles />}
              label="First seen in"
              value={character.episode[0]?.name ?? '—'}
              hint={character.episode[0]?.episode}
            />
          </dl>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-semibold tracking-tight">Appearances</h2>
        <div className="space-y-6">
          {Object.entries(seasons).map(([season, episodes]) => (
            <div key={season} className="grid gap-3 md:grid-cols-[80px_1fr]">
              <p className="font-mono text-sm text-fg-subtle md:pt-3">
                Season {Number(season.slice(1))}
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {episodes.map((ep) => (
                  <li
                    key={ep.id}
                    className="rounded-2xl border border-line bg-surface px-4 py-3 transition-colors hover:border-portal/30"
                  >
                    <p className="font-mono text-[11px] text-portal">{ep.episode}</p>
                    <p className="truncate text-sm font-medium">{ep.name}</p>
                    <p className="text-xs text-fg-subtle">{ep.air_date}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

function Fact({
  icon,
  label,
  value,
  hint,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string | null;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-line bg-surface p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/5 text-fg-muted [&>svg]:size-4">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-xs text-fg-subtle">{label}</dt>
        <dd className="truncate font-medium">{value}</dd>
        {hint && hint !== 'unknown' && <dd className="truncate text-xs text-fg-muted">{hint}</dd>}
      </div>
    </div>
  );
}

function CharacterSkeleton() {
  return (
    <div className="grid gap-10 pt-20 lg:grid-cols-[420px_1fr]">
      <Skeleton className="aspect-square rounded-[2rem]" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-2/3" />
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
