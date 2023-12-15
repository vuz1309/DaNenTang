import {
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  Modal,
  FlatList,
  Image,
  Text,
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
import LoadingPosting from '../components/posts/LoadingPosting';
import {hasGms} from 'react-native-device-info';
import DetailsPost from '../components/posts/DetailsPost';
import PostListImage from '../components/posts/PostListImage';
import DialogConfirm from '../components/base/dialog/DialogConfirm';

const HomeScreen = () => {
  const userLogged = useSelector(state => state.userInfo.user);
  const [detailsPostMode, setDetailsPostMode] = useState(0);
  const [isBuyCoin, setIsBuyCoin] = useState(false);
  const [isShowDialogCoins, setIsShowDialogCoins] = React.useState(false);

  const [postEdited, setPostEdited] = useState({});
  const toggleBuyCoinModal = () => {
    setIsBuyCoin(!isBuyCoin);
  };
  const openPostModal = (
    postMode = Enum.PostMode.Create,
    post = {image: [], status: 'OK', described: '', id: '0'},
  ) => {
    if (Number(userLogged.coins) < 50) {
      setIsShowDialogCoins(true);
      return;
    }
    setDetailsPostMode(postMode);

    const postTmp = {
      image: post.image.map(item => ({id: item.id, uri: item.url})),
      status: post.state,
      described: post.described,
      id: post.id,
    };

    setPostEdited(postTmp);
  };
  const closePostModal = () => {
    setDetailsPostMode(0);
  };
  const listPosts = useSelector(state => state.postInfo.posts);
  const isPosting = useSelector(state => state.postInfo.isPosting);
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
  const {isLoadMore, setIsLoadMore, handleScroll, refreshing, setRefreshing} =
    useScrollHanler(reload, loadMore);
  React.useEffect(() => {
    getListPostsApi();
  }, [params]);
  const [isModalVisible, setModalVisible] = useState({index: 0, item: {}});

  const postRenderItem = React.useCallback(
    ({item}) => (
      <PostBody
        setModalVisible={setModalVisible}
        editPost={openPostModal}
        item={item}
        setIsShowDialogCoins={setIsShowDialogCoins}
      />
    ),
    [],
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={listPosts}
        onScroll={handleScroll}
        ListHeaderComponent={
          <>
            <SubHeader onClick={openPostModal} buyCoin={toggleBuyCoinModal} />
            <Stories />
            <LoadingPosting isLoading={isPosting} />
          </>
        }
        ListFooterComponent={() => isLoadMore && <Loading />}
        // renderItem={({item}) => (
        //   <PostBody
        //     setModalVisible={setModalVisible}
        //     editPost={openPostModal}
        //     item={item}
        //     setIsShowDialogCoins={setIsShowDialogCoins}
        //   />
        // )}
        renderItem={postRenderItem}
        keyExtractor={item => JSON.stringify(item).replace('_', '')}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[Colors.primaryColor]}
            refreshing={refreshing}
            onRefresh={reload}
          />
        }
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
      {!!isModalVisible.index && isModalVisible.item.image.length == 1 && (
        <DetailsPost
          isModalVisible={isModalVisible.index}
          item={isModalVisible.item}
          onClose={() => setModalVisible({})}
        />
      )}

      {!!isModalVisible.index && isModalVisible.item.image.length > 1 && (
        <PostListImage
          data={isModalVisible.item}
          onClose={() => setModalVisible({})}
          index={isModalVisible.index - 1}
        />
      )}
      <DialogConfirm
        isVisible={isShowDialogCoins}
        closeBtn={{text: 'Không', onPress: () => setIsShowDialogCoins(false)}}
        title={'Thiếu coins'}
        content={
          'Cần ít nhất 50 coins để tiếp tục, bạn có muốn mua thêm coins?'
        }
        mainBtn={{
          text: 'Mua',
          onPress: () => {
            setIsShowDialogCoins(false);
            toggleBuyCoinModal();
          },
        }}
      />
    </View>
  );
};

export default HomeScreen;
