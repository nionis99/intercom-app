import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification';
import { createDefaultChannels } from './app/services/Notifications/channels';
import { saveDeviceToken } from './app/utils/storage';

Sentry.init({
  dsn: Config.SENTRY_DSN,
  release: Config.APP_VERSION,
});

PushNotification.configure({
  onRegister: async ({ token }) => {
    await saveDeviceToken(token);
    createDefaultChannels();
  },
  onRegistrationError: (err) => console.error(err.message, err),
  senderID: '749004869698',
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: false,
});

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage); //Background message handler
});

AppRegistry.registerComponent(appName, () => App);
