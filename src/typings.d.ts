import { ReactElement } from 'react';

export interface IGeereedColumn {
  key: string;
  title?: string;
  editor?: ReactComponentElement;
}

export interface IGeereedItem {
  [key: string]: any;
}

export interface IReactGeereedProps {
  columns: IGeereedColumn[];
  items: IGeereedItem[];
  actions?: (rowItem: any, rowIndex: number) => ReactElement;
  editActions?: (rowItem?: any, rowIndex?: number) => ReactElement;
  onDragEnd?: (sourceIndex: number, destinationIndex: number) => void;
}

export interface IUseGeereedItemsOptions {
  sortKey?: string;
  sortType?: string;
  searchTerm?: string;
  columnFilters?: IGeereedFilterState;
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
