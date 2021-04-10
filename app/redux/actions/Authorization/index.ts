import { Dispatch } from 'redux';
import axios, { AxiosResponse } from 'axios';

import { AuthActionTypes, LOGIN_LOADING, USER_LOADING } from '#redux/types/AuthTypes';
import { LoginFormInputs } from '#screens/LoginScreen';
import { AUTH_URL, USER_URL } from '#utils/constants';
import apiAction, { ApiMethodEnums } from '#redux/actions/API';
import authHeader from '#utils/requestHeader';
import User from '#types/User';

export const loginLoading = (loading: boolean): AuthActionTypes => ({ type: LOGIN_LOADING, loading });
export const getUserLoading = (loading: boolean): AuthActionTypes => ({ type: USER_LOADING, loading });

export const login = (data: LoginFormInputs, setAccessToken: (token: string) => void) => (dispatch: Dispatch) => {
  dispatch(loginLoading(true));
  const dispatchSuccess = (response: AxiosResponse) => setAccessToken(response.data.token);
  const dispatchLoading = () => dispatch(loginLoading(false));
  return apiAction(AUTH_URL, ApiMethodEnums.POST, dispatchSuccess, dispatchLoading, data);
};

export const logout = async (
  setAccessToken: (token: string) => void,
  setIsLogoutLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const headers = await authHeader();
  return axios.delete(AUTH_URL, { headers }).finally(() => {
    setIsLogoutLoading(false);
    setAccessToken((null as unknown) as string);
  });
};

export const getUser = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => (dispatch: Dispatch) => {
  dispatch(getUserLoading(true));
  const dispatchSuccess = (response: AxiosResponse) => setUser(response.data);
  const dispatchLoading = () => dispatch(getUserLoading(false));
  return apiAction(USER_URL, ApiMethodEnums.GET, dispatchSuccess, dispatchLoading);
};
