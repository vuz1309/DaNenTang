import {View, RefreshControl, FlatList, Pressable} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';
import {getListVideos} from '../api/modules/post.request';
import PostHeader from '../components/posts/PostHeader';
import PostFooter from '../components/posts/PostFooter';
import {store} from '../state-management/redux/store';
import {notificationInfoActions} from '../state-management/redux/slices/NotificationsSlice';
import {TabName} from '../data/TabData';
import HeaderTitle from '../components/layouts/HeaderTitle';
import Loading from '../components/base/Loading';
import {useLoadOnScroll} from '../hooks/useLoadOnScroll';
import VideoThumnails from '../components/posts/VideoThumnails';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../navigation/config/routes';

const VideoItem = React.memo(
  ({item}) => {
    const {navigate} = useNavigation();
    const handlePress = () => {
      navigate(APP_ROUTE.WATCH_NIGHT, {post: item});
    };
    return (
      <View style={{backgroundColor: Colors.white, marginBottom: 8}}>
        <PostHeader data={item} isShowRemove={false} />

        <Pressable onPress={handlePress}>
          <VideoThumnails uri={item.video.url} />
        </Pressable>
        <PostFooter data={item} />
      </View>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.item.video.url === nextProps.item.video.url;
  },
);

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
        const newItems = getNewItems(data.data.post, posts);
        setPosts(prev => [...prev, ...newItems]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.lightgrey}}>
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
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
      />
    </View>
  );
};

export default WatchScreen;
