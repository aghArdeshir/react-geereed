import { IGeereedFilterState } from '../typings';

export default function useGeereedDnd(
  sortKey: string,
  searchTerm: string,
  columnFilters: IGeereedFilterState
) {
  return (
    !!sortKey ||
    !!searchTerm ||
    Object.values(columnFilters).some(filter => !!filter)
  );
}
