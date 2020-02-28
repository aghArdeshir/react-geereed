import { IGeereedFilterState } from '../typings';

export default function useGeereedDnd(
  sortKey: string,
  searchTerm: string,
  columnFilters: IGeereedFilterState,
  editingIndex: number | null
) {
  return (
    !!sortKey ||
    !!searchTerm ||
    Object.values(columnFilters).some(filter => !!filter) ||
    !!editingIndex || editingIndex === 0
  );
}
