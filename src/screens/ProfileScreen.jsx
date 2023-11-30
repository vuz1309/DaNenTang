import {StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
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
import VectorIcon from '../utils/VectorIcon';
import tempImage from '../assets/images/img1.jpeg';
import { getFreeDiskStorageOldSync } from 'react-native-device-info';

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
      <View style={styles.header}>
        <Text style={styles.menu}>Menu</Text>
        <View style={styles.menuIcon}>
        <VectorIcon
                name="settings-sharp"
                type="Ionicons"
                size={25}
                color={Colors.black}
                style={styles.headerIcons}
              />
        <VectorIcon
              name="search"
              type="Ionicons"
              size={25}
              color={Colors.black}
              style={styles.headerIcons}
            />

        </View>
      </View>
      <View style={styles.profile}>
                <Image style ={[styles.profileImage,{marginLeft:10}]} source={tempImage}/>
                <View style={styles.profileUser}>
                  <Text style={styles.userName}>Ngo Duc Cuong</Text>
                  <Text>Xem trang cá nhân của bạn</Text>
                </View>
                <View style={styles.OtherProfile}>
                  <Image style ={styles.profileImage} source={tempImage}/>
                  <Image style ={styles.profileImage} source={tempImage}/>
                  <Image style ={styles.profileImage} source={tempImage}/>
                </View>
      </View>
      <View>
        <VectorIcon/>
        <Text>Trợ giúp và hỗ trợ</Text>
      </View>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logout}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#CDCDCD'

  },
  header:{
    flexDirection:'row',
    marginBottom:20,

  }, 
  profile:{
    height:100,
    justifyContent:'center',
    justifyContent:'center',
    flexDirection:'row',
    marginHorizontal:20,
    borderRadius:20,
    backgroundColor:Colors.white,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // elevation: 5, // Android only
  },
  userName:{
      fontSize:18,
      color:Colors.black,
      fontWeight:700,

  },  
  OtherProfile:{
    flex:2,
    flexDirection:'row',
  },
  profileUser:{
    flex:4  ,
    marginLeft:30,
  },
  profileImage:{
      borderRadius:50,
      width:40,
      height:40,
      borderColor:Colors.white,
      borderWidth:1,
      marginRight:-20,
  },
  headerIcons:{
    marginLeft:10,
  },
  menu:{
    flex:8,
    fontSize: 24,
    paddingVertical: 16,
    paddingHorizontal: 8,
    color: Colors.black,
    fontWeight: '700',
  },
   menuIcon:{
    flex:2,
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection:'row',
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
