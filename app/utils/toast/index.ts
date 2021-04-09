import Toast from 'react-native-toast-message';

export const showError = (message?: string) =>
  Toast.show({
    type: 'error',
    text1: 'Error!',
    text2: message,
    position: 'bottom',
    autoHide: true,
    visibilityTime: 2000,
  });

export const showSuccess = (message: string) =>
  Toast.show({
    type: 'success',
    text1: message,
    position: 'bottom',
    autoHide: true,
    visibilityTime: 2000,
  });
