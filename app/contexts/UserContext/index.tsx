import React, { createContext, SetStateAction, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useAppState } from '#contexts/AppContext';
import { useStateSelector } from '#hooks/useReduxStateSelector';
import { getPlaces } from '#redux/actions/Place';
import { getUser } from '#redux/actions/Authorization';
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { authToken, user, setUser } = useAppState();
  const { authorizationLoading } = useStateSelector((state) => state.auth);
  const { placeLoading } = useStateSelector((state) => state.place);

  useEffect(() => {
    if (authToken) dispatch(getUser(setUser));
  }, [authToken, dispatch, setUser]);

  useEffect(() => {
    if (authToken && user) dispatch(getPlaces());
  }, [authToken, dispatch, user]);

  if (!user || authorizationLoading || placeLoading) {
    return <LoadingView title={t('authorizing')} />;
  }

  const contextValue = {} as UserStateContextType;

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
