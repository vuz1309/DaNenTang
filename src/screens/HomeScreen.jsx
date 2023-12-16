import {View, RefreshControl, Modal, FlatList} from 'react-native';
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
import {notificationInfoActions} from '../state-management/redux/slices/NotificationsSlice';
import {TabName} from '../data/TabData';
import BuyCoins from './coins/BuyCoins';
import LoadingPosting from '../components/posts/LoadingPosting';
import DialogConfirm from '../components/base/dialog/DialogConfirm';
import PostHeader from '../components/posts/PostHeader';
import FilePost from '../components/posts/FilePost';
import PostFooter from '../components/posts/PostFooter';
const HomeScreen = () => {
  // const userLogged = useSelector(state => state.userInfo.user);

  const [isBuyCoin, setIsBuyCoin] = useState(false);
  const [isShowDialogCoins, setIsShowDialogCoins] = React.useState(false);

  const toggleBuyCoinModal = () => {
    setIsBuyCoin(!isBuyCoin);
  };

  const listPosts = useSelector(state => state.postInfo.posts);
  const isPosting = useSelector(state => state.postInfo.isPosting);
  const params = useSelector(state => state.postInfo.paramsConfig);

  const getListPostsApi = async () => {
    try {
      console.log('home post param:', params);
      const {data} = await getListPost(params);
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

  const postRenderItem = React.useCallback(
    ({item}) => (
      <View style={{backgroundColor: Colors.white, marginTop: 8}}>
        <PostHeader data={item} setIsShowDialogCoins={setIsShowDialogCoins} />

        <FilePost item={item} />

        <PostFooter data={item} />
      </View>
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
            <SubHeader buyCoin={toggleBuyCoinModal} />
            <Stories />
            <LoadingPosting isLoading={isPosting} />
          </>
        }
        ListFooterComponent={() => isLoadMore && <Loading />}
        renderItem={postRenderItem}
        keyExtractor={item => JSON.stringify(item)}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[Colors.primaryColor]}
            refreshing={refreshing}
            onRefresh={reload}
          />
        }
        initialNumToRender={5}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isBuyCoin}
        onRequestClose={toggleBuyCoinModal}>
        <BuyCoins closeModal={toggleBuyCoinModal} />
      </Modal>

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
