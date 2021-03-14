import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { AppContextProvider } from '#contexts/AppContext';
import ErrorBoundary from '#components/ErrorBoundary';
import Navigation from '#navigation';

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
