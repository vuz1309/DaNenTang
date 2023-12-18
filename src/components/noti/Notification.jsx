import {Image, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import {convertTimeToFacebookStyle} from '../../helpers/helpers';
import {notiContents} from '../../utils/notification/NotificationProvider';
import Enum from '../../utils/Enum';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';
import VectorIcon from '../../utils/VectorIcon';
import ImageView from '../base/images/ImageView';

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
  [Enum.NotiType.POstCommented]: data => ({
    route: APP_ROUTE.COMMENT_PAGE,
    param: {item: data.post},
  }),
};

const notiIcons = {
  [Enum.NotiType.FriendRequest]: require('../../assets/images/user.png'),
  [Enum.NotiType.FriendAccepted]: require('../../assets/images/user.png'),
  [Enum.NotiType.MarkCommented]: require('../../assets/images/userGroup.png'),
  [Enum.NotiType.PostAdded]: require('../../assets/images/postIcon.jpg'),
  [Enum.NotiType.PostUpdated]: require('../../assets/images/postIcon.jpg'),
  [Enum.NotiType.PostMarked]: require('../../assets/images/messageIcon.png'),
  [Enum.NotiType.PostFelt]: require('../../assets/images/postIcon.jpg'),
  [Enum.NotiType.VideoAdded]: require('../../assets/images/watchIcon.webp'),
  [Enum.NotiType.POstCommented]: require('../../assets/images/messageIcon.png'),
};

const Notification = ({noti}) => {
  const {navigate} = useNavigation();

  const createdTime = React.useMemo(
    () => convertTimeToFacebookStyle(noti.created),
    [noti.created],
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
          <ImageView uri={noti?.avatar} imageStyles={styles.avatar} />
          <View
            style={[
              styles.notiType,
              {backgroundColor: Colors.transparent, overflow: 'hidden'},
            ]}>
            <Image
              source={notiIcons[Number(noti.type)]}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          </View>
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
        <View>
          <VectorIcon
            name="dots-three-horizontal"
            type="Entypo"
            size={18}
            color={Colors.headerIconGrey}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
  },
  unread: {
    backgroundColor: Colors.lightPrimaryColor,
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
    borderRadius: 30,
    left: 30,
    top: 30,
    position: 'absolute',
  },
  more: {
    width: 15,
    height: 15,
    marginTop: 5,
  },
});
export default React.memo(
  Notification,
  (prev, next) =>
    `${prev.noti.id}${prev.noti.read}` === `${next.noti.id}${next.noti.read}`,
);
