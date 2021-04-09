// import { ChangePinInput } from '#components/Forms/ChangePinForm';
// import { ChangeContactsInputs } from '#components/Forms/ContactsForm';
import { Maybe } from '#types';
import Member from '#types/Member';

export const MEMBER_LOADING = 'MEMBER_LOADING';
export const MEMBER_DATA = 'MEMBER_DATA';
export const MEMBER_CONTACTS_LOADING = 'MEMBER_CONTACTS_LOADING';
export const MEMBER_CONTACTS_DATA = 'MEMBER_CONTACTS_DATA';
export const MEMBER_PIN_LOADING = 'MEMBER_PIN_LOADING';
export const MEMBER_PIN_DATA = 'MEMBER_PIN_DATA';

export interface MemberStateType {
  memberLoading: boolean;
  memberContactsLoading: boolean;
  memberPinLoading: boolean;
  memberData: Maybe<Member>;
}

interface MemberLoadingActionType {
  type: typeof MEMBER_LOADING;
  loading: boolean;
}

interface MemberDataActionType {
  type: typeof MEMBER_DATA;
  memberData: Member;
}

// interface MemberContactsLoadingActionType {
//   type: typeof MEMBER_CONTACTS_LOADING;
//   loading: boolean;
// }
//
// interface MemberContactsDataActionType {
//   type: typeof MEMBER_CONTACTS_DATA;
//   memberContacts: ChangeContactsInputs;
// }
//
// interface MemberPinLoadingActionType {
//   type: typeof MEMBER_PIN_LOADING;
//   loading: boolean;
// }
//
// interface MemberPinDataActionType {
//   type: typeof MEMBER_PIN_DATA;
//   memberPin: ChangePinInput;
// }

export type MemberActionTypes = MemberLoadingActionType | MemberDataActionType;
// | MemberContactsLoadingActionType
// | MemberContactsDataActionType
// | MemberPinLoadingActionType
// | MemberPinDataActionType;
