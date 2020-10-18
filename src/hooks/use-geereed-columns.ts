import { IGeereedColumn, IUseGeereedColumns } from '../typings';
import { useReducer, useCallback, useMemo } from 'react';

export function useGeereedColumns(
  columns: IGeereedColumn[],
  groupBy?: string
): IUseGeereedColumns {
  let _columns = useMemo(() => {
    let cols = [...columns];
    if (groupBy) {
      cols = cols.filter((column) => column.key !== groupBy);
    }
    return cols;
  }, [columns, groupBy]);

  const groupByStateReucer = useCallback((currentState, groupName) => {
    return { ...currentState, [groupName]: !currentState[groupName] };
  }, []);
  const [groupByStateHolder, dispatchGroupByStateHolder] = useReducer(
    groupByStateReucer,
    {}
  );
  return [
    _columns,
    useMemo(() => columns.find((column) => column.key === groupBy), [
      columns,
      groupBy,
    ]),
    groupByStateHolder,
    dispatchGroupByStateHolder,
  ];
}
