import {
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import SubHeader from '../components/SubHeader';
import Stories from '../components/Stories';
import {Colors} from '../utils/Colors';

import {getListPost} from '../api/modules/post.request';
import {useSelector} from 'react-redux';

import {useScrollHanler} from '../hooks/useScrollHandler';
import {store} from '../state-management/redux/store';
import {postInfoActions} from '../state-management/redux/slices/HomeListPost';
import Loading from '../components/base/Loading';
import UploadScreen from './UploadScreen';
import AlertMessage from '../components/base/AlertMessage';
import {notificationInfoActions} from '../state-management/redux/slices/NotificationsSlice';
import {TabName} from '../data/TabData';
import BuyCoins from './coins/BuyCoins';
import Enum from '../utils/Enum';
import PostBody from '../components/posts/PostBody';

const HomeScreen = () => {
  // const userLogged = useSelector(state => state.userInfo.user);
  const [detailsPostMode, setDetailsPostMode] = useState(0);
  const [isBuyCoin, setIsBuyCoin] = useState(false);

  const [postEdited, setPostEdited] = useState({});
  const toggleBuyCoinModal = () => {
    console.log('buy coin');
    setIsBuyCoin(!isBuyCoin);
  };
  const openPostModal = (
    postMode = Enum.PostMode.Create,
    post = {image: [], status: 'OK', described: '', id: '0'},
  ) => {
    // console.log('post mode:', postMode);

    setDetailsPostMode(postMode);

    const postTmp = {
      image: post.image.map(item => ({id: item.id, uri: item.url})),
      status: post.status,
      described: post.described,
      id: post.id,
    };

    setPostEdited(postTmp);
  };
  const closePostModal = () => {
    setDetailsPostMode(0);
  };
  const listPosts = useSelector(state => state.postInfo.posts);
  const params = useSelector(state => state.postInfo.paramsConfig);

  const getListPostsApi = async () => {
    try {
      // console.log('home post param:', params);
      const {data} = await getListPost({...params});
      // console.log(data);
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
      // console.log('load data error', error);
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
        in_campaign: '1',
        campaign_id: '1',
        latitude: '1.0',
        longitude: '1.0',

        index: '0',
        count: '20',
        last_id: '99999',
      }),
    );

    store.dispatch(postInfoActions.setLastId('99999'));
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
  const {isLoadMore, setIsLoadMore, refreshing, setRefreshing} =
    useScrollHanler(reload, loadMore);
  React.useEffect(() => {
    getListPostsApi();
  }, [params]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={listPosts}
        ListHeaderComponent={
          <>
            <SubHeader onClick={openPostModal} buyCoin={toggleBuyCoinModal} />
            <Stories />
          </>
        }
        ListFooterComponent={() => isLoadMore && <Loading />}
        renderItem={({item}) => (
          <PostBody editPost={openPostModal} item={item} />
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
      <Modal
        animationType="slide"
        transparent={false}
        onRequestClose={closePostModal}
        visible={!!detailsPostMode}>
        <UploadScreen
          onClose={closePostModal}
          postData={postEdited}
          mode={detailsPostMode}
        />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBuyCoin}
        onRequestClose={toggleBuyCoinModal}>
        <BuyCoins closeModal={toggleBuyCoinModal} />
      </Modal>
    </View>
  );
};

export default HomeScreen;
