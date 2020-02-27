import React from 'react';

export enum SORT_TYPES {
    ASC = 'ASC',
    DES = 'DES'
}

export function useGeereedSort(): [string, SORT_TYPES.ASC | SORT_TYPES.DES, (key: string) => void] {
    const [sortKey, setSortKey] = React.useState('');
    const [sortType, setSortType] = React.useState(SORT_TYPES.ASC);

    const onSortCallback = React.useCallback((columnKey: string) => {
        if (sortKey === columnKey) {
            if (sortType === SORT_TYPES.ASC) { setSortType(SORT_TYPES.DES); }
            else if (sortType === SORT_TYPES.DES) { setSortType(SORT_TYPES.ASC); setSortKey(''); }
        } else {
            setSortType(SORT_TYPES.ASC); setSortKey(columnKey);
        }
    }, [sortKey, sortType]);

    return [sortKey, sortType, onSortCallback];
}