import {
  CREATE_MEMBER_DATA,
  CREATE_MEMBER_LOADING,
  DELETE_MEMBER,
  DELETE_MEMBER_LOADING,
  MEMBERS_DATA,
  MEMBERS_LOADING,
  MembersActionTypes,
  MembersStateType,
  UPDATE_MEMBER_LOADING,
  UPDATE_MEMBER_DATA,
} from '#redux/types/MembersTypes';

const initialStateUsers: MembersStateType = {
  deleteLoading: false,
  membersLoading: false,
  createLoading: false,
  updateLoading: false,
  membersData: [],
};

export const MembersReducer = (state = initialStateUsers, action: MembersActionTypes): MembersStateType => {
  switch (action.type) {
    case MEMBERS_LOADING:
      return {
        ...state,
        membersLoading: action.loading,
      };
    case MEMBERS_DATA:
      return {
        ...state,
        membersData: action.memberData,
      };
    case CREATE_MEMBER_LOADING:
      return {
        ...state,
        createLoading: action.loading,
      };
    case CREATE_MEMBER_DATA:
      return {
        ...state,
        membersData: [...state.membersData, action.member],
      };
    case UPDATE_MEMBER_LOADING:
      return {
        ...state,
        updateLoading: action.loading,
      };
    case UPDATE_MEMBER_DATA:
      // eslint-disable-next-line no-case-declarations
      const index = state.membersData.findIndex((member) => member.id === action.member.id);

      return {
        ...state,
        membersData: [
          ...state.membersData.slice(0, index),
          { ...state.membersData[index], ...action.member },
          ...state.membersData.slice(index + 1, state.membersData.length),
        ],
      };
    case DELETE_MEMBER_LOADING:
      return {
        ...state,
        deleteLoading: action.loading,
      };
    case DELETE_MEMBER:
      return {
        ...state,
        membersData: state.membersData.filter((member) => member.id !== action.id),
      };
    default:
      return state;
  }
};
