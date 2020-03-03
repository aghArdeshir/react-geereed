import React from 'react';
import {
  randomLastName,
  getRandom,
  randomRepetitiveName,
} from './Demo.Service';
import ReactGeereed from '../ReactGeereed';
import { IGeereedRef } from '../typings';

type IStudent = any;

const regenerateMockItems: () => IStudent[] = () =>
  new Array(10).fill(1).map(() => ({
    Name: randomRepetitiveName(),
    LastName: randomLastName(),
    Age: getRandom(100),
    AverageMarks: getRandom(20),
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
        ), // title will be set equal to key if not provided
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
        ),
      },
      { key: 'AverageMarks', title: 'Average Marks' },
    ],
    [newItemState.Age, newItemState.Name]
  );

  const [items, setItems] = React.useState(regenerateMockItems());
  const [page, setPage] = React.useState(1);

  const reGenerateMockItems = React.useCallback(page => {
    setItems(regenerateMockItems());
    setPage(page);
  }, []);

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
          <button
            onClick={() => {
              gridRef.current?.setEdit(rowIndex);
              dispatchNewItem(rowItem);
            }}
          >
            Edit
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
    (rowItem?: any, rowIndex?: number) => {
      if (rowIndex || rowIndex === 0) {
        return (
          <>
            <button
              onClick={() => {
                const _items = [...items];
                _items.splice(rowIndex, 1, newItemState);
                setItems(_items);
                dispatchNewItem(null);
                gridRef.current?.cancelEdit();
              }}
              disabled={!newItemState.Name}
            >
              Edit
            </button>
            <button onClick={() => gridRef.current?.cancelEdit()}>
              Cancel
            </button>
          </>
        );
      }
      return (
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
      );
    },
    [items, newItemState]
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
        // groupBy={columns[0].key}
        pagination={{ page, totalPages: 10, itemsPerPage: 5 }}
        onPage={reGenerateMockItems}
      />
    </>
  );
}
