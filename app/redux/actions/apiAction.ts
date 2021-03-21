import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import Toast from 'react-native-toast-message';

import authHeader from '#utils/requestHeader';
import { navigate } from '#navigation/RootNavigation';
import { saveAuthToken } from '#utils/storage';

const apiAction = <D, L, S>(
  url: string,
  method: Method,
  dispatchSuccess: (response: AxiosResponse) => S,
  dispatchLoading: () => L,
  data?: D
) => {
  const headers = authHeader();
  return axios
    .request({ url, method, headers, data })
    .then(dispatchSuccess)
    .catch(handleError)
    .finally(dispatchLoading);
};

const handleError = (error: AxiosError) => {
  if (error.response) {
    const { status, data: errorMessage } = error.response;
    if (status === 401) return removeAccess();
    else if (status >= 500) return navigate('Server', {});
    else {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: errorMessage || undefined,
        position: 'bottom',
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  }
};

const removeAccess = async () => {
  await saveAuthToken((null as unknown) as string);
  navigate('Login', {});
};

export default apiAction;
