import {
  CARDS_DATA,
  CARDS_LOADING,
  CardsActionTypes,
  CardsStateType,
  CREATE_CARD_DATA,
  CREATE_CARD_LOADING,
  DELETE_CARD_LOADING,
  UPDATE_CARD_DATA,
  UPDATE_CARD_LOADING,
  DELETE_CARD,
} from '#redux/types/CardsTypes';

const initialStateCards: CardsStateType = {
  createLoading: false,
  updateLoading: false,
  cardsLoading: false,
  deleteLoading: false,
  cardsData: [],
};

export const CardsReducer = (state = initialStateCards, action: CardsActionTypes): CardsStateType => {
  switch (action.type) {
    case CARDS_LOADING:
      return {
        ...state,
        cardsLoading: action.loading,
      };
    case CARDS_DATA:
      return {
        ...state,
        cardsData: action.cardsData,
      };
    case CREATE_CARD_LOADING:
      return {
        ...state,
        createLoading: action.loading,
      };
    case CREATE_CARD_DATA:
      return {
        ...state,
        cardsData: [...state.cardsData, action.cardData],
      };
    case UPDATE_CARD_LOADING:
      return {
        ...state,
        updateLoading: action.loading,
      };
    case UPDATE_CARD_DATA:
      // eslint-disable-next-line no-case-declarations
      const index = state.cardsData.findIndex((card) => card.id === action.cardData.id);
      return {
        ...state,
        cardsData: [
          ...state.cardsData.slice(0, index),
          { ...state.cardsData[index], ...action.cardData },
          ...state.cardsData.slice(index + 1, state.cardsData.length),
        ],
      };
    case DELETE_CARD_LOADING:
      return {
        ...state,
        deleteLoading: action.loading,
      };
    case DELETE_CARD:
      return {
        ...state,
        cardsData: state.cardsData.filter((card) => card.id !== action.id),
      };
    default:
      return state;
  }
};
