import React from 'react';
import { IReactGeereedProps, IGeereedColumn, IGeereedItem } from './typings';

function ReactGeereed(props: IReactGeereedProps) {
  const { columns, items } = props;
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column: IGeereedColumn) => <th key={column.key}>{column.title || column.key}</th>)}
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
