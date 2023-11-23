import {StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import SubHeader from '../components/SubHeader';
import Stories from '../components/Stories';
import {Colors} from '../utils/Colors';
import Post from '../components/posts/Post';
import Header from '../components/Header';
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

const HomeScreen = () => {
  const [listPost, setListPost] = React.useState([]);
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
    params.user_id = userLogged.id;
    try {
      const {data} = await getListPost();
      setParams(prev => ({
        ...prev,
        last_id: data.data.last_id,
      }));
      storeStringAsyncData(
        AsyncStorageKey.HOMME_DATA_LASTID,
        data.data.last_id,
      );
      if (params.index != '0') {
        setListPost(prev => [...prev, ...data.data.post]);
      } else {
        setListPost(data.data.post);
      }
      storeAsyncData(AsyncStorageKey.HOME_DATA, listPost);
    } catch (error) {
      AlertMessage('Có lỗi xảy ra, vui lòng kiểm tra mạng.');
    }
  };

  const reload = () => {
    setParams({
      user_id: '',
      in_campaign: '1',
      campaign_id: '1',
      latitude: '1.0',
      longitude: '1.0',
      last_id: '1',
      index: '0',
      count: '20',
    });
    getListPostsApi();
  };

  const loadMore = () => {
    setParams(prev => ({
      ...prev,
      index: (Number(prev.index) + 1).toString(),
    }));
    getListPostsApi();
  };

  React.useEffect(() => {
    const getDataFromLocal = async () => {
      const dataFromLocal = await getAsyncData(AsyncStorageKey.HOME_DATA);

      if (dataFromLocal) {
        setListPost(dataFromLocal);
      }
      getListPostsApi();
    };
    getDataFromLocal();
  }, []);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.homeContainer}>
      <SubHeader />
      <Stories />
      <Post listPost={listPost} />
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
