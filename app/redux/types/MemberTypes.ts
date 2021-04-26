import { Maybe } from '#types';
import { MemberFormInputs } from '#components/Forms/MemberForm';
import Member from '#types/Member';

export const MEMBER_LOADING = 'MEMBER_LOADING';
export const MEMBER_DATA = 'MEMBER_DATA';
export const EDIT_MEMBER_LOADING = 'EDIT_MEMBER_LOADING';
export const EDIT_MEMBER_DATA = 'EDIT_MEMBER_DATA';

export interface MemberStateType {
  memberLoading: boolean;
  editMemberLoading: boolean;
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

interface EditMemberLoadingActionType {
  type: typeof EDIT_MEMBER_LOADING;
  loading: boolean;
}

interface EditMemberDataActionType {
  type: typeof EDIT_MEMBER_DATA;
  memberData: MemberFormInputs;
}

export type MemberActionTypes =
  | MemberLoadingActionType
  | MemberDataActionType
  | EditMemberLoadingActionType
  | EditMemberDataActionType;
