import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

import apiAction, { ApiMethodEnums } from '#redux/actions/API';
import {
  EDIT_MEMBER_DATA,
  EDIT_MEMBER_LOADING,
  MEMBER_DATA,
  MEMBER_LOADING,
  MemberActionTypes,
} from '#redux/types/MemberTypes';
import { MEMBERS } from '#utils/constants';
import { MemberFormInputs } from '#components/Forms/MemberForm';
import { showSuccess } from '#utils/toast';
import Member from '#types/Member';

const getMemberLoading = (loading: boolean): MemberActionTypes => ({
  type: MEMBER_LOADING,
  loading,
});

const setMemberData = (member: Member): MemberActionTypes => ({
  type: MEMBER_DATA,
  memberData: member,
});

const editMemberLoading = (loading: boolean): MemberActionTypes => ({
  type: EDIT_MEMBER_LOADING,
  loading,
});

const editMemberData = (editMemberData: MemberFormInputs): MemberActionTypes => ({
  type: EDIT_MEMBER_DATA,
  memberData: editMemberData,
});

export const getMember = (memberId: number) => (dispatch: Dispatch) => {
  dispatch(getMemberLoading(true));
  const dispatchSuccess = (response: AxiosResponse) => dispatch(setMemberData(response.data));
  const dispatchLoading = () => dispatch(getMemberLoading(false));
  return apiAction(`${MEMBERS}/${memberId}`, ApiMethodEnums.GET, dispatchSuccess, dispatchLoading);
};

export const updateMemberData = (data: MemberFormInputs, memberId: number, responseText: string) => (
  dispatch: Dispatch
) => {
  dispatch(editMemberLoading(true));

  const dispatchSuccess = () => {
    dispatch(editMemberData({ ...data, id: memberId }));
    showSuccess(responseText);
  };

  const dispatchLoading = () => dispatch(editMemberLoading(false));
  return apiAction(`${MEMBERS}/${memberId}`, ApiMethodEnums.PUT, dispatchSuccess, dispatchLoading, data);
};
