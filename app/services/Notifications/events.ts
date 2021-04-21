import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

enum NotificationImportance {
  DEFAULT = 'default',
  MAX = 'max',
  HIGH = 'high',
  LOW = 'low',
  MIN = 'min',
  NONE = 'none',
  UNSPECIFIED = 'unspecified',
}

export const onMessage = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
  console.log(remoteMessage.notification);
  if (remoteMessage.notification) {
    const { body, title } = remoteMessage.notification;
    return PushNotification.localNotification({
      title,
      channelId: 'default',
      message: body || '',
      importance: NotificationImportance.MAX,
      playSound: true,
      vibrate: true,
    });
  }
};
