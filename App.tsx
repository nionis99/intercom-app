import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { AppearanceProvider } from 'react-native-appearance';
import PushNotification from 'react-native-push-notification';

import { AppContextProvider } from '#contexts/AppContext';
import NetworkStatusBar from '#contexts/NetworkConnectionBar';
import UserProvider from '#contexts/UserContext';
import ErrorBoundary from '#components/ErrorBoundary';
import Notifications from '#services/Notifications';
import Navigation from '#navigation';
import store from '#redux/store';

const App = () => (
  <ReduxProvider store={store}>
    <ErrorBoundary>
      <AppearanceProvider>
        <NetworkStatusBar>
          <AppContextProvider>
            <UserProvider>
              <Notifications>
                <Navigation />
              </Notifications>
            </UserProvider>
          </AppContextProvider>
        </NetworkStatusBar>
      </AppearanceProvider>
    </ErrorBoundary>
  </ReduxProvider>
);

export default App;
