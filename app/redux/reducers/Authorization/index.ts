import { AuthActionTypes, AuthorizationStateType, LOGIN_LOADING, USER_LOADING } from '#redux/types/AuthTypes';

const initialStateAuth: AuthorizationStateType = {
  loginLoading: false,
  authorizationLoading: false,
};

export const AuthReducer = (state = initialStateAuth, action: AuthActionTypes): AuthorizationStateType => {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loginLoading: action.loading,
      };
    case USER_LOADING:
      return {
        ...state,
        authorizationLoading: action.loading,
      };
    default:
      return state;
  }
};
