import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CharacterFilters } from '@/entities/character';

const MAX_ENTRIES = 50;
/** Filter changes closer together than this collapse into one entry (typing in search). */
const FILTER_MERGE_WINDOW = 4000;

type Base = { id: string; at: number };
export type HistoryEntry =
  | (Base & { kind: 'view'; characterId: string; name: string; image: string })
  | (Base & { kind: 'filter'; filters: Partial<CharacterFilters> });

interface HistoryState {
  entries: HistoryEntry[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addView: (character: { id: string; name: string; image: string }) => void;
  addFilter: (filters: Partial<CharacterFilters>) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const meta = (): Base => ({ id: crypto.randomUUID(), at: Date.now() });

export const useHistory = create<HistoryState>()(
  persist(
    (set) => ({
      entries: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),

      addView: ({ id, name, image }) =>
        set(({ entries }) => {
          const [last] = entries;
          if (last?.kind === 'view' && last.characterId === id) return {};
          const entry: HistoryEntry = { ...meta(), kind: 'view', characterId: id, name, image };
          return { entries: [entry, ...entries].slice(0, MAX_ENTRIES) };
        }),

      addFilter: (filters) =>
        set(({ entries }) => {
          const [last, ...rest] = entries;
          const entry: HistoryEntry = { ...meta(), kind: 'filter', filters };
          const merge = last?.kind === 'filter' && entry.at - last.at < FILTER_MERGE_WINDOW;
          return { entries: [entry, ...(merge ? rest : entries)].slice(0, MAX_ENTRIES) };
        }),

      remove: (id) => set(({ entries }) => ({ entries: entries.filter((e) => e.id !== id) })),
      clear: () => set({ entries: [] }),
    }),
    {
      name: 'rm-history',
      version: 2,
      partialize: ({ entries }) => ({ entries }),
    },
  ),
);
