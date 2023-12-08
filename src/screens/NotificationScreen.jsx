import {StyleSheet, Text, View, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../utils/Colors';
import Notification from '../components/noti/Notification';
import NotificationAddition from '../components/noti/NotificationAddition';
import {ScrollView} from 'react-native-gesture-handler';
import HeaderTitle from '../components/layouts/HeaderTitle';

const NotificationScreen = () => {
  const tempNoti = [
    {
      type: 1,
      object_id: 123,
      notification_id: 12233,
      title: 'Hoang da them mot anh vao trang ca nhan cua anh ay',
      created: 12 / 11 / 2023,
      avatar: 'asdad',
      group: 0,
      read: 0,
    },
    {
      type: 2,
      object_id: 1222,
      notification_id: 66,
      title: 'Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay',
      created: 11 / 11 / 2023,
      avatar: 'as4d',
      group: 0,
      read: 0,
    },
    {
      type: 3,
      object_id: 1243,
      notification_id: 41234233,
      title: 'Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay',

      created: 14 / 11 / 2023,
      avatar: 'as4',
      group: 0,
      read: 0,
    },
    {
      type: 3,
      object_id: 1243,
      notification_id: 4123233,
      title: 'Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay',

      created: 14 / 11 / 2023,
      avatar: 'as4',
      group: 0,
      read: 0,
    },
    {
      type: 3,
      object_id: 133,
      title: 'Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay',
      notification_id: 443,
      created: 14 / 11 / 2023,
      avatar: 'as4',
      group: 0,
      read: 0,
    },
    {
      type: 3,
      object_id: 122243,
      notification_id: 23,
      created: 14 / 11 / 2023,
      title: 'Ngo Duc Cuong da them mot anh vao trang ca nhan cua anh ay',

      avatar: 'as4',
      group: 0,
      read: 1,
    },
    {
      type: 3,
      object_id: 1243,
      notification_id: 33,
      title: 'Ngo da them mot anh vao trang ca nhan cua anh ay',
      created: 14 / 11 / 2023,
      avatar: 'as4',
      group: 0,
      read: 1,
    },
    {
      type: 3,
      object_id: 1243,
      notification_id: 3,
      title: 'Ngo da them mot anh vao trang ca nhan cua anh ay',
      created: 14 / 11 / 2023,
      avatar: 'as4',
      group: 0,
      read: 1,
    },
    {
      type: 3,
      object_id: 1243,
      notification_id: 4,
      title: 'Ngo da them mot anh vao trang ca nhan cua anh ay',
      created: 14 / 11 / 2023,
      avatar: 'as4',
      group: 0,
      read: 1,
    },
    {
      type: 3,
      object_id: 1243,
      notification_id: 5,
      title: 'Ngo da them mot anh vao trang ca nhan cua anh ay',
      created: 14 / 11 / 2023,
      avatar: 'as4',
      group: 0,
      read: 1,
    },
  ];
  const HandleReadNoti = noti => {
    const tempNoti = notiList.map(item =>
      item.object_id == noti.object_id ? {...noti, read: 1} : item,
    );
    setNotiList(tempNoti);
  };
  const HandleAdditionalNotification = noti => {
    setCurNoti(noti);
    console.log(curNoti);
  };
  const HandleDeleteNotification = noti => {
    console.log(noti.notification_id);
    console.log(notiList);
    const tempNoti = notiList.filter(
      item => item.notification_id !== noti.notification_id,
    );
    console.log('Delete');
    console.log({tempNoti});
    setNotiList(tempNoti);
    setCurNoti(null);
  };
  const [notiList, setNotiList] = useState([...tempNoti]);
  const [curNoti, setCurNoti] = useState(null);

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <HeaderTitle title={'Thông báo'} />
          {notiList.map((item, key) => {
            return (
              <Notification
                key={key}
                index={key}
                noti={item}
                HandleOnPress={() => HandleReadNoti(item)}
                HandleAdditionalNotification={() =>
                  HandleAdditionalNotification(item)
                }
              />
            );
          })}
        </View>
      </ScrollView>
      {curNoti ? (
        <NotificationAddition
          CloseAddition={() => {
            setCurNoti(null);
            console.log('Close');
          }}
          DeleteNotification={() => HandleDeleteNotification(curNoti)}
          noti={curNoti}
        />
      ) : null}
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
