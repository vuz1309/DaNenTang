import { PermissionsAndroid } from 'react-native';
import { LocalStorage } from '../localStorage';
import { StorageKey } from '../localStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging'
import { logger } from '../helper';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);


export const RequestUserPermission = async () => {
   const authStatus = await messaging().requestPermission();
   const enabled = 
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if(enabled){
      logger("Authorization status: "); logger(authStatus);
      GetFCMToken();
    }else{
      logger("not enabled");
    }
    logger("end request permission");

}
export const GetFCMToken = async () => {
  let fcmToken = AsyncStorage.getItem('fcmtoken');
  if(!fcmToken){
    try{
      let fcmToken = messaging().getToken();
      if(fcmToken){
        logger("fcmtoken: "); logger(fcmToken);
        await AsyncStorage.setItem('fcmtoken', await fcmToken);
      }

    }catch(error){
        logger(error);
    }
  }
}
