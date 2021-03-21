export const LOGIN_LOADING = 'LOGIN_LOADING';

export interface AuthorizationStateType {
  loading: boolean;
}

interface LoginLoadingActionType {
  type: typeof LOGIN_LOADING;
  loading: boolean;
}

export type AuthActionTypes = LoginLoadingActionType;
