import {StyleSheet, View, Text, RefreshControl, ScrollView} from 'react-native';
import React from 'react';
import SubHeader from '../components/SubHeader';
import Stories from '../components/Stories';
import {Colors} from '../utils/Colors';
import Post from '../components/posts/Post';

// import {ScrollView} from 'react-native-gesture-handler';

import {getListPost} from '../api/modules/post';
import {useSelector} from 'react-redux';
import {
  AsyncStorageKey,
  getAsyncData,
  storeAsyncData,
  storeStringAsyncData,
} from '../utils/authenticate/LocalStorage';
import AlertMessage from '../components/base/AlertMessage';
import {useScrollHanler} from '../hooks/useScrollHandler';
import {INVALID_TOKEN} from '../utils/constants';
import {store} from '../state-management/redux/store';
import {postInfoActions} from '../state-management/redux/slices/HomeListPost';
const HomeScreen = () => {
  const [isLoading, setLoading] = React.useState(false);
  const userLogged = useSelector(state => state.userInfo.user);

  const listPosts = useSelector(state => state.postInfo.posts);
  const params = useSelector(state => state.postInfo.paramsConfig);
  const {handleScroll, refreshing, setRefreshing} = useScrollHanler(
    reload,
    loadMore,
  );
  const getListPostsApi = async () => {
    if (refreshing || isLoading) return;
    try {
      setLoading(true);

      const {data} = await getListPost({...params, user_id: userLogged.id});

      if (JSON.parse(data.data.last_id)) {
        store.dispatch(postInfoActions.setLastId(data.data.last_id));
      }

      if (params.index === '0') {
        store.dispatch(postInfoActions.setPosts(data.data.post));
      } else if (data.data.post.length > 0) {
        store.dispatch(postInfoActions.addPosts(data.data.post));
      }
    } catch (error) {
      if (error.code == INVALID_TOKEN.toString()) {
        AlertMessage('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.');
      } else {
        // AlertMessage('Vui lòng kiểm tra lại mạng.');
      }
      console.log('load data error', error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const reload = async () => {
    if (refreshing) return;

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
    if (isLoading) return;
    store.dispatch(
      postInfoActions.setParams({
        ...params,
        index: (Number(params.index) + 1).toString(),
        last_id: store.getState().postInfo.lastId,
      }),
    );
  };

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
      {isLoading && (
        <View
          style={{
            heigh: 20,
            width: '100%',
            backgroundColor: Colors.background,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Loading...</Text>
        </View>
      )}
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
