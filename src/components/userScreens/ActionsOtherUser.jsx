import {View, TouchableHighlight, Text} from 'react-native';
import React from 'react';
import {StyledButton} from '../base';
import {Colors} from '../../utils/Colors';
import {Themes} from '../../assets/themes';
import {
  setAcceptFriend,
  setRequestFriend,
} from '../../api/modules/friends.request';
import Modal from 'react-native-modal';
import VectorIcon from '../../utils/VectorIcon';
import AlertMessage from '../base/AlertMessage';
import {FriendActions} from './FriendActions';
import {setBlockRequest} from '../../api/modules/block.request';

import {APP_ROUTE} from '../../navigation/config/routes';
import {useNavigation} from '@react-navigation/native';

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
    nextMode: 4,
  },
];
const ActionsOtherUser = ({firstMode, user}) => {
  const {navigate} = useNavigation();
  const [mode, setMode] = React.useState(firstMode);
  const [modalMode, setModalMode] = React.useState(0);
  const handleClickMainBtn = async () => {
    try {
      if (mode === 0) {
        setMode(mainBtnConfig[mode].nextMode);
        await setRequestFriend({user_id: user.id});
      } else if (mode === 2) {
        setMode(mainBtnConfig[mode].nextMode);
        // CALL API cancel
        // const {data} = await setRequestFriend({user_id: userId});
        // console.log(data);
        // handle cancel
      } else {
        setModalMode(mode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptFriend = async (is_accept = '1') => {
    setMode(Number(is_accept));

    try {
      const {data} = await setAcceptFriend({user_id: user.id, is_accept});
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const blockUser = async () => {
    try {
      const {data} = await setBlockRequest({
        user_id: user.id,
      });
      console.log(data);
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
          {modalMode == 4 && (
            <View style={{backgroundColor: Colors.white, borderRadius: 4}}>
              <TouchableHighlight
                underlayColor={Colors.lightgrey}
                onPress={() => handleAcceptFriend('1')}
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  alignItems: 'center',

                  padding: 16,
                }}>
                <>
                  <VectorIcon
                    name="user-check"
                    type="Feather"
                    size={32}
                    color={Colors.black}
                  />
                  <Text
                    style={{
                      color: Colors.black,
                      fontWeight: '400',
                      fontSize: 18,
                    }}>
                    Chấp nhận
                  </Text>
                </>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={Colors.lightgrey}
                onPress={() => handleAcceptFriend('0')}
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  alignItems: 'center',

                  padding: 16,
                }}>
                <>
                  <VectorIcon
                    name="close"
                    type="AntDesign"
                    size={30}
                    color={Colors.black}
                  />
                  <Text
                    style={{
                      color: Colors.black,
                      fontWeight: '400',
                      fontSize: 18,
                    }}>
                    Xóa lời mời
                  </Text>
                </>
              </TouchableHighlight>
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
                  // blockUser();
                }}
                text={`Chặn ${user.username}`}
                icon="user-alt-slash"
              />
              <FriendActions
                action={() => {
                  setModalMode(0);
                  setAcceptFriend('0');
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
