import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';

import { useAppState } from '#contexts/AppContext';
import useDeviceToken from '#hooks/useDeviceToken';

interface Props {
  children: JSX.Element;
}

const Notifications = ({ children }: Props) => {
  const { user } = useAppState();
  const { requestUserPermission } = useDeviceToken();

  useEffect(() => {
    if (user) {
      requestUserPermission();

      return messaging().onMessage((message) => console.log('foregroundMessage', message));
    }
  }, [requestUserPermission, user]);

  return children;
};

export default Notifications;
