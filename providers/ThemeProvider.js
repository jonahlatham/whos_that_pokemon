import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const darkTheme = {
  ...DefaultTheme,
  roundness: 6,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: '#121212',
    secondaryBackground: '#383838',
    primary: '#0a6fc2',
    opaquePrimary: '#0a6fc20f',
    color: '#C2C2C2',
    accent: 'white',
    highlights: '#888',
    error: '#dc3545',
    successful: '#3f51b5',
    confirm: '#4BAF50',
    text: 'white',
    secondary: '#42a5f5',
    secondaryText: '#0a6fc2',
    surfaceDisabled: "#e7e1e51f",
    onSurfaceDisabled: "#e7e1e561",
    warning: '#d95319',
    success: '#388E3C'
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 6,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#EBEBEB',
    darkBackground: '#595959',
    primary: '#1664C0',
    opaquePrimary: '#1665c01a',
    // secondaryBackground: '#CBCBCB',
    secondaryBackground: '#EBEBEB',
    color: '#747474',
    accent: 'black',
    highlights: '#888',
    error: '#dc3545',
    headerColor: '#2E2E2E',
    secondary: '#ED0158',
    successful: '#4078D8',
    confirm: '#57BB89',
    secondaryText: '#0a6fc2',
    warning: '#ff5733'
  },
};
export const ThemeContext = React.createContext({});

export default function ThemesProvider(props) {
  const [darkMode, setDarkMode] = useState('');
  React.useEffect(() => {
    const setUpDarkMode = async () => {
      const initialDarkMode = await AsyncStorage.getItem('darkMode');
      if (!initialDarkMode) {
        setDarkMode(true)
      } else {
        setDarkMode(initialDarkMode === 'true' ? true : false);
      }
    };
    setUpDarkMode();
  }, []);

  const toggleDarkMode = async () => {
    setDarkMode(!darkMode);
    await AsyncStorage.setItem('darkMode', !darkMode ? 'true' : 'false');
  };

  return (
    <PaperProvider theme={darkMode ? darkTheme : theme}>
      <ThemeContext.Provider
        value={{
          toggleDarkMode,
          darkMode,
        }}
      >
        {props.children}
      </ThemeContext.Provider>
    </PaperProvider>
  );
}