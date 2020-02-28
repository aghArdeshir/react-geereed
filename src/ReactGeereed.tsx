import React, { Ref } from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided
} from 'react-beautiful-dnd';

import {
  IReactGeereedProps,
  IGeereedColumn,
  IGeereedItem,
  IGeereedRef
} from './typings';
import { useGeereedSort, SORT_TYPES } from './hooks/use-geereed-sort';
import { useGeereedItems } from './hooks/use-geereed-items';
import { useGeereedSearch } from './hooks/use-geereed-search';
import { useGeereedFilter } from './hooks/use-geereed-filter';
import { useGeereedSelect } from './hooks/use-geereed-select';
import useGeereedDnd from './hooks/use-geereed-dnd';
import { useGeereedEditor } from './hooks/use-geereed-editor';

const noop = () => {};
const jsxNoop = () => <></>;

function ReactGeereed(props: IReactGeereedProps, ref: Ref<any>) {
  const {
    columns,
    items,
    actions,
    onDragEnd = noop,
    editActions = jsxNoop
  } = props;
  const [sortKey, sortType, onSortCallback] = useGeereedSort();
  const [searchTerm, setSearchTerm] = useGeereedSearch();
  const [columnFilters, dispatchColumnFilters] = useGeereedFilter();
  const [selectedRows, selectRow] = useGeereedSelect();
  const [editingIndex, setEditingIndex] = useGeereedEditor();
  const disableDnd = useGeereedDnd(
    sortKey,
    searchTerm,
    columnFilters,
    editingIndex
  );

  const _items = useGeereedItems(items, {
    sortKey,
    sortType,
    searchTerm,
    columnFilters
  });

  const addNew = React.useCallback(() => {
    setEditingIndex(-1);
  }, [setEditingIndex]);
  const cancelAdd = React.useCallback(() => {
    setEditingIndex(null);
  }, [setEditingIndex]);
  const setEdit = React.useCallback(
    (itemIndex: number) => {
      setEditingIndex(itemIndex);
    },
    [setEditingIndex]
  );
  const cancelEdit = React.useCallback(() => {
    setEditingIndex(null);
  }, [setEditingIndex]);
  React.useImperativeHandle(
    ref,
    (): IGeereedRef => ({
      addNew,
      cancelAdd,
      setEdit,
      cancelEdit
    })
  );

  return (
    <>
      <input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search..."
        autoFocus
      />
      <table className="react-geereed">
        <thead>
          <tr>
            <th></th>
            {/* above line is for checkbox */}
            {actions ? <th>Actions</th> : <></>}
            {columns.map((column: IGeereedColumn) => (
              <th
                style={{ color: sortKey === column.key ? 'red' : '' }}
                key={column.key}
              >
                <div style={{ display: 'flex' }}>
                  <span onClick={() => onSortCallback(column.key)}>
                    {column.title || column.key}
                    <span style={{ marginLeft: 10, minWidth: 25 }}>
                      {sortKey === column.key && sortType === SORT_TYPES.ASC ? (
                        <>&#9196;</>
                      ) : (
                        <></>
                      )}
                      {sortKey === column.key && sortType === SORT_TYPES.DES ? (
                        <>&#9195;</>
                      ) : (
                        <></>
                      )}
                    </span>
                  </span>
                  <input
                    value={columnFilters[column.key || ''] || ''}
                    onChange={e =>
                      dispatchColumnFilters({
                        value: e.target.value,
                        columnKey: column.key
                      })
                    }
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <DragDropContext
          onDragEnd={dragInfo => {
            if (dragInfo.destination) {
              const callback = onDragEnd;
              callback(dragInfo.source.index, dragInfo.destination?.index);
            }
          }}
        >
          <Droppable droppableId="geereed-body">
            {(droppableProvided: DroppableProvided) => (
              <tbody
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {_items.map((item: IGeereedItem, index: number) => (
                  <Draggable
                    /** TOOD: do something with key */ key={index}
                    draggableId={`geereed-row-${index}`}
                    index={index}
                    isDragDisabled={disableDnd}
                  >
                    {(draggableProvided: DraggableProvided) => (
                      <tr
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                      >
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.indexOf(item) > -1}
                            // `noop` below, because React nags about uncontrolled & controlled stuff ...
                            onChange={noop}
                            onClick={() => selectRow(item)}
                          />
                        </td>
                        {actions ? (
                          <td>
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              {disableDnd ? (
                                <></>
                              ) : (
                                <div
                                  {...draggableProvided.dragHandleProps}
                                  style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: 'red',
                                    marginRight: 5
                                  }}
                                />
                              )}
                              {editingIndex === index
                                ? editActions(item, index)
                                : actions(item, index)}
                            </div>
                          </td>
                        ) : (
                          <></>
                        )}
                        {columns.map((column: IGeereedColumn) => (
                          <td key={column.key}>
                            {editingIndex === index && column.editor
                              ? column.editor()
                              : item[column.key]}
                          </td>
                        ))}
                      </tr>
                    )}
                  </Draggable>
                ))}
                {editingIndex === -1 ? (
                  <tr>
                    <td></td>
                    <td>
                      <div style={{ display: 'flex' }}>{editActions()}</div>
                    </td>
                    {columns.map((column: IGeereedColumn) => (
                      <td key={column.key}>
                        {(column.editor || noop)() || <></>}
                      </td>
                    ))}
                  </tr>
                ) : (
                  <></>
                )}
                {droppableProvided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
    </>
  );
}

export default React.forwardRef(ReactGeereed);

/**
 * TODO:
 *    - other filter components (boolean siwtch, combobox, etc...)
 */
