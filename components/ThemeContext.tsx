import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';

// Define the shape of the ThemeContext
interface ThemeContextProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create the ThemeContext with default values
export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light', // Default theme
  toggleTheme: () => {}, // Default toggle function (does nothing)
});

// Define props for ThemeProvider, expecting children
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default to light mode

  useEffect(() => {
    // Load theme from AsyncStorage on app load
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('appTheme');
      if (storedTheme) {
        setTheme(storedTheme as 'light' | 'dark'); // Ensure proper typecasting
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('appTheme', newTheme); // Persist theme
  };

  // Dynamically set status bar style based on the theme
  useEffect(() => {
    StatusBar.setBarStyle(theme === 'dark' ? 'light-content' : 'dark-content');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
