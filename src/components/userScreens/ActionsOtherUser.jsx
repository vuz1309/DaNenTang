import {View} from 'react-native';
import React from 'react';
import {StyledButton} from '../base';
import {Colors} from '../../utils/Colors';
import {Themes} from '../../assets/themes';
const mainBtnConfig = {
  add: {
    text: 'Thêm bạn bè',
    icon: 'user - plus',
  },
  cancel: {
    text: 'Hủy lời mời',
    icon: 'user-minus',
  },
};
const ActionsOtherUser = ({userId}) => {
  const [addFriendText, setAddFriendText] = React.useState('Thêm bạn bè');
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
        title={'Thêm bạn bè'}
        customStyle={{
          backgroundColor: Themes.COLORS.lightGreyBg,
          flex: 2,
        }}
        customStyleText={{
          fontWeight: 'bold',
          color: Colors.black,
        }}
        icon={{
          name: 'user-plus',
          type: 'FontAwesome5',
          color: Colors.black,
          size: 16,
        }}
      />
      <StyledButton
        title={'Nhắn tin'}
        customStyle={{
          backgroundColor: Colors.primaryColor,
          flex: 1.5,
        }}
        customStyleText={{
          fontWeight: 'bold',
          color: Colors.white,
        }}
        icon={{
          name: 'messenger',
          type: 'Fontisto',
          color: Colors.white,
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
    </View>
  );
};
export default ActionsOtherUser;
