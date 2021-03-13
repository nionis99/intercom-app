import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import { AppContextProvider } from "#contexts/AppContext";
import Navigation from "#navigation";
import ErrorBoundary from "#components/ErrorBoundary";

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
