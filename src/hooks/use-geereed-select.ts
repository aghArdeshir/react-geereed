import { useState, useCallback } from 'react';
import { IUseGeereedSelect } from '../typings';

export function useGeereedSelect(): IUseGeereedSelect {
  const [selectedRows, setSelectedRows] = useState([] as any[]);

  const selectRow = useCallback(
    (rowItem) => {
      if (selectedRows.indexOf(rowItem) === -1) {
        setSelectedRows(selectedRows.concat(rowItem));
      } else {
        const _selectedRowsCopy = [...selectedRows];
        _selectedRowsCopy.splice(selectedRows.indexOf(rowItem), 1);
        setSelectedRows(_selectedRowsCopy);
      }
    },
    [selectedRows]
  );

  return [selectedRows, selectRow];
}
