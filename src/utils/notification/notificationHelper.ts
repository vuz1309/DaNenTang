import { PermissionsAndroid } from 'react-native';
import { LocalStorage } from '../localStorage';
import { StorageKey } from '../localStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging'
import { logger } from '../helper';
import { t } from 'i18next';
// PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export const RequestUserPermission = async () => {
   const authStatus = await messaging().requestPermission();
   const enabled = 
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if(enabled){
      logger("Authorization status: ", false, authStatus);
      await GetFCMToken();
    }else{
      logger("not enabled");
    }
    logger("end request permission");

}
export const GetFCMToken = async () => {
  logger("start get fcm token");
  let fcmToken = await AsyncStorage.getItem('fcmtoken');
  logger('old fcmtoken: ', true, fcmToken);
  if(!fcmToken){
    try{
      let fcmToken = await messaging().getToken();
      if(fcmToken){
        logger("new fcmtoken: ", true, fcmToken)
        await AsyncStorage.setItem('fcmtoken', await fcmToken);
      }else{
        logger("fcm token not exist!");
      }
    }catch(error){
        console.log(error, 'error in fcm ');
    }
  }
}
export const NotificationListener =  () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    logger('Notification caused app to open from background state: ', false, remoteMessage.notification);
  });
  messaging().getInitialNotification().then(remoteMessage => {
    if(remoteMessage){
      logger('Notification caused app to open from quit state: ', false, remoteMessage.notification);
    }
  });
  messaging().onMessage(async remoteMessage => {
    const title = remoteMessage.notification?.title;
    const body = remoteMessage.notification?.body;
    logger("title: ", false, title);
    logger("body: ", false, body);
    logger("notification on foreground state");
  });
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    logger('Message handled in the background!',false, remoteMessage);
    const title = remoteMessage.notification?.title;
    const body = remoteMessage.notification?.body;
    const data = remoteMessage.notification;
    logger("title: ", false, title);
    logger("body: ", false, body);
    logger("data: ", false, data);

  })
}
