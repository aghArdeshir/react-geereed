export interface IGeereedColumn {
    key: string;
    title?: string;
}

export interface IGeereedItem {
    [key: string]: any
}

export interface IReactGeereedProps {
    columns: IGeereedColumn[];
    items: IGeereedItem[];
}

export interface IUseGeereedItemsOptions {
    sortKey?: string;
    sortType?: string;
    searchTerm?: string;
}

export type IUseGeereedSort = [string, SORT_TYPES.ASC | SORT_TYPES.DES, (columnKey: string) => void];
export type IUseGeereedSearch = [string, (searchTerm: string) => void];

export interface IGeereedHeaderCell { sortKey: string; sortType: string; column: IGeereedColumn; onSortCallback: IUseGeereedSort[2] }