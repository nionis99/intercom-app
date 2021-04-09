import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

import apiAction, { ApiMethodEnums } from '#redux/actions/API';
import { CARD_TYPES_DATA, CARD_TYPES_LOADING, CardTypesActionTypes } from '#redux/types/TypesOfCardsTypes';
import { GET_CARD_TYPES } from '#utils/constants';
import CardType from '#types/CardType';

const getCardTypesLoading = (loading: boolean): CardTypesActionTypes => ({
  type: CARD_TYPES_LOADING,
  loading,
});

const setCardTypesData = (cardTypes: CardType[]): CardTypesActionTypes => ({
  type: CARD_TYPES_DATA,
  cardTypesData: cardTypes,
});

export const getCardTypes = () => (dispatch: Dispatch) => {
  dispatch(getCardTypesLoading(true));
  const dispatchSuccess = (response: AxiosResponse) => dispatch(setCardTypesData(response.data));
  const dispatchLoading = () => dispatch(getCardTypesLoading(false));
  return apiAction(GET_CARD_TYPES, ApiMethodEnums.GET, dispatchSuccess, dispatchLoading);
};
