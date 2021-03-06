import React, { createContext, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { Theme } from '#utils/theme';
import { ThemeType } from '#utils/theme/types';
import { getToken, saveAuthToken } from '#utils/storage';
import User, { UserRoleEnum } from '#types/User';

type AppContextType = {
  user: User | null;
  isAdmin: boolean;
  theme: ThemeType;
  setTheme: React.Dispatch<SetStateAction<ThemeType>>;
  isLoading: boolean;
  isLoggedIn: boolean;
  authToken?: string;
  authTokenSave: (token: string) => void;
  setUser: React.Dispatch<SetStateAction<User | null>>;
};

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string>();

  const scheme = useColorScheme();
  const isLoggedIn = !!authToken;
  const isAdmin = user?.role === UserRoleEnum.ADMIN;
  const chosenTheme = scheme === 'dark' ? Theme.dark : Theme.light;
  const [theme, setTheme] = useState<ThemeType>(chosenTheme);

  const authTokenSave = (tokenToSave: string | undefined) => {
    setAuthToken(tokenToSave);
    return saveAuthToken(tokenToSave);
  };

  const prepareAuthToken = useCallback(async () => {
    const foundToken = await getToken();
    if (foundToken) await authTokenSave(foundToken);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    prepareAuthToken();
  }, [prepareAuthToken]);

  return (
    <AppContext.Provider
      value={{
        user,
        isAdmin,
        theme,
        setTheme,
        isLoading,
        isLoggedIn,
        authToken,
        authTokenSave,
        setUser,
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
