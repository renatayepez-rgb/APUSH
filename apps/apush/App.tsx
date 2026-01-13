import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { RootNavigator } from './src/navigation/RootNavigator';
import { useAppTheme } from './src/theme/useAppTheme';

export default function App() {
  const { mode } = useAppTheme();
  return (
    <>
      <RootNavigator />
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    </>
  );
}
