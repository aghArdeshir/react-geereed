import React from 'react';
import { randomName, randomLastName, getRandom } from './Demo.Service';
import ReactGeereed from '../ReactGeereed';

const mockItems = new Array(10).fill(1).map(() => ({
  Name: randomName(),
  LastName: randomLastName(),
  Age: getRandom(100),
  AverageMarks: getRandom(20)
}));

const columns = [
  {
    key: 'Name' // title will be set equal to key if not provided
  },
  { key: 'LastName', title: 'Last Name' },
  { key: 'Age' },
  { key: 'AverageMarks', title: 'Average Marks' }
];

export default function DemoBasicStudentsList() {
  const [items, setItems] = React.useState(mockItems);

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

  const onDragEnd = React.useCallback(
    (sourceIndex, destinationIndex) => {
      const _items = [...items];
      const removedItem = _items.splice(sourceIndex, 1)[0];
      _items.splice(destinationIndex, 0, removedItem);
      setItems(_items);
    },
    [items]
  );

  return (
    <ReactGeereed
      columns={columns}
      items={items}
      actions={actions}
      onDragEnd={onDragEnd}
    />
  );
}
