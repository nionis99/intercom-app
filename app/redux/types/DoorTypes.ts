import Door from '#types/Door';

export const DOOR_LOADING = 'DOOR_LOADING';
export const DOOR_DATA = 'DOOR_DATA';

export interface DoorStateType {
  doorsLoading: boolean;
  doorsData: Door[];
}

interface DoorLoadingActionType {
  type: typeof DOOR_LOADING;
  loading: boolean;
}

interface DoorDataActionType {
  type: typeof DOOR_DATA;
  doorsData: Door[];
}

export type DoorActionTypes = DoorLoadingActionType | DoorDataActionType;
