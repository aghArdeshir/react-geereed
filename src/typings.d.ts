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