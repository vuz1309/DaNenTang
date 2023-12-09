import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useRef} from 'react';
import {Colors} from '../utils/Colors';
import {useScrollHanler} from '../hooks/useScrollHandler';
import {getListVideos} from '../api/modules/post.request';
import {useSelector} from 'react-redux';
import PostVideo from '../components/posts/PostVideo';
import PostHeader from '../components/posts/PostHeader';
import PostFooter from '../components/posts/PostFooter';
import {store} from '../state-management/redux/store';
import {notificationInfoActions} from '../state-management/redux/slices/NotificationsSlice';
import {TabName} from '../data/TabData';
import HeaderTitle from '../components/layouts/HeaderTitle';
import Loading from '../components/base/Loading';

const WatchScreen = () => {
  const [params, setParams] = React.useState({
    in_campaign: '1',
    campaign_id: '1',
    latitude: '1.0',
    longitude: '1.0',
    index: '0',
    count: '10',
  });
  const [posts, setPosts] = React.useState([]);
  const [lastId, setLastId] = React.useState('19999');
  const reload = () => {
    if (refreshing) return;
    setRefreshing(true);
    setParams({
      in_campaign: '1',
      campaign_id: '1',
      latitude: '1.0',
      longitude: '1.0',
      last_id: '9999',
      index: '0',
      count: '10',
    });
    setLastId('9999');
  };
  const loadMore = () => {
    if (isLoadMore) return;
    setIsLoadMore(true);
    setParams(prev => ({
      ...prev,
      index: (Number(prev.index) + 1).toString(),
    }));
  };

  const getListVideosApi = async () => {
    if (isLoadMore || refreshing) return;
    try {
      console.log('params videos: ', params, lastId);
      const {data} = await getListVideos({
        ...params,
        // user_id: userLogged.id,
        last_id: lastId,
      });
      console.log('video res:', data);
      store.dispatch(
        notificationInfoActions.setNotification({
          name: TabName.WATCH,
          number: Number(data.data.new_items),
        }),
      );

      if (data.data.last_id != 'undefined') {
        setLastId(data.data.last_id);
      }
      if (params.index == '0') setPosts(data.data.post);
      else {
        const newItems = data.data.post.filter(
          p => !posts.find(op => op.id === p.id),
        );
        setPosts(prev => [...prev, ...newItems]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadMore(false);
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    getListVideosApi();
  }, [params]);
  const {refreshing, setRefreshing, isLoadMore, setIsLoadMore} =
    useScrollHanler(reload, loadMore);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={posts}
        ListHeaderComponent={<HeaderTitle title={'Video'} />}
        ListFooterComponent={() => isLoadMore && <Loading />}
        renderItem={({item}) => (
          <View style={{backgroundColor: Colors.white, marginBottom: 12}}>
            <PostHeader data={item} isShowRemove={false} />
            <PostVideo videoUrl={item.video.url} />
            <PostFooter data={item} />
          </View>
        )}
        keyExtractor={item => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[Colors.primaryColor]}
            refreshing={refreshing}
            onRefresh={reload}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
      />
    </View>
  );
};

export default WatchScreen;
