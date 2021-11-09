import React from 'react';
import Navigation from './src/screens/navigation';
import { StatusBar } from 'expo-status-bar';
import configureStore from './src/store/configureStore';
import { Provider as StoreProvider } from 'react-redux';

const App = () => {
  return (
    <StoreProvider store={configureStore()}>
      <StatusBar style="auto" />
      <Navigation />
    </StoreProvider>
  );
};

export default App;
