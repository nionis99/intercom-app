import { Dispatch } from 'redux';

import apiAction, { ApiMethodEnums } from '#redux/actions/API';
import { CHANGE_PASSWORD_LOADING, UserActionTypes } from '#redux/types/UserTypes';
import { ProfileFormInputs } from '#components/Forms/ProfileForm';
import { showSuccess } from '#utils/toast';
import { USER_URL } from '#utils/constants';

export const changePasswordLoading = (loading: boolean): UserActionTypes => ({
  type: CHANGE_PASSWORD_LOADING,
  loading,
});

export const changePassword = (id: number, data: ProfileFormInputs, responseText: string) => (dispatch: Dispatch) => {
  dispatch(changePasswordLoading(true));
  const dispatchSuccess = () => showSuccess(responseText);
  const dispatchLoading = () => dispatch(changePasswordLoading(false));
  return apiAction(`${USER_URL}/${id}`, ApiMethodEnums.PUT, dispatchSuccess, dispatchLoading, data);
};
