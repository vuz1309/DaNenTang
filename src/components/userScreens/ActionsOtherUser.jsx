import {View, TouchableHighlight, Text, ToastAndroid} from 'react-native';
import React from 'react';
import {StyledButton} from '../base';
import {Colors} from '../../utils/Colors';
import {Themes} from '../../assets/themes';
import {
  deleteFriendRequest,
  setAcceptFriend,
  setRequestFriend,
  unFriend,
} from '../../api/modules/friends.request';
import Modal from 'react-native-modal';
import VectorIcon from '../../utils/VectorIcon';
import {FriendActions} from './FriendActions';
import {setBlockRequest} from '../../api/modules/block.request';

import {APP_ROUTE} from '../../navigation/config/routes';
import {useNavigation} from '@react-navigation/native';
import StyledTouchableHighlight from '../base/StyledTouchableHighlight';

const mainBtnConfig = [
  {
    text: 'Thêm bạn bè',
    icon: 'user-plus',
    nextMode: 2,
  },

  {
    text: 'Bạn bè',
    icon: 'user-check',
    nextMode: 1,
  },
  {
    text: 'Hủy lời mời',
    icon: 'user-minus',
    nextMode: 0,
  },
  {
    text: 'Phản hồi',
    icon: 'user-check',
    nextMode: 3,
  },
];
const ActionsOtherUser = ({firstMode, user}) => {
  const {navigate} = useNavigation();
  const [mode, setMode] = React.useState(firstMode);
  const [modalMode, setModalMode] = React.useState(0);
  const handleClickMainBtn = async () => {
    try {
      setMode(mainBtnConfig[mode].nextMode);
      if (mode === 0) {
        setRequestFriend({user_id: user.id});
      } else if (mode === 2) {
        deleteFriendRequest({user_id: user.id});
      } else {
        setModalMode(mainBtnConfig[mode].nextMode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptFriend = async (is_accept = '1') => {
    setMode(Number(is_accept));
    setModalMode(0);
    try {
      setAcceptFriend({user_id: user.id, is_accept});
    } catch (error) {
      console.log(error);
    }
  };

  const blockUser = async () => {
    try {
      await setBlockRequest({
        user_id: user.id,
      });
      navigate(APP_ROUTE.HOME_TAB);
      ToastAndroid.show(`Bạn đã chặn ${user.username}.`, ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
    }
  };
  const onUnFriend = async () => {
    setMode(0);
    try {
      unFriend({
        user_id: user.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: 10,
        marginTop: 10,
      }}>
      <StyledButton
        title={mainBtnConfig[mode].text}
        onPress={handleClickMainBtn}
        customStyle={{
          backgroundColor: Colors.primaryColor,
          flex: 2,
        }}
        customStyleText={{
          fontWeight: 'bold',
          color: Colors.white,
          fontSize: 18,
        }}
        icon={{
          name: mainBtnConfig[mode].icon,
          type: 'FontAwesome5',
          color: Colors.white,

          size: 18,
        }}
      />
      <StyledButton
        title={'Nhắn tin'}
        customStyle={{
          backgroundColor: Themes.COLORS.lightGreyBg,
          flex: 1.5,
        }}
        customStyleText={{
          fontWeight: 'bold',
          fontSize: 18,
          color: Colors.black,
        }}
        icon={{
          name: 'messenger',
          type: 'Fontisto',
          color: Colors.black,
          size: 16,
        }}
      />
      <StyledButton
        customStyle={{
          backgroundColor: Themes.COLORS.lightGreyBg,
          flex: 0.5,
          gap: 0,
          height: '100%',
        }}
        customStyleText={{
          color: Themes.COLORS.logan,
        }}
        icon={{
          name: 'dots-three-horizontal',
          type: 'Entypo',
          size: 20,
          color: Colors.black,
        }}
      />
      {!!modalMode && (
        <Modal
          isVisible={true}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
          swipeDirection={'down'}
          onSwipeComplete={() => setModalMode(0)}
          onBackdropPress={() => setModalMode(0)}>
          {modalMode == 3 && (
            <View style={{backgroundColor: Colors.white, borderRadius: 4}}>
              <StyledTouchableHighlight
                text={'Chấp nhận'}
                onPress={() => handleAcceptFriend('1')}
                emojiConfig={{
                  name: 'user-check',
                  type: 'Feather',
                  size: 32,
                  color: Colors.black,
                }}
              />
              <StyledTouchableHighlight
                text={'Xóa lời mời'}
                onPress={() => handleAcceptFriend('0')}
                emojiConfig={{
                  name: 'close',
                  type: 'AntDesign',
                  size: 30,
                  color: Colors.black,
                }}
              />
            </View>
          )}
          {modalMode == 1 && (
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 4,
                overflow: 'hidden',
              }}>
              <FriendActions
                text={`Bạn bè của ${user.username}`}
                icon={'user-friends'}
                action={() => navigate(APP_ROUTE.FRIEND_ALL, {user})}
              />
              <FriendActions text={`Nhắn tin`} icon={'facebook-messenger'} />
              <FriendActions
                action={() => {
                  setModalMode(0);
                  blockUser();
                }}
                text={`Chặn ${user.username}`}
                icon="user-alt-slash"
              />
              <FriendActions
                action={() => {
                  setModalMode(0);
                  onUnFriend();
                }}
                text={`Hủy kết bạn`}
                color={Themes.COLORS.red}
                icon="user-times"
              />
            </View>
          )}
        </Modal>
      )}
    </View>
  );
};
export default ActionsOtherUser;
