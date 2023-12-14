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
  const [notiList, setNotiList] = useState([]);
  // const [curNoti, setCurNoti] = useState(null);

  const {params, handleScroll, refreshing, isLoadMore, reload, getNewItems} =
    useLoadOnScroll(getNotis);
  async function getNotis() {
    try {
      const {data} = await getNotifications(params);

      if (params.index == '0') {
        setNotiList(data.data);
      } else {
        const newItems = getNewItems(data.data, notiList);
        setNotiList([...notiList, ...newItems]);
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
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <FlatList
        data={notiList}
        onScroll={handleScroll}
        ListHeaderComponent={<HeaderTitle title={'Thông báo'} />}
        ListFooterComponent={() => isLoadMore && <Loading />}
        renderItem={({item}) => <Notification noti={item} />}
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
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
      />
      {/* {curNoti && (
        <NotificationAddition
          CloseAddition={() => {
            setCurNoti(null);
            console.log('Close');
          }}
          DeleteNotification={() => HandleDeleteNotification(curNoti)}
          noti={curNoti}
        />
      )} */}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: Colors.white,
//   },
//   title: {
//     fontSize: 24,
//     paddingVertical: 16,
//     paddingHorizontal: 8,
//     color: Colors.black,
//     fontWeight: '700',
//   },
// });

export default NotificationScreen;
