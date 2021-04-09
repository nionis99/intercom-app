import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';

import apiAction, { ApiMethodEnums } from '#redux/actions/API';
import { DOOR_DATA, DOOR_LOADING, DoorActionTypes } from '#redux/types/DoorTypes';
import { GET_DOORS } from '#utils/constants';
import Door from '#types/Door';

const getDoorsLoading = (loading: boolean): DoorActionTypes => ({
  type: DOOR_LOADING,
  loading,
});

const setDoorsData = (doors: Door[]): DoorActionTypes => ({
  type: DOOR_DATA,
  doorsData: doors,
});

export const getDoors = (projectId: string) => (dispatch: Dispatch) => {
  dispatch(getDoorsLoading(true));
  const dispatchSuccess = (response: AxiosResponse) => dispatch(setDoorsData(response.data));
  const dispatchLoading = () => dispatch(getDoorsLoading(false));
  return apiAction(`${GET_DOORS}?project=${projectId}`, ApiMethodEnums.GET, dispatchSuccess, dispatchLoading);
};
