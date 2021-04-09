import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

import apiAction, { ApiMethodEnums } from '#redux/actions/API';
import {
  MemberActionTypes,
  MEMBER_DATA,
  MEMBER_LOADING,
  // MEMBER_CONTACTS_LOADING,
  // MEMBER_CONTACTS_DATA,
  // MEMBER_PIN_DATA,
  // MEMBER_PIN_LOADING,
} from '#redux/types/MemberTypes';
// import { ChangePinInput } from '#components/Forms/ChangePinForm';
// import { ChangeContactsInputs } from '#components/Forms/ContactsForm';
import { MEMBERS } from '#utils/constants';
// import { showSuccess } from '#utils/toast';
import Member from '#types/Member';

const getMemberLoading = (loading: boolean): MemberActionTypes => ({
  type: MEMBER_LOADING,
  loading,
});

const setMemberData = (member: Member): MemberActionTypes => ({
  type: MEMBER_DATA,
  memberData: member,
});

// const editMemberContactsLoading = (loading: boolean): MemberActionTypes => ({
//   type: MEMBER_CONTACTS_LOADING,
//   loading,
// });
//
// const editMemberContactsData = (memberContacts: ChangeContactsInputs): MemberActionTypes => ({
//   type: MEMBER_CONTACTS_DATA,
//   memberContacts,
// });
//
// const editMemberPinLoading = (loading: boolean): MemberActionTypes => ({
//   type: MEMBER_PIN_LOADING,
//   loading,
// });
//
// const editMemberPinData = (memberPin: ChangePinInput): MemberActionTypes => ({
//   type: MEMBER_PIN_DATA,
//   memberPin,
// });

export const getMember = (memberId: string) => (dispatch: Dispatch) => {
  dispatch(getMemberLoading(true));
  const dispatchSuccess = (response: AxiosResponse) => dispatch(setMemberData(response.data));
  const dispatchLoading = () => dispatch(getMemberLoading(false));
  return apiAction(`${MEMBERS}/${memberId}`, ApiMethodEnums.GET, dispatchSuccess, dispatchLoading);
};

// export const updateMemberContacts = (data: ChangeContactsInputs, memberId: number, responseText: string) => (
//   dispatch: Dispatch
// ) => {
//   dispatch(editMemberContactsLoading(true));
//
//   const dispatchSuccess = () => {
//     dispatch(editMemberContactsData({ ...data, id: memberId }));
//     showSuccess(responseText);
//   };
//
//   const dispatchLoading = () => dispatch(editMemberContactsLoading(false));
//   return apiAction(`${MEMBERS}/${memberId}`, ApiMethodEnums.PUT, dispatchSuccess, dispatchLoading, data);
// };
//
// export const updateMemberPin = (data: ChangePinInput, memberId: number, responseText: string) => (
//   dispatch: Dispatch
// ) => {
//   dispatch(editMemberPinLoading(true));
//
//   const dispatchSuccess = () => {
//     dispatch(editMemberPinData({ ...data, id: memberId }));
//     showSuccess(responseText);
//   };
//
//   const dispatchLoading = () => dispatch(editMemberPinLoading(false));
//   return apiAction(`${MEMBERS}/${memberId}`, ApiMethodEnums.PUT, dispatchSuccess, dispatchLoading, data);
// };
