import {View, Text, TouchableHighlight, Image, Pressable} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/Colors';
import Modal from 'react-native-modal';

import VectorIcon from '../../utils/VectorIcon';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTE} from '../../navigation/config/routes';
import {FriendActions} from '../userScreens/FriendActions';
import {Themes} from '../../assets/themes';
const FriendCard = ({fr}) => {
  const [isShowModal, setIsShowModal] = React.useState();
  const {navigate} = useNavigation();
  return (
    <View key={fr.id} style={{paddingBottom: 12}}>
      <TouchableHighlight
        underlayColor={Colors.lightgrey}
        onPress={() =>
          navigate(APP_ROUTE.USER_SCREEN, {
            userId: fr.id,
          })
        }>
        <View
          style={{
            flexDirection: 'row',
            padding: 12,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              gap: 8,
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderColor: Colors.borderGrey,
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 25,
              }}>
              {fr.avatar ? (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 25,
                  }}
                  source={{uri: fr.avatar}}
                  defaultSource={require('../../assets/images/avatar_null.jpg')}
                />
              ) : (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 25,
                  }}
                  source={require('../../assets/images/avatar_null.jpg')}
                />
              )}
            </View>
            <View>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 20,
                  color: Colors.black,
                }}>
                {fr.username}
              </Text>
              <Text style={{color: Colors.grey}}>
                {fr.same_friends} bạn chung
              </Text>
            </View>
          </View>
          <Pressable style={{padding: 8}} onPress={() => setIsShowModal(true)}>
            <VectorIcon
              name="more-horizontal"
              type="Feather"
              size={24}
              color={Colors.grey}
            />
          </Pressable>
        </View>
      </TouchableHighlight>
      {!!isShowModal && (
        <Modal
          isVisible={true}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
          swipeDirection={'down'}
          onSwipeComplete={() => setIsShowModal(0)}
          onBackdropPress={() => setIsShowModal(0)}>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 4,
              overflow: 'hidden',
            }}>
            <FriendActions text={`Nhắn tin`} icon={'facebook-messenger'} />
            <FriendActions
              action={() => {
                setIsShowModal(0);
                // blockUser();
              }}
              text={`Chặn ${fr.username}`}
              icon="user-alt-slash"
            />
            <FriendActions
              action={() => {
                setIsShowModal(0);
              }}
              text={`Hủy kết bạn`}
              color={Themes.COLORS.red}
              icon="user-times"
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default FriendCard;
