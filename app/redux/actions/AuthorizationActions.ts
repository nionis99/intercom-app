import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';

import { AuthActionTypes, LOGIN_LOADING } from '#redux/types/AuthTypes';
import apiAction from './apiAction';
import authHeader from '#utils/requestHeader';
import { AUTH_URL } from '#utils/constants';
import { LoginFormInputs } from '#screens/LoginScreen';

export const loginLoading = (loading: boolean): AuthActionTypes => ({ type: LOGIN_LOADING, loading });

export const login = (data: LoginFormInputs, setAccessToken: (token: string) => void) => (dispatch: Dispatch) => {
  dispatch(loginLoading(true));
  const dispatchSuccess = (response: AxiosResponse) => setAccessToken(response.data.token);
  const dispatchLoading = () => dispatch(loginLoading(false));

  return apiAction(AUTH_URL, 'POST', dispatchSuccess, dispatchLoading, data);
};

export const logout = (setAccessToken: (token: string) => void) => {
  const headers = authHeader();
  return axios.delete(AUTH_URL, { headers }).finally(() => setAccessToken((null as unknown) as string));
};
