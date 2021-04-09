import {
  MEMBER_DATA,
  MEMBER_LOADING,
  // MEMBER_CONTACTS_LOADING,
  // MEMBER_CONTACTS_DATA,
  // MEMBER_PIN_DATA,
  // MEMBER_PIN_LOADING,
  MemberActionTypes,
  MemberStateType,
} from '#redux/types/MemberTypes';
// import Member from '#types/Member';

const initialStateMember: MemberStateType = {
  memberLoading: false,
  memberContactsLoading: false,
  memberPinLoading: false,
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
    // case MEMBER_CONTACTS_LOADING:
    //   return {
    //     ...state,
    //     memberContactsLoading: action.loading,
    //   };
    // case MEMBER_CONTACTS_DATA:
    //   return {
    //     ...state,
    //     memberData: { ...state.memberData, ...action.memberContacts } as Member,
    //   };
    // case MEMBER_PIN_LOADING:
    //   return {
    //     ...state,
    //     memberPinLoading: action.loading,
    //   };
    // case MEMBER_PIN_DATA:
    //   return {
    //     ...state,
    //     memberData: { ...state.memberData, ...action.memberPin } as Member,
    //   };
    default:
      return state;
  }
};
