import { useReducer } from 'react';
import { IGeereedFilterState, IGeereedFilterAction } from '../typings';

export function useGeereedFilter() {
  const reducer = (
    state: IGeereedFilterState,
    action: IGeereedFilterAction
  ) => {
    const stateValue = (state[action.columnKey] || {}).value;
    if (action.value !== (stateValue === undefined ? '' : stateValue)) {
      if (action.value !== '') {
        return {
          ...state,
          [action.columnKey]: {
            value: action.value,
            exact: action.exact,
          },
        };
      } else {
        const result = { ...state };
        delete result[action.columnKey];
        return result;
      }
    }
    return state;
  };
  return useReducer(reducer, {});
}
