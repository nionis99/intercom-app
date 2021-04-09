import CardType from '#types/CardType';

export const CARD_TYPES_LOADING = 'CARD_TYPES_LOADING';
export const CARD_TYPES_DATA = 'CARD_TYPES_DATA';

export interface CardTypesStateType {
  cardTypesLoading: boolean;
  cardTypesData: CardType[];
}

interface CardTypesLoadingActionType {
  type: typeof CARD_TYPES_LOADING;
  loading: boolean;
}

interface CardTypesDataActionType {
  type: typeof CARD_TYPES_DATA;
  cardTypesData: CardType[];
}

export type CardTypesActionTypes = CardTypesLoadingActionType | CardTypesDataActionType;
