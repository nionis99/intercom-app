import { useCallback } from 'react';
import messaging from '@react-native-firebase/messaging';

const ENABLED_PUSH_PERMISSIONS = [messaging.AuthorizationStatus.AUTHORIZED, messaging.AuthorizationStatus.PROVISIONAL];

const useDeviceToken = () => {
  const getAndUpdateToken = useCallback(async () => {
    const token = await messaging().getToken();

    if (token) {
      console.log('Your Firebase Token is:', token);
    } else {
      console.log('Failed', 'No token received');
    }
  }, []);

  const requestUserPermission = useCallback(async () => {
    const authStatus = await messaging().requestPermission();
    const isPushNotificationsEnabled = ENABLED_PUSH_PERMISSIONS.includes(authStatus);
    if (isPushNotificationsEnabled) return getAndUpdateToken();
  }, [getAndUpdateToken]);

  return { requestUserPermission };
};

export default useDeviceToken;
