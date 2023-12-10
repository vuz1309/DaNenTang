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
import {useLoadOnScroll} from '../hooks/useLoadOnScroll';

const VideoItem = React.memo(({item}) => (
  <View style={{backgroundColor: Colors.white, marginBottom: 12}}>
    <PostHeader data={item} isShowRemove={false} />
    <PostVideo videoUrl={item.video.url} />
    <PostFooter data={item} />
  </View>
));

const WatchScreen = () => {
  const [posts, setPosts] = React.useState([]);
  const [lastId, setLastId] = React.useState('19999');

  const {params, refreshing, reload, isLoadMore, handleScroll, getNewItems} =
    useLoadOnScroll(getListVideosApi);

  const onReload = () => {
    setLastId('99999');
    reload();
  };
  async function getListVideosApi() {
    try {
      const {data} = await getListVideos({
        ...params,
        // user_id: userLogged.id,
        in_campaign: '1',
        campaign_id: '1',
        latitude: '1.0',
        longitude: '1.0',
        last_id: lastId,
      });

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
        const newItems = getNewItems(data.data.posts, posts);
        setPosts(prev => [...prev, ...newItems]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={posts}
        onScroll={handleScroll}
        ListHeaderComponent={<HeaderTitle title={'Video'} />}
        ListFooterComponent={() => isLoadMore && <Loading />}
        renderItem={({item}) => <VideoItem item={item} />}
        keyExtractor={item => item.id}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[Colors.primaryColor]}
            refreshing={refreshing}
            onRefresh={onReload}
          />
        }
        // onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
      />
    </View>
  );
};

export default WatchScreen;
