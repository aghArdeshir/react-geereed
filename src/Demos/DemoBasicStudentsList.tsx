import React from 'react';
import { mockStudents } from './Demo.Service';
import ReactGeereed from '../ReactGeereed';
import { IGeereedRef, IGeereedColumn } from '../typings';
import { useGeereedFilter } from '../hooks/use-geereed-filter';

type IMockStudent = typeof mockStudents[0];
type IPartialMockStudent = Partial<IMockStudent>;

// const regenerateMockItems: () => IStudent[] = () =>
//   new Array(10).fill(1).map(() => ({
//     Name: randomRepetitiveName(),
//     LastName: randomLastName(),
//     Age: getRandom(100),
//     AverageMarks: getRandom(20),
//   }));

export default function DemoBasicStudentsList() {
  const [newItemState, dispatchNewItem] = React.useReducer(
    (state: IPartialMockStudent, action: IPartialMockStudent | null) => {
      if (action === null) {
        return {};
      } else {
        return { ...state, ...action };
      }
    },
    {}
  );

  const [columnFilters, dispatchColumnFilters] = useGeereedFilter();

  const columns = React.useMemo(
    () =>
      [
        {
          key: 'Name',
          editor: () => (
            <input
              onChange={(e) => {
                dispatchNewItem({ Name: e.target.value });
              }}
              value={newItemState.Name || ''}
            />
          ), // title will be set equal to key if not provided
          filterComponent: () => (
            <input
              value={columnFilters.Name || ''}
              onChange={(e) =>
                dispatchColumnFilters({
                  columnKey: 'Name',
                  value: e.target.value,
                })
              }
            />
          ),
        },
        { key: 'LastName', title: 'Last Name' },
        {
          key: 'Age',
          editor: () => (
            <input
              onChange={(e) => {
                dispatchNewItem({ Age: Number(e.target.value) });
              }}
              value={newItemState.Age || ''}
              type="number"
            />
          ),
          filterComponent: () => (
            <input
              type="number"
              min={0}
              value={columnFilters.Age || ''}
              onChange={(e) =>
                dispatchColumnFilters({
                  columnKey: 'Age',
                  value: e.target.value,
                })
              }
            />
          ),
        },
        { key: 'AverageMarks', title: 'Average Marks' },
      ] as IGeereedColumn[],
    [
      columnFilters.Age,
      columnFilters.Name,
      dispatchColumnFilters,
      newItemState.Age,
      newItemState.Name,
    ]
  );

  const [items, setItems] = React.useState([] as IMockStudent[]);
  // const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setItems(mockStudents);
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

  // const onDragEnd = React.useCallback(
  //   (sourceIndex, destinationIndex) => {
  //     const _items = [...items];
  //     const removedItem = _items.splice(sourceIndex, 1)[0];
  //     _items.splice(destinationIndex, 0, removedItem);
  //     setItems(_items);
  //   },
  //   [items]
  // );

  const editActions = React.useCallback(
    (rowItem?: any, rowIndex?: number) => {
      if (rowIndex || rowIndex === 0) {
        return (
          <>
            <button
              onClick={() => {
                const _items = [...items];
                _items.splice(rowIndex, 1, newItemState as IMockStudent);
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
              setItems((_items) => _items.concat(newItemState as IMockStudent));
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
        // onDragEnd={onDragEnd}
        ref={gridRef}
        editActions={editActions}
        // groupBy={columns[0].key}
        // pagination={{ page, totalPages: 10, itemsPerPage: 5 }}
        // onPage={reGenerateMockItems}
        // onRefresh={() => reGenerateMockItems()}
        columnFilters={columnFilters}
      />
    </>
  );
}
