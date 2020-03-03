import React, { Ref } from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided,
} from 'react-beautiful-dnd';

import {
  IReactGeereedProps,
  IGeereedColumn,
  IGeereedItem,
  IGeereedRef,
  IGeereedRenderRowOptions,
} from './typings';
import { useGeereedSort, SORT_TYPES } from './hooks/use-geereed-sort';
import { useGeereedItems } from './hooks/use-geereed-items';
import { useGeereedSearch } from './hooks/use-geereed-search';
import { useGeereedFilter } from './hooks/use-geereed-filter';
import { useGeereedSelect } from './hooks/use-geereed-select';
import { useGeereedDnd } from './hooks/use-geereed-dnd';
import { useGeereedEditor } from './hooks/use-geereed-editor';
import { useGeereedColumns } from './hooks/use-geereed-columns';
import Pagination from './components/Pagination';

const noop = () => {};
const jsxNoop = () => <></>;

function ReactGeereed(props: IReactGeereedProps, ref: Ref<any>) {
  const {
    columns,
    items,
    actions,
    onDragEnd = noop,
    editActions = jsxNoop,
    groupBy,
    pagination,
    onPage,
    onRefresh,
  } = props;

  if ((pagination && !onPage) || (onPage && !pagination)) {
    throw new Error(
      'ReactGeereed: Please provide both `pagination` and `onPage` props'
    );
  }

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
    columnFilters,
    groupBy,
  });
  const [_columns, , expandedState, dispatchExpandedState] = useGeereedColumns(
    columns,
    groupBy
  );

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
      cancelEdit,
    })
  );
  const renderRow = React.useCallback(
    (
      item: IGeereedItem,
      index: number,
      options: IGeereedRenderRowOptions = { display: '' }
    ) => (
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
            style={{ display: options.display }}
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {disableDnd ? (
                    <></>
                  ) : (
                    <div
                      {...draggableProvided.dragHandleProps}
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'red',
                        marginRight: 5,
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
            {_columns.map((column: IGeereedColumn) => (
              <td key={column.key}>
                {editingIndex === index && column.editor
                  ? column.editor()
                  : item[column.key]}
              </td>
            ))}
          </tr>
        )}
      </Draggable>
    ),
    [
      _columns,
      actions,
      disableDnd,
      editActions,
      editingIndex,
      selectRow,
      selectedRows,
    ]
  );
  const actuallyRenderedColumnsCount = React.useMemo(
    () => _columns.length + 1 + (actions ? 1 : 0),
    [_columns.length, actions]
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
            {_columns.map((column: IGeereedColumn) => (
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
                        columnKey: column.key,
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
                {groupBy ? (
                  _items
                    .reduce((acc, cur, idx, src) => {
                      if (idx === 0 || cur[groupBy] !== src[idx - 1][groupBy]) {
                        return acc.concat(cur);
                      }
                      return acc;
                    }, [])
                    .map((groupByParentItem: IGeereedItem, index: number) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td colSpan={actuallyRenderedColumnsCount}>
                            <button
                              onClick={() =>
                                dispatchExpandedState(
                                  groupByParentItem[groupBy]
                                )
                              }
                            >
                              expand/collapse
                            </button>
                            <b style={{ marginLeft: 10 }}>({groupBy}):</b>
                            <span style={{ marginLeft: 10 }}>
                              {groupByParentItem[groupBy]}
                            </span>
                          </td>
                        </tr>
                        {_items
                          .filter(
                            item => item[groupBy] === groupByParentItem[groupBy]
                          )
                          .map((item: IGeereedItem, index: number) =>
                            renderRow(item, index, {
                              display: expandedState[item[groupBy]]
                                ? ''
                                : 'none',
                            })
                          )}
                      </React.Fragment>
                    ))
                ) : (
                  <>
                    {_items.map((item: IGeereedItem, index: number) =>
                      renderRow(item, index)
                    )}
                  </>
                )}
                {editingIndex === -1 ? (
                  <tr>
                    <td></td>
                    <td>
                      <div style={{ display: 'flex' }}>{editActions()}</div>
                    </td>
                    {_columns.map((column: IGeereedColumn) => (
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
        {pagination ? (
          <tfoot>
            <tr>
              <td
                colSpan={actuallyRenderedColumnsCount}
                style={{ textAlign: 'right' }}
              >
                {onRefresh ? (
                  <button onClick={onRefresh}>refresh</button>
                ) : (
                  <></>
                )}
                <Pagination pagination={pagination} onPage={onPage!} />
              </td>
            </tr>
          </tfoot>
        ) : (
          <></>
        )}
      </table>
    </>
  );
}

export default React.forwardRef(ReactGeereed);

/**
 * TODO:
 *    - other filter components (boolean siwtch, combobox, etc...)
 */
