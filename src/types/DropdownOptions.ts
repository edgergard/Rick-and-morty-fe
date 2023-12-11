export type SelectOptions = {
  id: number;
  value: string;
  label: string;
};

export type FilterOptions = {
  id: number;
  item: string;
  value: string;
  label: string;
};

export interface FilterHistoryItem {
  id: string;
  select: string;
  filterName: string[];
  filterValue: string[];
}
