import { IGeereedFilterState } from '../typings';

export function useGeereedDnd(
  sortKey: string,
  searchTerm: string,
  columnFilters: IGeereedFilterState,
  editingIndex: number | null
) {
  if (process.env.NODE_ENV === 'test') return true;

  const disableDnd =
    !!sortKey ||
    !!searchTerm ||
    Object.values(columnFilters).some((filter) => !!filter) ||
    !!editingIndex ||
    editingIndex === 0;

  return disableDnd;
}
