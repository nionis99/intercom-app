import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { useAppState } from '#contexts/AppContext';
import { LanguageProvider } from '#contexts/LanguageContext';
import { AuthorizedStack } from '#navigation/AuthorizedStack';
import { UnauthorizedStack } from '#navigation/UnauthorizedStack';
import { isReadyRef, navigationRef } from '#navigation/RootNavigation';
import LanguageSwitcherModal from '#components/Modals/LanguageSwitcher';

export default function () {
  const { theme, isLoggedIn } = useAppState();

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer theme={theme} ref={navigationRef} onReady={() => (isReadyRef.current = true)}>
      <LanguageProvider>
        {isLoggedIn ? <AuthorizedStack /> : <UnauthorizedStack />}
        <LanguageSwitcherModal />
      </LanguageProvider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}
