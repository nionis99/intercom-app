import Card from '#types/Card';

export const CARDS_LOADING = 'CARDS_LOADING';
export const CARDS_DATA = 'CARDS_DATA';
export const CREATE_CARD_LOADING = 'CREATE_CARD_LOADING';
export const CREATE_CARD_DATA = 'CREATE_CARD_DATA';
export const UPDATE_CARD_LOADING = 'UPDATE_CARD_LOADING';
export const UPDATE_CARD_DATA = 'UPDATE_CARD_DATA';
export const DELETE_CARD_LOADING = 'DELETE_CARD_LOADING';
export const DELETE_CARD = 'DELETE_CARD';

export interface CardsStateType {
  createLoading: boolean;
  updateLoading: boolean;
  cardsLoading: boolean;
  deleteLoading: boolean;
  cardsData: Card[];
}

interface CardsLoadingActionType {
  type: typeof CARDS_LOADING;
  loading: boolean;
}

interface CardsDataActionType {
  type: typeof CARDS_DATA;
  cardsData: Card[];
}

interface CreateCardLoadingActionType {
  type: typeof CREATE_CARD_LOADING;
  loading: boolean;
}

interface CreateCardDataActionType {
  type: typeof CREATE_CARD_DATA;
  cardData: Card;
}

interface UpdateCardLoadingActionType {
  type: typeof UPDATE_CARD_LOADING;
  loading: boolean;
}

interface UpdateCardDataActionType {
  type: typeof UPDATE_CARD_DATA;
  cardData: Card;
}

interface DeleteCardLoadingActionType {
  type: typeof DELETE_CARD_LOADING;
  loading: boolean;
}

interface DeleteCardDataActionType {
  type: typeof DELETE_CARD;
  id: number;
}

export type CardsActionTypes =
  | CardsLoadingActionType
  | CardsDataActionType
  | CreateCardLoadingActionType
  | CreateCardDataActionType
  | UpdateCardLoadingActionType
  | UpdateCardDataActionType
  | DeleteCardLoadingActionType
  | DeleteCardDataActionType;
