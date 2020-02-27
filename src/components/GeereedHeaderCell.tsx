import React from 'react';
import { IGeereedHeaderCell } from '../typings';
import { SORT_TYPES } from '../hooks/use-geereed-sort';

export default function GeereedHeaderCell(props: IGeereedHeaderCell) {
    const { sortKey, sortType, column, onSortCallback } = props;
    return <th
        style={{ color: sortKey === column.key ? 'red' : '' }}
        onClick={() => onSortCallback(column.key)}
    >
        <div style={{ display: 'flex' }}>
            {column.title || column.key}
            <span style={{ marginLeft: 10, minWidth: 25 }}>
                {sortKey === column.key && sortType === SORT_TYPES.ASC ? <>&#9196;</> : <></>}
                {sortKey === column.key && sortType === SORT_TYPES.DES ? <>&#9195;</> : <></>}
            </span>
        </div>
    </th>
}