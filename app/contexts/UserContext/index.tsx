import React, { createContext, SetStateAction, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAppState } from '#contexts/AppContext';
import { useStateSelector } from '#hooks/useReduxStateSelector';
import { getPlaces } from '#redux/actions/Place';
import { getUser } from '#redux/actions/Authorization';
import useLocalStorage from '#hooks/useLocalStorage';
import LoadingView from '#components/LoadingView';
import { Maybe } from '#types';

interface UserStateContextType {
  selectedProject: Maybe<string>;
  selectedAddress: Maybe<string>;
  selectedHouse: Maybe<string>;
  selectedFlat: Maybe<string>;
  selectedFlatId: Maybe<string>;

  setSelectedProject: React.Dispatch<SetStateAction<Maybe<string>>>;
  setSelectedAddress: React.Dispatch<SetStateAction<Maybe<string>>>;
  setSelectedHouse: React.Dispatch<SetStateAction<Maybe<string>>>;
  setSelectedFlat: React.Dispatch<SetStateAction<Maybe<string>>>;
  setSelectedFlatId: React.Dispatch<SetStateAction<Maybe<string>>>;
}

export const UserStateContext = createContext<UserStateContextType | null>(null);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const { user, setUser, isLoggedIn, isLoading } = useAppState();
  const { authorizationLoading } = useStateSelector((state) => state.auth);
  const { placeLoading } = useStateSelector((state) => state.place);
  const [selectedProject, setSelectedProject] = useLocalStorage('project', null);
  const [selectedAddress, setSelectedAddress] = useLocalStorage('address', null);
  const [selectedHouse, setSelectedHouse] = useLocalStorage('house', null);
  const [selectedFlat, setSelectedFlat] = useLocalStorage('flat', null);
  const [selectedFlatId, setSelectedFlatId] = useLocalStorage('flatId', null);

  useEffect(() => {
    if (isLoggedIn) dispatch(getUser(setUser));
  }, [isLoggedIn, dispatch, setUser]);

  useEffect(() => {
    if (isLoggedIn && user) dispatch(getPlaces());
  }, [isLoggedIn, dispatch, user]);

  if (isLoading || authorizationLoading || placeLoading) return <LoadingView />;

  console.log(selectedFlatId);

  const contextValue = {
    selectedProject,
    setSelectedProject,
    selectedAddress,
    setSelectedAddress,
    selectedHouse,
    setSelectedHouse,
    selectedFlat,
    setSelectedFlat,
    selectedFlatId,
    setSelectedFlatId,
  } as UserStateContextType;

  return <UserStateContext.Provider value={{ ...contextValue }}>{children}</UserStateContext.Provider>;
};

export function useUserState() {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error('useUserState must be used within the UserStateProvider');
  }
  return context;
}

export default UserProvider;
