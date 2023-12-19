import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

export function firebaseNotify({messageId, title, body}: any) {
  PushNotification.localNotification({
    ...(Platform.OS == 'android' && {channelId: 'fbcloneChannel'}),
    title,
    message: body,
    messageId,
    playSound: true, // (optional) default: true
    soundName: 'default',
    ignoreInForeground: false,
    ...(Platform.OS == 'android' && {
      android: {
        priority: 'high',
        visibility: 'public',
        importance: 'high',
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_launcher',
      },
    }),
  });
}

export function resetBadgeNumber() {
  PushNotification.setApplicationIconBadgeNumber(0);
}
