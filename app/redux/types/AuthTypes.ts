export const LOGIN_LOADING = 'LOGIN_LOADING';
export const USER_LOADING = 'USER_LOADING';

export interface AuthorizationStateType {
  loginLoading: boolean;
  authorizationLoading: boolean;
}

interface LoginLoadingActionType {
  type: typeof LOGIN_LOADING;
  loading: boolean;
}

interface AuthorizationLoadingActionType {
  type: typeof USER_LOADING;
  loading: boolean;
}

export type AuthActionTypes = LoginLoadingActionType | AuthorizationLoadingActionType;
