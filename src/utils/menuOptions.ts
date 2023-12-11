import { FilterOptions, SelectOptions } from '../types/DropdownOptions';

export const selectOptions: SelectOptions[] = [
  { id: 1, value: 'character', label: 'Character' },
  { id: 2, value: 'location', label: 'Location' },
  { id: 3, value: 'episode', label: 'Episode' },
];

export const filterOptions: FilterOptions[] = [
  {
    id: 1,
    item: 'character',
    value: 'char-name',
    label: 'Add character name',
  },
  {
    id: 2,
    item: 'character',
    value: 'char-status',
    label: 'Add character status',
  },
  {
    id: 3,
    item: 'character',
    value: 'char-species',
    label: 'Add character species',
  },
  {
    id: 4,
    item: 'character',
    value: 'char-type',
    label: 'Add character type',
  },
  {
    id: 5,
    item: 'character',
    value: 'char-gender',
    label: 'Add character gender',
  },
  {
    id: 6,
    item: 'location',
    value: 'loc-name',
    label: 'Add location name',
  },
  {
    id: 7,
    item: 'location',
    value: 'loc-type',
    label: 'Add location type',
  },
  {
    id: 8,
    item: 'location',
    value: 'loc-dimension',
    label: 'Add location dimension',
  },
  {
    id: 9,
    item: 'episode',
    value: 'epis-name',
    label: 'Add episode name',
  },
  {
    id: 10,
    item: 'episode',
    value: 'epis-id',
    label: 'Add episodes',
  },
];
