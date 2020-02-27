import React from 'react';
import { IGeereedHeaderCell } from '../typings';
import { SORT_TYPES } from '../hooks/use-geereed-sort';

export default function GeereedHeaderCell(props: IGeereedHeaderCell) {
    const {
        sortKey,
        sortType,
        column,
        onSortCallback,
        columnFilter,
        dispatchColumnFilters
    } = props;

    const onFilterChange = React.useCallback(e => dispatchColumnFilters({ value: e.target.value, columnKey: column.key }), [column.key, dispatchColumnFilters])

    return <th
        style={{ color: sortKey === column.key ? 'red' : '' }}
    >
        <div style={{ display: 'flex' }}>
            <span onClick={() => onSortCallback(column.key)}>
                {column.title || column.key}
                <span style={{ marginLeft: 10, minWidth: 25 }}>
                    {sortKey === column.key && sortType === SORT_TYPES.ASC ? <>&#9196;</> : <></>}
                    {sortKey === column.key && sortType === SORT_TYPES.DES ? <>&#9195;</> : <></>}
                </span>
            </span>
            <input value={columnFilter || ''} onChange={onFilterChange} />
        </div>
    </th>
}