import axios, { AxiosError, AxiosResponse, Method } from 'axios';

import authHeader from '#utils/requestHeader';
import { saveAuthToken } from '#utils/storage';
import { navigate } from '#navigation/RootNavigation';
import { showError } from '#utils/toast';

export enum ApiMethodEnums {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const apiAction = async <D, L, S>(
  url: string,
  method: Method,
  dispatchSuccess: (response: AxiosResponse) => S,
  dispatchLoading: () => L,
  data?: D
) => {
  const headers = await authHeader();
  return axios
    .request({ url, method, headers, data })
    .then(dispatchSuccess)
    .catch(handleError)
    .finally(dispatchLoading);
};

const handleError = (error: AxiosError) => {
  if (error.response) {
    const { status, data: errorMessage } = error.response;
    if (status === 401) return removeAccessAndRedirect('Login');
    else if (status >= 500) navigate('Server', {});
    else showError(errorMessage);
  } else return removeAccessAndRedirect('Server');
};

const removeAccessAndRedirect = async (redirectRoute: string) => {
  await saveAuthToken((null as unknown) as string);
  navigate(redirectRoute, {});
};

export default apiAction;
