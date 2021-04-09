import {
  CARD_TYPES_DATA,
  CARD_TYPES_LOADING,
  CardTypesActionTypes,
  CardTypesStateType,
} from '#redux/types/TypesOfCardsTypes';

const initialStateCardTypes: CardTypesStateType = {
  cardTypesLoading: false,
  cardTypesData: [],
};

export const CardTypesReducer = (state = initialStateCardTypes, action: CardTypesActionTypes): CardTypesStateType => {
  switch (action.type) {
    case CARD_TYPES_LOADING:
      return {
        ...state,
        cardTypesLoading: action.loading,
      };
    case CARD_TYPES_DATA:
      return {
        ...state,
        cardTypesData: action.cardTypesData,
      };
    default:
      return state;
  }
};
