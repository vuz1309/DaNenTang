import messaging from '@react-native-firebase/messaging';
import React, { createContext, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { firebaseNotify, resetBadgeNumber } from './NotifyService';
import { logger } from '../helper';
import { useAppTokens } from '../../hooks/useAppToken';
import { AppStateContext } from './AppStateProvider';
import AlertMessage from '../../components/base/AlertMessage';


export const NotificationContext = createContext({});

const DEFINE_SAVE_TOKEN = false;

export const NotificationProvider = (props: any) => {
  const { children } = props;
  const [enableNotify, setEnableNotify] = React.useState(false);
  const [firebaseToken, setFirebaseToken] = useState<any>('');
  const { appState } = React.useContext<any>(AppStateContext);
  const { saveFcmToken, getFcmToken } = useAppTokens(); // save local storage

  const createDefaultChannel = () => {
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'fbcloneChannel', // (required)
          channelName: 'fbclone', // (required)
          channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`,
          playSound: true,
          importance: 4,
          vibrate: true,
        },
        created => logger(`createChannel returned '${created}'`),
      );
    }
  };

  React.useEffect(() => {
    createDefaultChannel();
  }, []);

  const handleClickMessage = (
    type: string,
    message: string,
    data?: Record<string, unknown>,
  ) => {
    //TODO :HANDLE LOGIC CLICK MESSAGE HERE: NAVIGATE SCREEN
  };
  const handleOnMessageCome = (
    messageId: any,
    type : string, 
    data: any,
  ) => {
    var title = 'Title...';
    var body = 'Body...';
    switch(type){
      case "1": {
        const fromName = data.user.username;
        title = `Bạn có yêu cầu kết bạn mới`,
        body = `${fromName} đã gửi yêu cầu kết bạn`;
        break;
      }
      case "2": {
        const fromName = data.user.username;
        title = `Bạn có thông báo kết bạn mới`,
        body = `${fromName} đã chấp nhận lời mời kết bạn`;
        break;
      }
      case "5": {
        const fromName = data.user.username;
        title = `Thông báo từ bài viết của bạn`,
        body = `${fromName} đã bày tỏ cảm xúc về bài viết của bạn`;
        break;
      }
      case "9": {
        const fromName = data.user.username;
        title = `Thông báo từ bài viết của bạn`,
        body = `${fromName} đã bày bình luận về bài viết của bạn`;
        break;
      }
      default: 
        break;
    }
    firebaseNotify({messageId, title, body});
  }

  const onForegroundMessage = async (resp: any) => {
    const messageId = resp.mesesageId;
    const data = JSON.parse(resp.data.json);
    const {type} = data;
    handleOnMessageCome(messageId, type, data);
  };

  const onBackgroundMessage = async (resp: any) => {
    firebaseNotify(resp);
  };

  const onOpenedApp = async (response: any) => {
    handleClickMessage(
      response?.data?.type,
      response?.notification?.body,
      response?.data,
    );
  };

  const onInit = (response: any) => {
    handleClickMessage(
      response?.data?.type,
      response?.notification?.body,
      response?.data,
    );
  };

  const onClickedNotifyMessage = (response: any) => {
    if (Platform.OS === 'ios') {
      handleClickMessage(
        response?.data?.type,
        response?.message,
        response?.data,
      );
    }
  };

  const onMessageError = (data: any) => {};

  // get firebase token for device
  const getAndSaveToken = async () => {
    let fcmToken;
    if (DEFINE_SAVE_TOKEN) {
      fcmToken = await getFcmToken();
      if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          await saveFcmToken(fcmToken);
        }
      }
    } else {
      fcmToken = await messaging().getToken();
    }
    await setFirebaseToken(fcmToken);
    await saveFcmToken(fcmToken);
  };

  // request when first launch app
  React.useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }, []);
 
  const checkPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = 
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if(enabled){
      logger("case AUTHORIZED");
      setEnableNotify(true);
    }else{
      logger("case DENIED");
    }
    // const authStatus = await messaging().hasPermission();
    // switch (authStatus) {
    //   case messaging.AuthorizationStatus.NOT_DETERMINED:
    //     logger('case NOT_DETERMINED');
    //     break;
    //   case messaging.AuthorizationStatus.DENIED:
    //     logger('case DENIED');
    //     break;
    //   case messaging.AuthorizationStatus.AUTHORIZED:
    //     logger('case AUTHORIZED');
    //     setEnableNotify(true);
    //     break;
    //   case messaging.AuthorizationStatus.PROVISIONAL:
    //     logger('case PROVISIONAL');
    //     break;
    //   default:
    //     logger('default case!');
    //     await getAndSaveToken();
    //     break;
    // }
  };

  const checkNotificationSetting = async (
    callBack?: (status: string) => void,
  ) => {
    try {
      // checkNotifications().then(({ status, settings }) => {
      //   setEnableNotify(status === 'granted');
      //   if (callBack && typeof callBack === 'function') {
      //     callBack(status);
      //   }
      // });
    } catch (e) {
      console.error(e);
    }
  };

  React.useLayoutEffect(() => {
    PushNotification.configure({
      onNotification: onClickedNotifyMessage,
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,

      requestPermissions: true,
    });
  }, []);

  React.useEffect(() => {
    if (enableNotify && !firebaseToken) {
      getAndSaveToken();
    }
    checkNotificationSetting();
  }, [enableNotify, appState]);

  React.useEffect(() => {
    checkPermission();

    messaging().setBackgroundMessageHandler(onBackgroundMessage);
    const unsubscribe = messaging().onMessage(onForegroundMessage);
    messaging().onNotificationOpenedApp(onOpenedApp);

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          if (typeof onInit === 'function') {
            onInit(remoteMessage);
          }
        }
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        enableNotify,
        fcmToken: firebaseToken,
        checkNotificationSetting,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
