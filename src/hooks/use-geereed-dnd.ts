import { IGeereedFilterState } from '../typings';

export function useGeereedDnd(
  sortKey: string,
  searchTerm: string,
  columnFilters: IGeereedFilterState,
  editingIndex: number | null
) {
  const disableDnd =
    !!sortKey ||
    !!searchTerm ||
    Object.values(columnFilters).some((filter) => !!filter) ||
    !!editingIndex ||
    editingIndex === 0;

  return disableDnd;
}
