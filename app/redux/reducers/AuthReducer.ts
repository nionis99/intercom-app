import { AuthActionTypes, AuthorizationStateType, LOGIN_LOADING } from '#redux/types/AuthTypes';

const initialStateAuth: AuthorizationStateType = {
  loading: false,
};

export const AuthReducer = (state = initialStateAuth, action: AuthActionTypes): AuthorizationStateType => {
  return action.type === LOGIN_LOADING
    ? {
        ...state,
        loading: action.loading,
      }
    : state;
};
