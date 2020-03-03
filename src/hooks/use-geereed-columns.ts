import { IGeereedColumn, IUseGeereedColumns } from '../typings';
import { useReducer, useCallback } from 'react';

export function useGeereedColumns(
  columns: IGeereedColumn[],
  groupBy?: string
): IUseGeereedColumns {
  let _columns = [...columns];
  if (groupBy) {
    _columns = _columns.filter(column => column.key !== groupBy);
  }
  const groupByStateReucer = useCallback((currentState, groupName) => {
    return { ...currentState, [groupName]: !currentState[groupName] };
  }, []);
  const [groupByStateHolder, dispatchGroupByStateHolder] = useReducer(
    groupByStateReucer,
    {}
  );
  return [
    _columns,
    columns.find(column => column.key === groupBy),
    groupByStateHolder,
    dispatchGroupByStateHolder,
  ];
}
