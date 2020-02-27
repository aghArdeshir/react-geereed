import React from 'react';
import { IReactGeereedProps, IGeereedColumn, IGeereedItem } from './typings';
import { useGeereedSort } from './hooks/use-geereed-sort';
import { useGeereedItems } from './hooks/use-geereed-items'
import { useGeereedSearch } from './hooks/use-geereed-search';
import GeereedHeaderCell from './components/GeereedHeaderCell';

function ReactGeereed(props: IReactGeereedProps) {
  const { columns, items } = props;
  const [sortKey, sortType, onSortCallback] = useGeereedSort();
  const [searchTerm, setSearchTerm] = useGeereedSearch();
  const _items = useGeereedItems(items, { sortKey, sortType, searchTerm });

  return (<>
    <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search..." autoFocus />
    <table className="react-geereed">
      <thead>
        <tr>
          {columns.map((column: IGeereedColumn) => (
            <GeereedHeaderCell
              key={column.key}
              sortKey={sortKey}
              sortType={sortType}
              column={column}
              onSortCallback={onSortCallback}
            ></GeereedHeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {_items.map((item: IGeereedItem, index: number) => <tr key={index}> {/** TOOD: do something with key */}
          {columns.map((column: IGeereedColumn) => <td key={column.key}>{item[column.key]}</td>)}
        </tr>)}
      </tbody>
    </table></>
  );
}

export default ReactGeereed;
