import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../utils/Colors';
import Notification from '../components/noti/Notification';
import NotificationAddition from '../components/noti/NotificationAddition';
import HeaderTitle from '../components/layouts/HeaderTitle';
import {getNotifications} from '../api/modules/notification.request';
import {useLoadOnScroll} from '../hooks/useLoadOnScroll';
import {store} from '../state-management/redux/store';
import {notificationInfoActions} from '../state-management/redux/slices/NotificationsSlice';
import {TabName} from '../data/TabData';
import Loading from '../components/base/Loading';
const NotificationScreen = () => {
  // const tempNoti = [
  //   {
  //     type: 1,
  //     object_id: 123,
  //     notification_id: 12233,
  //     title: 'Hoang da them mot anh vao trang ca nhan cua anh ay',
  //     created: 12 / 11 / 2023,
  //     avatar: 'asdad',
  //     group: 0,
  //     read: 0,
  //   },
  //   {
  //     type: 2,
  //     object_id: 1222,
  //     notification_id: 66,
  //     title: 'Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay',
  //     created: 11 / 11 / 2023,
  //     avatar: 'as4d',
  //     group: 0,
  //     read: 0,
  //   },
  //   {
  //     type: 3,
  //     object_id: 1243,
  //     notification_id: 41234233,
  //     title: 'Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay',

  //     created: 14 / 11 / 2023,
  //     avatar: 'as4',
  //     group: 0,
  //     read: 0,
  //   },
  //   {
  //     type: 3,
  //     object_id: 1243,
  //     notification_id: 4123233,
  //     title: 'Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay',

  //     created: 14 / 11 / 2023,
  //     avatar: 'as4',
  //     group: 0,
  //     read: 0,
  //   },
  //   {
  //     type: 3,
  //     object_id: 133,
  //     title: 'Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay',
  //     notification_id: 443,
  //     created: 14 / 11 / 2023,
  //     avatar: 'as4',
  //     group: 0,
  //     read: 0,
  //   },
  //   {
  //     type: 3,
  //     object_id: 122243,
  //     notification_id: 23,
  //     created: 14 / 11 / 2023,
  //     title: 'Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay',

  //     avatar: 'as4',
  //     group: 0,
  //     read: 1,
  //   },
  //   {
  //     type: 3,
  //     object_id: 1243,
  //     notification_id: 33,
  //     title: 'Ngo da them mot anh vao trang ca nhan cua anh ay',
  //     created: 14 / 11 / 2023,
  //     avatar: 'as4',
  //     group: 0,
  //     read: 1,
  //   },
  //   {
  //     type: 3,
  //     object_id: 1243,
  //     notification_id: 3,
  //     title: 'Ngo da them mot anh vao trang ca nhan cua anh ay',
  //     created: 14 / 11 / 2023,
  //     avatar: 'as4',
  //     group: 0,
  //     read: 1,
  //   },
  //   {
  //     type: 3,
  //     object_id: 1243,
  //     notification_id: 4,
  //     title: 'Ngo da them mot anh vao trang ca nhan cua anh ay',
  //     created: 14 / 11 / 2023,
  //     avatar: 'as4',
  //     group: 0,
  //     read: 1,
  //   },
  //   {
  //     type: 3,
  //     object_id: 1243,
  //     notification_id: 5,
  //     title: 'Ngo da them mot anh vao trang ca nhan cua anh ay',
  //     created: 14 / 11 / 2023,
  //     avatar: 'as4',
  //     group: 0,
  //     read: 1,
  //   },
  // ];
  const HandleReadNoti = noti => {
    // const tempNoti = notiList.map(item =>
    //   item.object_id == noti.object_id ? {...noti, read: 1} : item,
    // );
    // setNotiList(tempNoti);
  };
  const HandleAdditionalNotification = noti => {
    setCurNoti(noti);
  };
  const HandleDeleteNotification = noti => {
    // const tempNoti = notiList.filter(
    //   item => item.notification_id !== noti.notification_id,
    // );
    // console.log('Delete');
    // console.log({tempNoti});
    // setNotiList(tempNoti);
    // setCurNoti(null);
  };
  const [notiList, setNotiList] = useState([]);
  const [curNoti, setCurNoti] = useState(null);

  const {params, handleScroll, refreshing, isLoadMore, reload, getNewItems} =
    useLoadOnScroll(getNotis);
  async function getNotis() {
    try {
      const {data} = await getNotifications(params);
      console.log('res notis:', data);
      if (params.index == '0') {
        setNotiList(data.data);
      } else {
        const newItems = getNewItems(data.data, curNoti);
        setNotiList([...curNoti, ...newItems]);
      }

      store.dispatch(
        notificationInfoActions.setNotification({
          name: TabName.NOTIFICATION,
          number: data.badge,
        }),
      );
    } catch (error) {
      console.log('get notis error:', error);
    }
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={notiList}
        onScroll={handleScroll}
        ListHeaderComponent={<HeaderTitle title={'Thông báo'} />}
        ListFooterComponent={() => isLoadMore && <Loading />}
        renderItem={({item}) => (
          <Notification
            noti={item}
            HandleOnPress={() => HandleReadNoti(item)}
            HandleAdditionalNotification={() =>
              HandleAdditionalNotification(item)
            }
          />
        )}
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
        // onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
      />
      {curNoti && (
        <NotificationAddition
          CloseAddition={() => {
            setCurNoti(null);
            console.log('Close');
          }}
          DeleteNotification={() => HandleDeleteNotification(curNoti)}
          noti={curNoti}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    paddingVertical: 16,
    paddingHorizontal: 8,
    color: Colors.black,
    fontWeight: '700',
  },
});

export default NotificationScreen;
