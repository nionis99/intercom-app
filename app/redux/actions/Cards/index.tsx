import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

import apiAction, { ApiMethodEnums } from '#redux/actions/API';
import {
  CARDS_DATA,
  CARDS_LOADING,
  CardsActionTypes,
  // CREATE_CARD_DATA,
  // CREATE_CARD_LOADING,
  // DELETE_CARD,
  // DELETE_CARD_LOADING,
  // UPDATE_CARD_DATA,
  // UPDATE_CARD_LOADING,
} from '#redux/types/CardsTypes';
import { GET_CARDS } from '#utils/constants';
// import { showSuccess } from '#utils/toast';
import Card from '#types/Card';

const getCardsLoading = (loading: boolean): CardsActionTypes => ({
  type: CARDS_LOADING,
  loading,
});

const setCardsData = (cards: Card[]): CardsActionTypes => ({
  type: CARDS_DATA,
  cardsData: cards,
});

// const createCardLoading = (loading: boolean): CardsActionTypes => ({
//   type: CREATE_CARD_LOADING,
//   loading,
// });

// const createCardData = (card: CardFormInputs): CardsActionTypes => ({
//   type: CREATE_CARD_DATA,
//   cardData: (card as unknown) as Card,
// });
//
// const updateCardLoading = (loading: boolean): CardsActionTypes => ({
//   type: UPDATE_CARD_LOADING,
//   loading,
// });
//
// const updateCardData = (card: CardFormInputs): CardsActionTypes => ({
//   type: UPDATE_CARD_DATA,
//   cardData: (card as unknown) as Card,
// });
//
// const deleteCardLoading = (loading: boolean): CardsActionTypes => ({
//   type: DELETE_CARD_LOADING,
//   loading,
// });
//
// const deleteCardData = (id: number): CardsActionTypes => ({
//   type: DELETE_CARD,
//   id,
// });

export const getCards = (memberId: string) => (dispatch: Dispatch) => {
  dispatch(getCardsLoading(true));
  const dispatchSuccess = (response: AxiosResponse) => dispatch(setCardsData(response.data));
  const dispatchLoading = () => dispatch(getCardsLoading(false));
  return apiAction(`${GET_CARDS}/?account_id=${memberId}`, ApiMethodEnums.GET, dispatchSuccess, dispatchLoading);
};

// export const createCard = (data: CardFormInputs, responseText: string) => (dispatch: Dispatch) => {
//   dispatch(createCardLoading(true));
//
//   const dispatchSuccess = (response: AxiosResponse) => {
//     dispatch(createCardData({ ...data, id: response.data.id }));
//     showSuccess(responseText);
//   };
//
//   const dispatchLoading = () => dispatch(createCardLoading(false));
//   return apiAction(CARDS, ApiMethodEnums.POST, dispatchSuccess, dispatchLoading, data);
// };
//
// export const updateCard = (data: CardFormInputs, cardId: number, responseText: string) => (dispatch: Dispatch) => {
//   dispatch(updateCardLoading(true));
//
//   const dispatchSuccess = () => {
//     dispatch(updateCardData({ ...data, id: cardId }));
//     showSuccess(responseText);
//   };
//
//   const dispatchLoading = () => dispatch(updateCardLoading(false));
//   return apiAction(`${CARDS}/${cardId}`, ApiMethodEnums.PUT, dispatchSuccess, dispatchLoading, data);
// };
//
// export const deleteCard = (cardId: number, responseText: string) => (dispatch: Dispatch) => {
//   dispatch(deleteCardLoading(true));
//
//   const dispatchSuccess = () => {
//     dispatch(deleteCardData(cardId));
//     showSuccess(responseText);
//   };
//
//   const dispatchLoading = () => dispatch(deleteCardLoading(false));
//   return apiAction(`${CARDS}/${cardId}`, ApiMethodEnums.DELETE, dispatchSuccess, dispatchLoading);
// };
