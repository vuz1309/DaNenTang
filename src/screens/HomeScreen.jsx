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

const HomeScreen = () => {
  const [listPost, setListPost] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const userLogged = useSelector(state => state.userInfo.user);
  const [params, setParams] = React.useState({
    user_id: '',
    in_campaign: '1',
    campaign_id: '1',
    latitude: '1.0',
    longitude: '1.0',
    last_id: '1',
    index: '0',
    count: '20',
  });

  const getListPostsApi = async () => {
    if (refreshing || isLoading) return;
    params.user_id = userLogged.id;

    try {
      setLoading(true);

      const {data} = await getListPost(params);

      if (!JSON.parse(data.data.last_id)) {
        console.log('lastid', data.data.last_id);
        storeStringAsyncData(
          AsyncStorageKey.HOMME_DATA_LASTID,
          data.data.last_id,
        );
      }

      if (params.index === '0') setListPost(data.data.post);
      else if (data.data.post.length > 0) {
        const listPosts = [
          ...listPost,
          ...data.data.post.filter(
            post => !listPost.find(p => p.id === post.id),
          ),
        ];
        setListPost(listPosts);
      }

      storeAsyncData(AsyncStorageKey.HOME_DATA, listPost);
    } catch (error) {
      AlertMessage('Có lỗi xảy ra, vui lòng kiểm tra mạng.');
      console.log('load data error', JSON.stringify(error));
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const reload = async () => {
    setParams(_ => ({
      user_id: '',
      in_campaign: '1',
      campaign_id: '1',
      latitude: '1.0',
      longitude: '1.0',
      last_id: '1',
      index: '0',
      count: '20',
    }));

    storeStringAsyncData(AsyncStorageKey.HOMME_DATA_LASTID, '1');
  };

  const loadMore = async () => {
    const lastId =
      (await getAsyncData(AsyncStorageKey.HOMME_DATA_LASTID)) || params.last_id;
    setParams(prev => ({
      ...prev,
      index: (Number(prev.index) + 1).toString(),
      last_id: lastId,
    }));
  };

  React.useEffect(() => {
    const getDataFromLocal = async () => {
      const dataFromLocal = await getAsyncData(AsyncStorageKey.HOME_DATA);

      if (dataFromLocal) {
        setListPost(dataFromLocal);
      }
    };
    getDataFromLocal();
  }, []);
  React.useEffect(() => {
    getListPostsApi();
  }, [params]);

  const {handleScroll, refreshing, setRefreshing} = useScrollHanler(
    reload,
    loadMore,
  );

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
      <Post listPost={listPost} />
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
