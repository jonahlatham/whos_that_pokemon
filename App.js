import { StatusBar } from 'expo-status-bar';
import React from 'react';
import ThemesProvider from './providers/ThemeProvider';
import NavigationStack from './components/NavigationStack';
import { HttpRequestProvider } from "./providers/httpRequest";

export default function App() {
  return (
    <ThemesProvider>
      <HttpRequestProvider>
        <NavigationStack />
      </HttpRequestProvider>
    </ThemesProvider>
  );
}