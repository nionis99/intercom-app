export const CHANGE_PASSWORD_LOADING = 'CHANGE_PASSWORD_LOADING';

export interface UserStateType {
  changePasswordLoading: boolean;
}

interface ChangePasswordLoadingActionType {
  type: typeof CHANGE_PASSWORD_LOADING;
  loading: boolean;
}

export type UserActionTypes = ChangePasswordLoadingActionType;
