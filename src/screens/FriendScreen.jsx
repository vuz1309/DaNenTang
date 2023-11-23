import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';
import {Themes} from '../assets/themes';
import {FacebookRootState} from '../state-management/redux/store';

import AddFriendRequest from '../components/friends/AddFriendRequest';
import {useSelector} from 'react-redux';

const FriendScreen = () => {
  const userLogged = useSelector(
    /**
     *
     * @param {FacebookRootState} state
     * @returns
     */
    state => state.userInfo.user,
  );
  React.useEffect(() => {}, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bạn bè</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableHighlight style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Gợi ý</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Bạn bè</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.requestTitle}>
        <Text style={styles.requestText}>
          Lời mời kết bạn <Text style={styles.numOfRequests}>32</Text>
        </Text>
        {/* <TouchableHighlight>
          <Text style={styles.viewAllBtn}>Xem tất cả</Text>
        </TouchableHighlight> */}
      </View>
      <View style={{paddingHorizontal: 12, paddingBottom: 12}}>
        <AddFriendRequest />
        <AddFriendRequest />
        <AddFriendRequest />
        <AddFriendRequest />
        <AddFriendRequest />
        <AddFriendRequest />
        <AddFriendRequest />
        <AddFriendRequest />
        <AddFriendRequest />
      </View>
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
