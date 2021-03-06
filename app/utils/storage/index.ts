import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

const prefix = 'intercom';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

let token: string | undefined;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  try {
    token = await storage.load({
      key: `${prefix}:authToken`,
    });
  } catch (e) {
    token = undefined;
  }

  return token;
};

export const saveAuthToken = (newToken?: string) => {
  token = newToken;

  if (newToken) {
    return storage.save({
      key: `${prefix}:authToken`,
      data: newToken,
      expires: null,
    });
  }

  return storage.remove({
    key: `${prefix}:authToken`,
  });
};

export const getDeviceToken = () =>
  storage.load<string>({
    key: `${prefix}:deviceToken`,
  });

export const saveDeviceToken = (deviceToken: string | null) =>
  storage.save({
    key: `${prefix}:deviceToken`,
    data: deviceToken,
    expires: null,
  });
