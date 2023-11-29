import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import Logo from '../../assets/images/logo.png';
const NullImg = require('../../assets/images/avatar_null.jpg');
import {StyledButton, StyledTouchable} from '../../components/base';
import VectorIcon from '../../utils/VectorIcon';
import {Colors} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import {AUTHENTICATE_ROUTE} from '../../navigation/config/routes';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {useLogin} from '../../utils/authenticate/AuthenticateService';
import Loading from '../../components/base/Loading';
import {store} from '../../state-management/redux/store';
import {userSavedInfoActions} from '../../state-management/redux/slices/UserSavedSlice';
import LoadingOverlay from '../../components/base/LoadingOverlay';

export const LoginBySaved = ({}) => {
  const {navigate} = useNavigation();
  const userSaved = useSelector(state => state.userSavedInfo.userSaved);
  React.useEffect(() => {
    console.log('userSaved:', userSaved);
    if (userSaved.length == 0) navigate(AUTHENTICATE_ROUTE.LOGIN);
  }, [userSaved]);

  const handleRemoveAccount = () => {
    if (!isShowModal) return;
    setIsShowModal(0);
    store.dispatch(
      userSavedInfoActions.removeUserSaved(isShowModal.toString()),
    );
  };
  const {requestLogin, loading} = useLogin();
  const loginRequest = (email, password) => {
    requestLogin({email, password});
  };

  const [isShowModal, setIsShowModal] = React.useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image source={Logo} style={styles.logoStyle} />
      </View>
      <Text
        style={{
          color: Colors.primaryColor,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 24,
        }}>
        Tài khoản đã lưu
      </Text>
      <View style={{height: 400}}>
        <ScrollView style={{flex: 1}}>
          {userSaved.map(user => (
            <TouchableHighlight
              underlayColor={Colors.lightgrey}
              onPress={() => loginRequest(user.email, user.password)}
              key={user.id}
              style={styles.userContainer}>
              <>
                <View style={styles.avatar}>
                  {user.avatar ? (
                    <Image
                      source={{uri: user.avatar}}
                      defaultSource={NullImg}
                      style={styles.userAvatar}
                    />
                  ) : (
                    <Image source={NullImg} style={styles.userAvatar} />
                  )}
                </View>
                <Text style={styles.username}>{user.username}</Text>
                <StyledTouchable
                  onPress={() => setIsShowModal(Number(user.id))}
                  style={styles.moreBtn}>
                  <VectorIcon
                    name="more-vertical"
                    type="Feather"
                    size={24}
                    color={Colors.black}
                  />
                </StyledTouchable>
              </>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <TouchableHighlight
          underlayColor={Colors.lightgrey}
          onPress={() => navigate(AUTHENTICATE_ROUTE.LOGIN)}
          style={{
            flexDirection: 'row',
            gap: 12,
            alignItems: 'center',
            marginTop: 18,
            paddingVertical: 8,
          }}>
          <>
            <View
              style={{
                padding: 8,
                backgroundColor: Colors.lightPrimarColor,
                borderRadius: 4,
                overflow: 'hidden',
              }}>
              <VectorIcon
                name="plus"
                type="Entypo"
                size={24}
                color={Colors.primaryColor}
              />
            </View>
            <Text
              style={{
                color: Colors.primaryColor,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Đăng nhập bằng tài khoản khác
            </Text>
          </>
        </TouchableHighlight>
      </View>

      <View style={{alignItems: 'center', marginTop: 20}}>
        <StyledButton
          onPress={() => navigate(AUTHENTICATE_ROUTE.REGISTER)}
          customStyle={{
            backgroundColor: Colors.lightPrimarColor,
            width: '100%',
          }}
          customStyleText={{
            color: Colors.primaryColor,
            fontWeight: 'bold',
            fontSize: 18,
          }}
          title="Tạo tài khoản FACEBOOK mới"
        />
      </View>
      <Modal
        isVisible={!!isShowModal}
        backdropColor="transparent"
        onBackdropPress={() => setIsShowModal(0)}>
        <View
          style={{
            backgroundColor: Colors.white,
            borderRadius: 8,
            overflow: 'hidden',
            shadowColor: Colors.black,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            position: 'absolute',
            right: 0,
            top: '40%',
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            alignSelf: 'flex-start',
          }}>
          <TouchableHighlight
            underlayColor={Colors.lightgrey}
            onPress={handleRemoveAccount}
            style={{
              backgroundColor: Colors.white,
              padding: 16,
            }}>
            <Text style={{color: Colors.black, fontSize: 20}}>
              Gỡ tài khoản khỏi thiết bị
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={Colors.lightgrey}
            style={{
              backgroundColor: Colors.white,
              padding: 16,
            }}>
            <Text style={{color: Colors.black, fontSize: 20}}>
              Tắt thông báo đẩy
            </Text>
          </TouchableHighlight>
        </View>
      </Modal>
      <LoadingOverlay isLoading={loading} />
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
    gap: 16,
    alignItems: 'center',
    position: 'relative',
    marginTop: 12,
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
    alignItems: 'center',
  },
  moreBtn: {
    padding: 8,
  },
  userAvatar: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
});

export default LoginBySaved;
