import { ReactElement } from 'react';

export interface IGeereedColumn {
  key: string;
  title?: string;
  editor?: ReactComponentElement;
  filterComponent?: () => ReactElement;
}

export interface IGeereedItem {
  [key: string]: any;
}

export interface IReactGeereedProps {
  columns: IGeereedColumn[];
  items: IGeereedItem[];
  groupBy?: string;
  pagination?: IGeereedPagination;
  actions?: (rowItem: any, rowIndex: number) => ReactElement;
  editActions?: (rowItem?: any, rowIndex?: number) => ReactElement;
  onDragEnd?: (sourceIndex: number, destinationIndex: number) => void;
  onPage?: (page: number) => void;
  onRefresh?: () => void;
  columnFilters?: IGeereedFilterState;
}

export interface IUseGeereedItemsOptions {
  sortKey?: string;
  sortType?: string;
  searchTerm?: string;
  columnFilters?: IGeereedFilterState;
  groupBy?: string;
}

export type IUseGeereedSort = [
  string,
  SORT_TYPES.ASC | SORT_TYPES.DES,
  (columnKey: string) => void
];
export type IUseGeereedSearch = [string, (searchTerm: string) => void];

export interface IGeereedHeaderCell {
  sortKey: string;
  sortType: string;
  column: IGeereedColumn;
  onSortCallback: IUseGeereedSort[2];
  columnFilter: string;
  dispatchColumnFilters: any;
}

export interface IGeereedFilterState {
  [coluumnKey: string]: string;
}

export interface IGeereedFilterAction {
  columnKey: string;
  value: string;
}

export type IUseGeereedSelect = [any[], (rowItem: any) => void];

export interface IGeereedRef {
  addNew: () => void;
  cancelAdd: () => void;
  setEdit: (rowIndex: number) => void;
  cancelEdit: () => void;
}

export type IUseGeereedColumns = [
  IGeereedColumn[],
  IGeereedColumn | undefined,
  { [key: string]: boolean },
  React.Dispatch<(groupName: string) => void>
];

export interface IGeereedRenderRowOptions {
  display?: '' | 'none';
}

export interface IGeereedPagination {
  page: number; // start from 1
  totalPages: number;
  itemsPerPage?: number;
}
