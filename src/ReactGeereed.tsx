import React from 'react';
import { IReactGeereedProps, IGeereedColumn, IGeereedItem } from './typings';
import { useGeereedSort, SORT_TYPES } from './hooks/use-geereed-hook';

function ReactGeereed(props: IReactGeereedProps) {
  const { columns, items } = props;

  const [sortKey, sortType, onSortCallback] = useGeereedSort();

  return (
    <table className="react-geereed">
      <thead>
        <tr>
          {columns.map((column: IGeereedColumn) => (
            <th
              key={column.key}
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
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item: IGeereedItem, index: number) => <tr key={index}> {/** TOOD: do something with key */}
          {columns.map((column: IGeereedColumn) => <td key={column.key}>{item[column.key]}</td>)}
        </tr>)}
      </tbody>
    </table>
  );
}

export default ReactGeereed;
