import PushNotification from 'react-native-push-notification';

class NotificationHandler {
  onNotification(notification: any) {
    if (typeof this.onNotification === 'function') {
      this.onNotification(notification);
    }
  }

  onRegister(token: any) {
    if (typeof this.onRegister === 'function') {
      this.onRegister(token);
    }
  }

  onAction(notification: any) {
    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification);
    }
  }

  onRegistrationError(err: any) {
  }

  attachRegister(handler: any) {
    this.onRegister = handler;
  }

  attachNotification(handler: any) {
    this.onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: handler.onRegister.bind(handler),

  // (required) Called when a remote or local notification is opened or received
  onNotification: handler.onNotification.bind(handler),

  // (optional) Called when Action is pressed (Android)
  onAction: handler.onAction.bind(handler),

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: handler.onRegistrationError.bind(handler),

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,

  requestPermissions: true,
});

export default handler;
