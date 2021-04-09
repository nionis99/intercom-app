import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { AppearanceProvider } from 'react-native-appearance';

import { AppContextProvider } from '#contexts/AppContext';
import UserProvider from '#contexts/UserContext';
import ErrorBoundary from '#components/ErrorBoundary';
import Navigation from '#navigation';
import store from '#redux/store';

const App = () => (
  <ReduxProvider store={store}>
    <ErrorBoundary>
      <AppearanceProvider>
        <AppContextProvider>
          <UserProvider>
            <Navigation />
          </UserProvider>
        </AppContextProvider>
      </AppearanceProvider>
    </ErrorBoundary>
  </ReduxProvider>
);

export default App;
