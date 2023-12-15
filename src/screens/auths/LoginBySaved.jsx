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
import LoginByPassword from './LoginByPassword';

export const LoginBySaved = ({}) => {
  const {navigate} = useNavigation();
  const userSaved = useSelector(state => state.userSavedInfo.userSaved);

  const [index, setIndex] = React.useState(0);

  const handleRemoveAccount = () => {
    if (!isShowModal) return;
    setIsShowModal(0);
    store.dispatch(
      userSavedInfoActions.removeUserSaved(isShowModal.id.toString()),
    );
  };
  const {requestLogin, loading, error} = useLogin();
  const loginRequest = async (email, password, index) => {
    // await requestLogin({email, password});
    // if (error) {
    // console.log('error');
    setIndex(index + 1);
    // }
  };

  const [isShowModal, setIsShowModal] = React.useState({id: 0, username: ''});
  return (
    <View style={styles.container}>
      {!!index && (
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={true}
          onBackButtonPress={() => setIndex(0)}
          style={{flex: 1}}>
          <LoginByPassword
            user={userSaved[index - 1]}
            onClose={() => {
              setIndex(0);
              console.log('close');
            }}
          />
        </Modal>
      )}
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
        {userSaved.length > 0 ? (
          <ScrollView style={{flex: 1}}>
            {userSaved.map((user, index) => (
              <TouchableHighlight
                underlayColor={Colors.lightgrey}
                onPress={() => loginRequest(user.email, user.password, index)}
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
                    onPress={() =>
                      setIsShowModal({
                        id: Number(user.id),
                        username: user.username,
                        email: user.email,
                      })
                    }
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
        ) : (
          <Text style={{textAlign: 'center', color: Colors.textGrey}}>
            Chưa có tài khoản nào được lưu
          </Text>
        )}
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
        isVisible={!!isShowModal.id}
        backdropColor="transparent"
        onBackButtonPress={() => setIsShowModal({id: 0})}
        onBackdropPress={() => setIsShowModal({id: 0})}>
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

            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomColor: Colors.borderGrey,
              borderStyle: 'solid',
              borderBottomWidth: 1,
              padding: 8,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 18,
              }}>
              Tài khoản:{' '}
              <Text style={{fontWeight: 'bold'}}>{isShowModal.username}</Text>
            </Text>
            <TouchableHighlight
              onPress={() => setIsShowModal({id: 0, username: ''})}
              underlayColor={Colors.lightgrey}
              style={{padding: 8, borderRadius: 20}}>
              <VectorIcon
                name="close"
                type="AntDesign"
                size={24}
                color={Colors.black}
              />
            </TouchableHighlight>
          </View>
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
    marginTop: '20%',
    marginBottom: 40,
    transform: [
      {
        scale: 1.6,
      },
    ],
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
    paddingVertical: 4,
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
