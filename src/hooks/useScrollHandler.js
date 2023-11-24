import React from 'react';
/**
 *
 * @param {Function} reload
 * @param {Function} loadMore
 */
export const useScrollHanler = (reload, loadMore) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

    if (offsetY + scrollViewHeight >= contentHeight - 20 && !refreshing) {
      loadMore?.();
    }
  };
  const onRefresh = () => {
    reload?.();
  };
  return {
    handleScroll,
    onRefresh,
    refreshing,
    setRefreshing,
  };
};
