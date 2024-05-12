import React, { createContext, useContext, useState, ReactNode } from 'react';

type SettingsContextType = {
  fontSize: string;
  setFontSize: (size: string) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const defaultValues: SettingsContextType = {
  fontSize: 'medium',
  setFontSize: () => {},
  highContrast: false,
  toggleHighContrast: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
};

const SettingsContext = createContext<SettingsContextType>(defaultValues);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    document.documentElement.style.fontSize = size === 'small' ? '12px' : size === 'large' ? '18px' : '16px';
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.body.classList.toggle('high-contrast');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <SettingsContext.Provider value={{
      fontSize,
      setFontSize: handleFontSizeChange,
      highContrast,
      toggleHighContrast,
      darkMode,
      toggleDarkMode,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
