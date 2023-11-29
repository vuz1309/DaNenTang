import {View, Image, StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import Logo from '../../assets/images/logo.png';
import NullImg from '../../assets/images/avatar_null.jpg';
import {StyledButton, StyledTouchable} from '../../components/base';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {AUTHENTICATE_ROUTE} from '../../navigation/config/routes';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
export const LoginBySaved = ({}) => {
  const {navigate} = useNavigation();
  const userSaved = useSelector(state => state.userSavedInfo.userSaved);
  console.log(userSaved);
  const [isShowModal, setIsShowModal] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image source={Logo} style={styles.logoStyle} />
      </View>
      <View style={styles.userContainer}>
        <StyledTouchable>
          <>
            <View style={styles.avatar}>
              <Image source={NullImg} />
            </View>
            <Text style={styles.username}>Anh Hoang</Text>
            <StyledTouchable style={styles.moreBtn}>
              <VectorIcon
                name="more-vertical"
                type="Feather"
                size={24}
                color={Colors.black}
              />
            </StyledTouchable>
          </>
        </StyledTouchable>
        <Modal
          isVisible={isShowModal}
          onBackdropPress={() => setIsShowModal(false)}>
          <View>
            <StyledButton
              title="Gỡ tài khoản khỏi thiết bị"
              customStyleText={{color: Colors.black, fontSize: 20}}
              customStyle={{
                backgroundColor: Colors.white,
                padding: 8,
              }}
            />
            <StyledButton
              title="Tắt thông báo đẩy"
              customStyleText={{color: Colors.black, fontSize: 20}}
              customStyle={{
                backgroundColor: Colors.white,
                padding: 8,
              }}
            />
          </View>
        </Modal>
      </View>
      <Pressable
        style={{
          flexDirection: 'row',
          gap: 12,
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View style={{padding: 8, backgroundColor: Colors.lightPrimarColor}}>
          <VectorIcon
            name="plus"
            type="Entypo"
            size={16}
            color={Colors.primaryColor}
          />
        </View>
        <Text
          style={{
            color: Colors.primaryColor,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Đăng nhập bằng tài khoản khác
        </Text>
      </Pressable>

      <View style={{alignItems: 'center'}}>
        <StyledButton
          onPress={() => navigate(AUTHENTICATE_ROUTE.REGISTER)}
          customStyle={{backgroundColor: Colors.lightPrimarColor, width: '80%'}}
          customStyleText={{color: Colors.primaryColor, fontWeight: 'bold'}}
          title="Tạo tài khoản FACEBOOK mới"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    height: 50,
    width: 50,
    marginVertical: '20%',
  },
  container: {
    padding: 16,
  },
  subContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 8,
    overflow: 'hidden',
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
    justifyContent: 'center',
    flex: 1,
  },
  moreBtn: {
    padding: 8,
  },
});

export default LoginBySaved;
