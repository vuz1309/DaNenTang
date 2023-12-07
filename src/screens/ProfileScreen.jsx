import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {Colors} from '../utils/Colors';
// import {useLogout} from '../utils/authenticateFirebase/AuthenticateFirebase';
// import auth from '@react-native-firebase/auth';
// import fireStore from '@react-native-firebase/firestore';
import {logout} from '../api/modules/userProfile.request';
import Modal from 'react-native-modal';
import {store} from '../state-management/redux/store';
import {storeStringAsyncData} from '../utils/authenticate/LocalStorage';
import {AsyncStorageKey} from '../utils/authenticate/LocalStorage';
import {userInfoActions} from '../state-management/redux/slices/UserInfoSlice';
import {postInfoActions} from '../state-management/redux/slices/HomeListPost';
import {StyledTouchable} from '../components/base';
import {Themes} from '../assets/themes';
import BuyCoins from "./coins/BuyCoins";
import ChangePassword from "./auths/ChangePassword";
const ProfileScreen = () => {
  const [isShowModalLogout, setIsShowModalLogout] = React.useState(false);
  // const {requestLogout} = useLogout(auth(), fireStore());
  const [isChangePass, setIsChangePass] = React.useState(false);
  const onLogout = async () => {
    try {
      store.dispatch(userInfoActions.logOut());
      store.dispatch(postInfoActions.setPosts([]));
      store.dispatch(postInfoActions.setLastId('99999'));

      await logout();

      store.dispatch(
        postInfoActions.setParams({
          in_campaign: '1',
          campaign_id: '1',
          latitude: '1.0',
          longitude: '1.0',
          last_id: '99999',
          index: '0',
          count: '20',
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
  const toggleModalChangePass = ()=> {
    setIsChangePass(!isChangePass)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Modal
          animationType="slide"
          transparent={true}
          visible={isChangePass}
          onRequestClose={toggleModalChangePass}
          style={{flex:1}}
      >
        <ChangePassword closeModal={toggleModalChangePass}/>
      </Modal>
      <TouchableOpacity
          onPress={toggleModalChangePass}
          style={styles.changePassBtn}>
        <Text style={{...styles.logout, color:Colors.primaryColor}}>Đổi mật khẩu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsShowModalLogout(true)}
        style={styles.logoutButton}>
        <Text style={styles.logout}>Đăng xuất</Text>
      </TouchableOpacity>

      <Modal
        animationIn={'slideInDown'}
        animationOut={'slideOutDown'}
        isVisible={!!isShowModalLogout}
        backdropColor="transparent"
        onBackdropPress={() => setIsShowModalLogout(false)}>
        <View style={styles.modalWrapper}>
          <Text style={{fontWeight: 'bold', color: Colors.black, fontSize: 20}}>
            Bạn có chắc chắn muốn đăng xuất?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 16,
              marginTop: 24,
            }}>
            <StyledTouchable onPress={onLogout}>
              <Text style={{color: Themes.COLORS.red, fontSize: 20}}>
                Đăng xuất
              </Text>
            </StyledTouchable>
            <StyledTouchable onPress={() => setIsShowModalLogout(false)}>
              <Text style={{color: Colors.black, fontSize: 20}}>Không</Text>
            </StyledTouchable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: Colors.primaryColor,
    fontWeight: '500',
    marginTop: 30,
  },
  logout: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: Colors.primaryColor,
    padding: 12,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: 24,

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  changePassBtn:{
    backgroundColor: Colors.white,
    borderWidth:1,
    borderColor:Colors.primaryColor,
    padding: 12,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
  }
});

export default ProfileScreen;
