import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tempImage from '../../assets/images/img1.jpeg';
import {Colors} from '../../utils/Colors';
import more from '../../assets/images/more.png';
import VectorIcon from '../../utils/VectorIcon';
import NotificationAddition from './NotificationAddition';
import {convertTimeToFacebookStyle} from '../../helpers/helpers';
import {notiContents} from '../../utils/notification/NotificationProvider';
import Enum from '../../utils/Enum';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';

const actionsNoti = {
  [Enum.NotiType.FriendRequest]: data => ({
    route: APP_ROUTE.USER_SCREEN,
    param: {
      userId: data.user.id,
    },
  }),
  [Enum.NotiType.FriendAccepted]: data => ({
    route: APP_ROUTE.USER_SCREEN,
    param: {
      userId: data.user.id,
    },
  }),
  [Enum.NotiType.MarkCommented]: data => ({
    route: APP_ROUTE.COMMENT_PAGE,
    param: {item: data.post},
  }),
  [Enum.NotiType.PostAdded]: data => ({
    route: APP_ROUTE.COMMENT_PAGE,
    param: {item: data.post},
  }),
  [Enum.NotiType.PostUpdated]: data => ({
    route: APP_ROUTE.COMMENT_PAGE,
    param: {item: data.post},
  }),
  [Enum.NotiType.PostMarked]: data => ({
    route: APP_ROUTE.COMMENT_PAGE,
    param: {item: data.post},
  }),
  [Enum.NotiType.PostFelt]: data => ({
    route: APP_ROUTE.COMMENT_PAGE,
    param: {item: data.post},
  }),
  [Enum.NotiType.VideoAdded]: data => ({
    route: APP_ROUTE.COMMENT_PAGE,
    param: {item: data.post},
  }),
  [Enum.NotiType.MarkCommented]: data => ({
    route: APP_ROUTE.COMMENT_PAGE,
    param: {item: data.post},
  }),
};

const Notification = ({noti}) => {
  const {navigate} = useNavigation();

  const createdTime = React.useMemo(() =>
    convertTimeToFacebookStyle(noti.created),
  );
  const avatarSource = React.useMemo(
    () =>
      noti.avatar
        ? {uri: noti.avatar}
        : require('../../assets/images/avatar_null.jpg'),
    [noti.avatar],
  );
  const userAvatar = React.useMemo(
    () =>
      noti.user?.avatar
        ? {uri: noti.user?.avatar}
        : require('../../assets/images/avatar_null.jpg'),
    [noti.user?.avatar],
  );
  const handleClickNoti = () => {
    const target = actionsNoti[Number(noti.type)](noti);

    navigate(target.route, target.param);
  };
  return (
    <TouchableHighlight
      onPress={handleClickNoti}
      underlayColor={Colors.lightgrey}>
      <View style={[styles.container, noti.read == 0 && styles.unread]}>
        <View style={styles.imageContainer}>
          <Image source={avatarSource} style={styles.avatar} />
          <Image source={userAvatar} style={styles.notiType} />
        </View>
        <View style={styles.notificationContainer}>
          <View>
            <View style={styles.notification}>
              <Text style={styles.notificationText}>
                <Text style={{fontWeight: 'bold'}}>{noti?.user?.username}</Text>{' '}
                {notiContents[Number(noti.type)]?.body}
              </Text>
              <Text style={{color: Colors.textGrey, fontSize: 12}}>
                {createdTime}
              </Text>
            </View>
          </View>
        </View>
        {/* <View>
          <VectorIcon
          
            name="dots-three-horizontal"
            type="Entypo"
            size={14}
            color={Colors.headerIconGrey}
            style={styles.headerIcons}
          />
        </View> */}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  // ... (previous styles
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
  },
  unread: {
    backgroundColor: Colors.lightPrimarColor,
  },
  imageContainer: {
    flex: 2,
  },

  notificationContainer: {
    flex: 7,
    borderColor: Colors.lightgrey,
    borderRadius: 8,
    marginBottom: 8,
    marginLeft: 8,
  },
  notification: {
    padding: 1,
    borderRadius: 5,
    marginBottom: 5,
    paddingRight: 4,
  },
  notificationText: {
    fontSize: 16,
    color: Colors.black,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  notiType: {
    height: 30,
    width: 30,
    borderRadius: 50,
    marginLeft: 30,
    marginTop: 30,
    position: 'absolute',
  },
  more: {
    width: 15,
    height: 15,
    marginTop: 5,
  },
});
export default Notification;
