import Toast from 'react-native-toast-message';

export const showError = (message?: string) =>
  Toast.show({
    type: 'error',
    text1: 'Error!',
    text2: message,
    position: 'bottom',
    visibilityTime: 1000,
    autoHide: true,
  });

export const showSuccess = (message: string) =>
  Toast.show({
    type: 'success',
    text1: message,
    position: 'bottom',
    visibilityTime: 1000,
    autoHide: true,
  });
