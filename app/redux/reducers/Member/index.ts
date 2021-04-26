import {
  MEMBER_DATA,
  MEMBER_LOADING,
  EDIT_MEMBER_LOADING,
  EDIT_MEMBER_DATA,
  MemberActionTypes,
  MemberStateType,
} from '#redux/types/MemberTypes';
import Member from '#types/Member';

const initialStateMember: MemberStateType = {
  memberLoading: false,
  editMemberLoading: false,
  memberData: null,
};

export const MemberReducer = (state = initialStateMember, action: MemberActionTypes): MemberStateType => {
  switch (action.type) {
    case MEMBER_LOADING:
      return {
        ...state,
        memberLoading: action.loading,
      };
    case MEMBER_DATA:
      return {
        ...state,
        memberData: action.memberData,
      };
    case EDIT_MEMBER_LOADING:
      return {
        ...state,
        editMemberLoading: action.loading,
      };
    case EDIT_MEMBER_DATA:
      return {
        ...state,
        memberData: { ...state.memberData, ...action.memberData } as Member,
      };
    default:
      return state;
  }
};
