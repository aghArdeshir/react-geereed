import React from 'react';
import { randomName, randomLastName, getRandom } from './Demo.Service';
import ReactGeereed from '../ReactGeereed';

export default function DemoBasicStudentsList() {
  const columns = React.useMemo(
    () => [
      {
        key: 'Name' // title will be set equal to key if not provided
      },
      { key: 'LastName', title: 'Last Name' },
      { key: 'Age' },
      { key: 'AverageMarks', title: 'Average Marks' }
    ],
    []
  );

  const [items, setItems] = React.useState(
    new Array(10).fill(1).map(() => ({
      Name: randomName(),
      LastName: randomLastName(),
      Age: getRandom(100),
      AverageMarks: getRandom(20)
    }))
  );

  const actions = React.useCallback(
    (rowItem, rowIndex: number) => {
      return (
        <>
          <button
            onClick={() => {
              if (window.confirm('sure?')) {
                const _items = [...items];
                _items.splice(rowIndex, 1);
                setItems(_items);
              }
            }}
          >
            Delete
          </button>
        </>
      );
    },
    [items]
  );

  return <ReactGeereed columns={columns} items={items} actions={actions} />;
}
