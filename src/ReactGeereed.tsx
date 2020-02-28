import React from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided
} from 'react-beautiful-dnd';

import { IReactGeereedProps, IGeereedColumn, IGeereedItem } from './typings';
import { useGeereedSort } from './hooks/use-geereed-sort';
import { useGeereedItems } from './hooks/use-geereed-items';
import { useGeereedSearch } from './hooks/use-geereed-search';
import GeereedHeaderCell from './components/GeereedHeaderCell';
import { useGeereedFilter } from './hooks/use-geereed-filter';
import { useGeereedSelect } from './hooks/use-geereed-select';
import useGeereedDnd from './hooks/use-geereed-dnd';

const noop = () => {};

function ReactGeereed(props: IReactGeereedProps) {
  const { columns, items, actions, onDragEnd } = props;
  const [sortKey, sortType, onSortCallback] = useGeereedSort();
  const [searchTerm, setSearchTerm] = useGeereedSearch();
  const [columnFilters, dispatchColumnFilters] = useGeereedFilter();
  const [selectedRows, selectRow] = useGeereedSelect();
  const disableDnd = useGeereedDnd(sortKey, searchTerm, columnFilters);
  const _items = useGeereedItems(items, {
    sortKey,
    sortType,
    searchTerm,
    columnFilters
  });

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
              <GeereedHeaderCell
                key={column.key}
                sortKey={sortKey}
                sortType={sortType}
                column={column}
                onSortCallback={onSortCallback}
                columnFilter={columnFilters[column.key || '']}
                dispatchColumnFilters={dispatchColumnFilters}
              ></GeereedHeaderCell>
            ))}
          </tr>
        </thead>
        <DragDropContext
          onDragEnd={dragInfo => {
            if (dragInfo.destination) {
              const callback = onDragEnd || noop;
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
                            onChange={noop}
                            onClick={() => selectRow(item)}
                          />
                        </td>
                        {actions ? (
                          <td>
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <div
                                {...draggableProvided.dragHandleProps}
                                style={{
                                  width: 20,
                                  height: 20,
                                  backgroundColor: 'red',
                                  marginRight: 5
                                }}
                              ></div>
                              {actions(item, index)}
                            </div>
                          </td>
                        ) : (
                          <></>
                        )}
                        {columns.map((column: IGeereedColumn) => (
                          <td key={column.key}>{item[column.key]}</td>
                        ))}
                      </tr>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
    </>
  );
}

export default ReactGeereed;

/**
 * TODO:
 *    - inline editor
 *    - other filter components (boolean siwtch, combobox, etc...)
 */
