import Member from '#types/Member';

export const MEMBERS_LOADING = 'MEMBERS_LOADING';
export const MEMBERS_DATA = 'MEMBERS_DATA';
export const CREATE_MEMBER_LOADING = 'CREATE_MEMBER_LOADING';
export const CREATE_MEMBER_DATA = 'CREATE_MEMBER_DATA';
export const UPDATE_MEMBER_LOADING = 'UPDATE_MEMBER_LOADING';
export const UPDATE_MEMBER_DATA = 'UPDATE_MEMBER_DATA';
export const DELETE_MEMBER_LOADING = 'DELETE_MEMBER_LOADING';
export const DELETE_MEMBER = 'DELETE_MEMBER';

export interface MembersStateType {
  membersLoading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  membersData: Member[];
}

interface MembersLoadingActionType {
  type: typeof MEMBERS_LOADING;
  loading: boolean;
}

interface MembersDataActionType {
  type: typeof MEMBERS_DATA;
  memberData: Member[];
}

interface CreateMemberLoadingActionType {
  type: typeof CREATE_MEMBER_LOADING;
  loading: boolean;
}

interface CreateMemberDataActionType {
  type: typeof CREATE_MEMBER_DATA;
  member: Member;
}

interface UpdateMemberLoadingActionType {
  type: typeof UPDATE_MEMBER_LOADING;
  loading: boolean;
}

interface UpdateMemberDataActionType {
  type: typeof UPDATE_MEMBER_DATA;
  member: Member;
}

interface DeleteMemberLoadingActionType {
  type: typeof DELETE_MEMBER_LOADING;
  loading: boolean;
}

interface DeleteMemberDataActionType {
  type: typeof DELETE_MEMBER;
  id: number;
}

export type MembersActionTypes =
  | MembersLoadingActionType
  | MembersDataActionType
  | CreateMemberLoadingActionType
  | CreateMemberDataActionType
  | UpdateMemberLoadingActionType
  | UpdateMemberDataActionType
  | DeleteMemberDataActionType
  | DeleteMemberLoadingActionType;
