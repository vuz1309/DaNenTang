import {StyleSheet, View, RefreshControl, ScrollView} from 'react-native';
import React from 'react';
import SubHeader from '../components/SubHeader';
import Stories from '../components/Stories';
import {Colors} from '../utils/Colors';
import Post from '../components/posts/Post';

// import {ScrollView} from 'react-native-gesture-handler';

import {getListPost} from '../api/modules/post';
import {useSelector} from 'react-redux';
import {useScrollHanler} from '../hooks/useScrollHandler';
import {store} from '../state-management/redux/store';
import {postInfoActions} from '../state-management/redux/slices/HomeListPost';
import Loading from '../components/base/Loading';
import {notificationInfoActions} from '../state-management/redux/slices/NotificationsSlice';
import {TabName} from '../data/TabData';
const HomeScreen = () => {
  const userLogged = useSelector(state => state.userInfo.user);

  const listPosts = useSelector(state => state.postInfo.posts);
  const params = useSelector(state => state.postInfo.paramsConfig);

  const getListPostsApi = async () => {
    try {
      const {data} = await getListPost({...params, user_id: userLogged.id});
      console.log(data);
      if (data.data.last_id != 'undefined') {
        store.dispatch(postInfoActions.setLastId(data.data.last_id));
      }

      store.dispatch(
        notificationInfoActions.setNotification({
          name: TabName.HOME,
          number: Number(data.data.new_items),
        }),
      );
      if (params.index === '0') {
        store.dispatch(postInfoActions.setPosts(data.data.post));
      } else if (data.data.post.length > 0) {
        store.dispatch(postInfoActions.addPosts(data.data.post));
      }
    } catch (error) {
      console.log('load data error', error);
    } finally {
      setRefreshing(false);
      setIsLoadMore(false);
    }
  };

  const reload = async () => {
    if (refreshing) return;
    setRefreshing(true);
    store.dispatch(
      postInfoActions.setParams({
        user_id: '',
        in_campaign: '1',
        campaign_id: '1',
        latitude: '1.0',
        longitude: '1.0',
        last_id: '1',
        index: '0',
        count: '20',
      }),
    );

    store.dispatch(postInfoActions.setLastId('1'));
  };

  const loadMore = async () => {
    if (isLoadMore) return;
    setIsLoadMore(true);
    store.dispatch(
      postInfoActions.setParams({
        ...params,
        index: (Number(params.index) + 1).toString(),
        last_id: store.getState().postInfo.lastId,
      }),
    );
  };
  const {handleScroll, isLoadMore, setIsLoadMore, refreshing, setRefreshing} =
    useScrollHanler(reload, loadMore);
  React.useEffect(() => {
    getListPostsApi();
  }, [params]);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.homeContainer}
      onScroll={handleScroll}
      refreshControl={
        <RefreshControl
          colors={[Colors.primaryColor]}
          refreshing={refreshing}
          onRefresh={reload}
        />
      }>
      <SubHeader />
      <Stories />
      <Post listPost={listPosts} />
      {isLoadMore && <Loading />}
      <View
        style={{
          height: 10,
          backgroundColor: Colors.background,
          width: '100%',
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});

export default HomeScreen;
