import Place from '#types/Place';

export const PLACE_LOADING = 'PLACE_LOADING';
export const PLACE_DATA = 'PLACE_DATA';

export interface PlaceStateType {
  placeLoading: boolean;
  placeData: Place[];
}

interface PlaceLoadingActionType {
  type: typeof PLACE_LOADING;
  loading: boolean;
}

interface PlaceDataActionType {
  type: typeof PLACE_DATA;
  placeData: Place[];
}

export type PlaceActionTypes = PlaceLoadingActionType | PlaceDataActionType;
