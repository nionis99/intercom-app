import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

import apiAction, { ApiMethodEnums } from '#redux/actions/API';
import { PLACE_DATA, PLACE_LOADING, PlaceActionTypes } from '#redux/types/PlaceTypes';
import { GET_OWNER_PLACES } from '#utils/constants';
import Place from '#types/Place';

const getPlacesLoading = (loading: boolean): PlaceActionTypes => ({
  type: PLACE_LOADING,
  loading,
});

const setPlacesData = (places: Place[]): PlaceActionTypes => ({
  type: PLACE_DATA,
  placeData: places,
});

export const getPlaces = () => (dispatch: Dispatch) => {
  dispatch(getPlacesLoading(true));
  const dispatchSuccess = (response: AxiosResponse) => dispatch(setPlacesData(response.data));
  const dispatchLoading = () => dispatch(getPlacesLoading(false));
  return apiAction(GET_OWNER_PLACES, ApiMethodEnums.GET, dispatchSuccess, dispatchLoading);
};
