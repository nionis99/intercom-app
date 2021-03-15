import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as Sentry from '@sentry/react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';

import { Theme } from '#utils/theme';
import { ThemeType } from '#utils/theme/types';
import { getToken, saveAuthToken } from '#utils/storage';
import LoadingView from '#components/LoadingView';

type AppContextType = {
  theme: ThemeType;
  isLoading: boolean;
  isLoggedIn: boolean;
  authToken?: string;
  authTokenSave: (token: string) => void;
  logout: () => void;
};

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string>();

  const prepareAuthToken = useCallback(async () => {
    const foundToken = await getToken();
    if (foundToken) authTokenSave(foundToken);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    prepareAuthToken();
  }, [prepareAuthToken]);

  const scheme = useColorScheme();
  const chosenTheme = scheme === 'dark' ? Theme.dark : Theme.dark;

  const authTokenSave = (tokenToSave: string | undefined) => {
    setAuthToken(tokenToSave);
    saveAuthToken(tokenToSave);
  };

  if (isLoading) {
    return <LoadingView title={t('authorizing')} />;
  }

  const logout = () => {
    authTokenSave(undefined);
    Sentry.configureScope((scope) => scope.setUser(null));
  };

  return (
    <AppContext.Provider
      value={{
        theme: chosenTheme,
        isLoading,
        isLoggedIn: !!authToken,
        authToken,
        authTokenSave,
        logout,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within the AppStateProvider');
  }
  return context;
}
