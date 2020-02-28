import React from 'react';
import { randomName, randomLastName, getRandom } from './Demo.Service';
import ReactGeereed from '../ReactGeereed';
import { IGeereedRef } from '../typings';

type IStudent = any;

const mockItems: IStudent[] = new Array(10).fill(1).map(() => ({
  Name: randomName(),
  LastName: randomLastName(),
  Age: getRandom(100),
  AverageMarks: getRandom(20)
}));

export default function DemoBasicStudentsList() {
  const [newItemState, dispatchNewItem] = React.useReducer(
    (state: { [key: string]: any }, action: { [key: string]: any } | null) => {
      if (action === null) {
        return {};
      } else {
        return { ...state, ...action };
      }
    },
    {}
  );

  const columns = React.useMemo(
    () => [
      {
        key: 'Name',
        editor: () => (
          <input
            onChange={e => {
              dispatchNewItem({ Name: e.target.value });
            }}
            value={newItemState.Name || ''}
          />
        ) // title will be set equal to key if not provided
      },
      { key: 'LastName', title: 'Last Name' },
      {
        key: 'Age',
        editor: () => (
          <input
            onChange={e => {
              dispatchNewItem({ Age: e.target.value });
            }}
            value={newItemState.Age || ''}
            type="number"
          />
        )
      },
      { key: 'AverageMarks', title: 'Average Marks' }
    ],
    [newItemState.Age, newItemState.Name]
  );

  const [items, setItems] = React.useState(mockItems);
  const gridRef = React.useRef<IGeereedRef>(null);

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

  const editActions = React.useCallback(
    () => (
      <>
        <button
          onClick={() => {
            setItems(_items => _items.concat(newItemState));
            dispatchNewItem(null);
            gridRef.current?.cancelAdd();
          }}
          disabled={!newItemState.Name}
        >
          Add
        </button>
        <button onClick={() => gridRef.current?.cancelAdd()}>Cancel</button>
      </>
    ),
    [newItemState]
  );

  return (
    <>
      <button onClick={() => gridRef?.current?.addNew()}>add new</button>
      <ReactGeereed
        columns={columns}
        items={items}
        actions={actions}
        onDragEnd={onDragEnd}
        ref={gridRef}
        editActions={editActions}
      />
    </>
  );
}
