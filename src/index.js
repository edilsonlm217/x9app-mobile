import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';
import { StateProvider } from './store/store';

export default function App() {
  return (
    <StateProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </StateProvider>
  );
}