import { PlaceStateType, PLACE_LOADING, PlaceActionTypes, PLACE_DATA } from '#redux/types/PlaceTypes';

const initialStateUser: PlaceStateType = {
  placeLoading: false,
  placeData: [],
};

export const OwnerPlaceReducer = (state = initialStateUser, action: PlaceActionTypes): PlaceStateType => {
  switch (action.type) {
    case PLACE_LOADING:
      return {
        ...state,
        placeLoading: action.loading,
      };
    case PLACE_DATA:
      return {
        ...state,
        placeData: action.placeData,
      };
    default:
      return state;
  }
};
