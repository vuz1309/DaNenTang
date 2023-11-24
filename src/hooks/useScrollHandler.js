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
    console.log(offsetY);
    if (offsetY === 0) {
      // Trigger the reload function
      reload?.();
    }
    if (offsetY + scrollViewHeight >= contentHeight - 20 && !refreshing) {
      // You can adjust the threshold (20 in this case) based on your design
      setRefreshing(true);
      loadMore?.();
    }
  };
  const onRefresh = () => {
    setRefreshing(true);

    setRefreshing(false);
  };
  return {
    handleScroll,
    onRefresh,
    refreshing,
    setRefreshing,
  };
};
