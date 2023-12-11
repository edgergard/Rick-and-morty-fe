import { FieldValues } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { FilterHistoryItem, FilterOptions } from '../types/DropdownOptions';

export const generateUniqueId = () => {
  return uuidv4();
};

export function getFilterHistory(history: FieldValues) {
  return Object.entries(history)
    .map(([select, val]) => {
      switch (select) {
        case 'char-name':
          return val ? ['Character', 'Name', val] : null;
        case 'char-status':
          return val ? ['Character', 'Status', val] : null;
        case 'char-species':
          return val ? ['Character', 'Species', val] : null;
        case 'char-type':
          return val ? ['Character', 'Type', val] : null;
        case 'char-gender':
          return val ? ['Character', 'Gender', val] : null;
        case 'loc-name':
          return val ? ['Location', 'Name', val] : null;
        case 'loc-type':
          return val ? ['Location', 'Type', val] : null;
        case 'loc-dimension':
          return val ? ['Location', 'Dimension', val] : null;
        case 'epis-name':
          return val ? ['Episode', 'Name', val] : null;
        case 'epis-id':
          return val ? ['Episode', 'Episode-list', val] : null;
        default:
          return null;
      }
    })
    .filter((value): value is [string, string, string] => value !== null)
    .reduce((
      acc: FilterHistoryItem[],
      [select, type, val]: [string, string, string],
    ) => {
      const existingItem = acc.find(item => item.select === select);

      if (existingItem) {
        existingItem.filterValue.push(val);
        existingItem.filterName.push(type);
      } else {
        const id = generateUniqueId();

        acc.push({
          id,
          select,
          filterValue: [val],
          filterName: [type],
        });
      }

      return acc;
    },
    []);
}

export function getBorderRadius(index: number, filter: FilterOptions[]) {
  let borderRadiusValue;

  if (index === 0) {
    borderRadiusValue = '8px 8px 0 0';
  } else if (index === filter.length - 1) {
    borderRadiusValue = '0 0 8px 8px';
  } else {
    borderRadiusValue = '0 0 0 0';
  }

  return borderRadiusValue;
}
