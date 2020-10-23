import { IGeereedItem, IUseGeereedItemsOptions } from '../typings';
import { GEEREED_SORT_TYPES } from '../utils/geereed-provider';

export function useGeereedItems(
  items: IGeereedItem[],
  options: IUseGeereedItemsOptions = {}
) {
  const { sortKey, sortType, searchTerm, columnFilters } = options;
  let result = [...items];

  if (searchTerm) {
    result = result.filter((item) => {
      return Object.keys(item).some((key) => {
        return (
          item[key].toString().toLowerCase().indexOf(searchTerm.toLowerCase()) >
          -1
        );
      });
    });
  }

  Object.keys(columnFilters || {}).forEach((columnKey) => {
    const columnFilterValue = (columnFilters || {})[columnKey];
    if (columnFilterValue) {
      result = result.filter((item) => {
        if (columnFilterValue.value === undefined) return true;
        if (item[columnKey] === columnFilterValue.value) return true;
        else if (!columnFilterValue.exact) {
          return (
            item[columnKey]
              .toString()
              .toLowerCase()
              .indexOf(columnFilterValue.value.toString().toLowerCase()) > -1
          );
        }
        return false;
      });
    }
  });

  if (options.groupBy) {
    result.sort((item1: IGeereedItem, item2: IGeereedItem) => {
      return item1[options.groupBy!] < item2[options.groupBy!] ? -1 : 1;
    });
  }

  if (sortKey) {
    result.sort((item1: IGeereedItem, item2: IGeereedItem) => {
      if (
        options.groupBy &&
        item1[options.groupBy] !== item2[options.groupBy]
      ) {
        return 0;
      }
      if (sortType === GEEREED_SORT_TYPES.DES) {
        return item1[sortKey] > item2[sortKey] ? -1 : 1;
      } else if (sortType === GEEREED_SORT_TYPES.ASC) {
        return item1[sortKey] < item2[sortKey] ? -1 : 1;
      }
      return 0;
    });
  }

  return result;
}
