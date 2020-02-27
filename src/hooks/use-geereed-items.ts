import { IGeereedItem, IUseGeereedItemsOptions } from "../typings";
import { SORT_TYPES } from "./use-geereed-sort";

export function useGeereedItems(items: IGeereedItem[], options: IUseGeereedItemsOptions = {}) {
    const { sortKey, sortType, searchTerm } = options
    let result = [...items];

    if (searchTerm) {
        result = result.filter(item => {
            return Object.keys(item).some(key => {
                return item[key].toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            })
        })
    }

    if (sortKey) {
        result.sort((item1: IGeereedItem, item2: IGeereedItem) => {
            if (sortType === SORT_TYPES.DES) {
                return (item1[sortKey] > item2[sortKey]) ? -1 : 1;
            } else if (sortType === SORT_TYPES.ASC) {
                return (item1[sortKey] < item2[sortKey]) ? -1 : 1;
            }
            return 0;
        });
    }

    return result;
}