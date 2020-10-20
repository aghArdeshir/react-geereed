import React from 'react';
import { IUseGeereedSort } from '../typings.d';
import { GEEREED_SORT_TYPES } from '../utils/geereed-provider';

export function useGeereedSort(defaultSortKey: string): IUseGeereedSort {
  const [sortKey, setSortKey] = React.useState(defaultSortKey);
  const [sortType, setSortType] = React.useState(GEEREED_SORT_TYPES.ASC);

  const onSortCallback = React.useCallback(
    (columnKey: string) => {
      if (sortKey === columnKey) {
        if (sortType === GEEREED_SORT_TYPES.ASC) {
          setSortType(GEEREED_SORT_TYPES.DES);
        } else if (sortType === GEEREED_SORT_TYPES.DES) {
          setSortType(GEEREED_SORT_TYPES.ASC);
          setSortKey('');
        }
      } else {
        setSortType(GEEREED_SORT_TYPES.ASC);
        setSortKey(columnKey);
      }
    },
    [sortKey, sortType]
  );

  return [sortKey, sortType, onSortCallback];
}
