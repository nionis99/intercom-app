import PushNotification from 'react-native-push-notification';

export const createDefaultChannels = () =>
  PushNotification.createChannel(
    {
      channelId: 'default',
      channelName: 'Default notification channel',
      channelDescription: 'Channel only for default notifications',
      soundName: 'default',
      vibrate: true,
      playSound: true,
    },
    (created: boolean) => console.log(`default channel created - '${created}'`)
  );
