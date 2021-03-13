import React from 'react';
import {AppearanceProvider} from 'react-native-appearance';
import Navigation from '#navigation';
import {AppContextProvider} from '#contexts/AppContext';
import ErrorBoundary from '#components/ErrorBoundary';

const App = () => (
  <ErrorBoundary>
    <AppearanceProvider>
      <AppContextProvider>
        <Navigation />
      </AppContextProvider>
    </AppearanceProvider>
  </ErrorBoundary>
);

export default App;
