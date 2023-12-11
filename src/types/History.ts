type Action = 'check' | 'filter';

type HistoryFilter = {
  id: string;
  select: string;
  filterName: string[];
  filterValue: string[];
};

export type History = {
  id: number | null;
  characterName: string | null;
  action: Action;
  filters: HistoryFilter[] | null;
};
