import React, { createContext, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';

import { Theme } from '#utils/theme';
import { ThemeType } from '#utils/theme/types';
import { getToken, saveAuthToken } from '#utils/storage';
import LoadingView from '#components/LoadingView';

type AppContextType = {
  theme: ThemeType;
  setTheme: React.Dispatch<SetStateAction<ThemeType>>;
  isLoading: boolean;
  isLoggedIn: boolean;
  authToken?: string;
  authTokenSave: (token: string) => void;
};

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string>();

  const scheme = useColorScheme();
  const chosenTheme = scheme === 'dark' ? Theme.dark : Theme.light;
  const [theme, setTheme] = useState<ThemeType>(chosenTheme);

  const authTokenSave = (tokenToSave: string | undefined) => {
    setAuthToken(tokenToSave);
    saveAuthToken(tokenToSave);
  };

  const prepareAuthToken = useCallback(async () => {
    const foundToken = await getToken();
    if (foundToken) authTokenSave(foundToken);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    prepareAuthToken();
  }, [prepareAuthToken]);

  if (isLoading) {
    return <LoadingView title={t('authorizing')} />;
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        isLoading,
        isLoggedIn: !!authToken,
        authToken,
        authTokenSave,
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
