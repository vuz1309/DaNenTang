import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {Colors} from '../utils/Colors';
import {useLogout} from '../utils/authenticateFirebase/AuthenticateFirebase';
import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import {UserContext} from '../../App';
import AuthenticateService from '../utils/authenticate/AuthenticateService';
import {store} from '../state-management/redux/store';
import {storeStringAsyncData} from '../utils/authenticate/LocalStorage';
import {AsyncStorageKey} from '../utils/authenticate/LocalStorage';
import {userInfoActions} from '../state-management/redux/slices/UserInfoSlice';
import {postInfoActions} from '../state-management/redux/slices/HomeListPost';
const ProfileScreen = () => {
  const {userInfo} = store.getState();
  const {requestLogout} = useLogout(auth(), fireStore());
  const onLogout = async () => {
    try {
      storeStringAsyncData(AsyncStorageKey.TOKEN, '');

      store.dispatch(userInfoActions.logOut());
      store.dispatch(postInfoActions.setPosts([]));
      store.dispatch(postInfoActions.setLastId('1'));
      store.dispatch(
        postInfoActions.setParams({
          in_campaign: '1',
          campaign_id: '1',
          latitude: '1.0',
          longitude: '1.0',
          last_id: '1',
          index: '0',
          count: '20',
        }),
      );
      await requestLogout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logout}>Đăng xuất</Text>
      </TouchableOpacity>
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
});

export default ProfileScreen;
