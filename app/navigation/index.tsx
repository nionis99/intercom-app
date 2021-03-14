import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppContext } from '#contexts/AppContext';
import { AuthorizedStack } from './AuthorizedStack';
import { UnauthorizedStack } from './UnauthorizedStack';
import { isReadyRef, navigationRef } from './RootNavigation';
import { LanguageProvider } from '#contexts/LanguageContext';
import LanguageSwitcherModal from '#components/Modals/LanguageSwitcher';

export default function () {
  const { theme, isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
      theme={theme}
      ref={navigationRef}
      onReady={() => (isReadyRef.current = true)}
    >
      <LanguageProvider>
        {isLoggedIn ? <AuthorizedStack /> : <UnauthorizedStack />}
        <LanguageSwitcherModal />
      </LanguageProvider>
    </NavigationContainer>
  );
}
