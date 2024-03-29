import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {Themes} from '../../assets/themes';
import {FacebookRootState, store} from '../../state-management/redux/store';

import AddFriendRequest from '../../components/friends/AddFriendRequest';
import {useSelector} from 'react-redux';
import {APP_ROUTE} from '../../navigation/config/routes';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  getRequestFriends,
  setAcceptFriend,
} from '../../api/modules/friends.request';
import AlertMessage from '../../components/base/AlertMessage';
import {useScrollHanler} from '../../hooks/useScrollHandler';
import {notificationInfoActions} from '../../state-management/redux/slices/NotificationsSlice';
import {TabName} from '../../data/TabData';
import HeaderTitle from '../../components/layouts/HeaderTitle';
import Loading from '../../components/base/Loading';
import {useLoadOnScroll} from '../../hooks/useLoadOnScroll';

const FriendScreen = () => {
  const navigation = useNavigation();

  const userLogged = useSelector(
    /**
     *
     * @param {FacebookRootState} state
     * @returns
     */
    state => state.userInfo.user,
  );

  const [requestFriends, setRequestFriends] = React.useState([]);
  const [total, setTotal] = React.useState('0');

  const setAcceptFriendApi = async (user_id, is_accept = '1') => {
    try {
      setAcceptFriend({user_id, is_accept});
    } catch (error) {
      console.log(error);
    }
  };
  const {getNewItems, handleScroll, isLoadMore, refreshing, reload, params} =
    useLoadOnScroll(getRequestedFriendsApi);

  async function getRequestedFriendsApi() {
    try {
      const {data} = await getRequestFriends(params);
      // console.log('request:', data.data);
      if (params.index == '0') setRequestFriends(data.data.requests);
      else {
        const newItems = getNewItems(data.data, requestFriends);
        setRequestFriends(prev => [...prev, ...newItems]);
      }
      setTotal(data.data.total);
      // store.dispatch(
      //   notificationInfoActions.setNotification({
      //     name: TabName.FRIENDS,
      //     number: Number(data.data.total),
      //   }),
      // );
    } catch (error) {
      console.log(error);
      //   ToastAndroid.show(
      //     'Có lỗi xảy ra, vui lòng liên hệ ANTI-TEAMS để được hỗ trợ.',
      //     ToastAndroid.SHORT,
      //   );
    }
  }

  return (
    <ScrollView
      onScroll={handleScroll}
      style={styles.container}
      refreshControl={
        <RefreshControl
          colors={[Colors.primaryColor]}
          refreshing={refreshing}
          onRefresh={reload}
        />
      }>
      <HeaderTitle title={'Bạn bè'} />
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => navigation.navigate(APP_ROUTE.FRIEND_SUGGESTION)}
          style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Gợi ý</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(APP_ROUTE.FRIEND_ALL, {user: userLogged})
          }
          style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Bạn bè</Text>
        </TouchableOpacity>
      </View>

      {total != 0 && (
        <>
          <View style={styles.requestTitle}>
            <Text style={styles.requestText}>
              Lời mời kết bạn <Text style={styles.numOfRequests}>{total}</Text>
            </Text>
          </View>
          <View style={{paddingBottom: 12}}>
            {requestFriends.map(fr => (
              <AddFriendRequest
                data={fr}
                key={fr.id}
                onClickMain={() => setAcceptFriendApi(fr.id)}
                onClickSub={() => {
                  setAcceptFriendApi(fr.id, '0');
                }}
                isShowTime={true}
                textOnReject="Đã gỡ lời mời"
                textOnAccept="Các bạn đã là bạn bè"
              />
            ))}
          </View>
        </>
      )}
      {isLoadMore && <Loading />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    padding: 12,
  },
  title: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: '700',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 12,
    borderBottomWidth: 1,
    paddingBottom: 12,
    borderBottomColor: Colors.borderGrey,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  buttonWrapper: {
    backgroundColor: Colors.lightgrey,
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 12,
  },
  requestTitle: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  requestText: {
    fontWeight: '500',
    color: Colors.black,
    fontSize: 20,
  },
  numOfRequests: {
    color: Themes.COLORS.red,
  },
  viewAllBtn: {
    fontSize: 16,
    color: Colors.primaryColor,
    fontWeight: '500',
  },
  requestItemWrapper: {
    flexDirection: 'row',
    gap: 12,
  },
  avatar: {
    height: 100,
    width: 100,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  commonUserAvatar: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
  },
  commonUserAvatarImg: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  buttonCtl: {
    padding: 8,
    borderRadius: 8,
    width: '40%',
  },
  acceptText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  removeText: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  time: {
    position: 'absolute',
    right: 0,
    top: 4,
  },
  numOfCommonUser: {
    marginLeft: 8,
    color: Colors.grey,
  },
});

export default FriendScreen;
