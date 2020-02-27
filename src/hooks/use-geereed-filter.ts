import { useReducer } from 'react';
import { IGeereedFilterState, IGeereedFilterAction } from '../typings';

export function useGeereedFilter() {
  const reducer = (
    state: IGeereedFilterState,
    action: IGeereedFilterAction
  ) => {
    return { ...state, [action.columnKey]: action.value };
  };
  return useReducer(reducer, {});
}
