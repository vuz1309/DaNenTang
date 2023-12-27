import React from 'react';
import {useScrollHanler} from './useScrollHandler';

export const useLoadOnScroll = (loadFunc, dependencies = []) => {
  const [searchText, setSearchText] = React.useState('');
  const [params, setParams] = React.useState({
    index: '0',
    count: '20',
  });
  const handleSubmitSearch = () => {
    setParams({index: '0', count: '20'});
  };
  const {isLoadMore, refreshing, handleScroll, setIsLoadMore, setRefreshing} =
    useScrollHanler(reload, loadMore);
  function reload() {
    if (refreshing) return;
    setRefreshing(true);
    setParams({
      index: '0',
      count: '20',
    });
  }
  function loadMore() {
    if (isLoadMore) return;
    setIsLoadMore(true);
    setParams({
      index: (Number(params.index) + 1).toString(),
      count: '20',
    });
  }
  /**
   *
   * @param {Array} newItems
   * @param {Array} oldItems
   * @param {string} keyExpr
   * @returns
   */
  const getNewItems = (newItems, oldItems, keyExpr = 'id') => {
    return newItems.filter(
      newItem =>
        !oldItems.some(oldItem => oldItem[keyExpr] === newItem[keyExpr]),
    );
  };

  const excuteLoad = async () => {
    loadFunc && (await loadFunc());
    setRefreshing(false);
    setIsLoadMore(false);
  };
  React.useEffect(() => {
    excuteLoad();
  }, [params, ...dependencies]);

  return {
    params,
    refreshing,
    isLoadMore,
    getNewItems,
    loadMore,
    reload,
    handleScroll,
    setIsLoadMore,
    setRefreshing,
    handleSubmitSearch,
    searchText,
    setSearchText,
    setParams,
  };
};
