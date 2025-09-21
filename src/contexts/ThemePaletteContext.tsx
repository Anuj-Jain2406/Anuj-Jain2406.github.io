import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemePaletteContextType {
  theme: 'light' | 'dark';
  palette: 'blue-violet' | 'sunset';
  toggleTheme: () => void;
  setPalette: (palette: 'blue-violet' | 'sunset') => void;
}

const ThemePaletteContext = createContext<ThemePaletteContextType | undefined>(undefined);

export const useThemePalette = () => {
  const context = useContext(ThemePaletteContext);
  if (context === undefined) {
    throw new Error('useThemePalette must be used within a ThemePaletteProvider');
  }
  return context;
};

interface ThemePaletteProviderProps {
  children: React.ReactNode;
}

export const ThemePaletteProvider: React.FC<ThemePaletteProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [palette, setPaletteState] = useState<'blue-violet' | 'sunset'>('blue-violet');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as 'light' | 'dark' | null;
    const savedPalette = localStorage.getItem('portfolio-palette') as 'blue-violet' | 'sunset' | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
    
    if (savedPalette) {
      setPaletteState(savedPalette);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolio-palette', palette);
    if (palette === 'sunset') {
      document.documentElement.setAttribute('data-palette', 'sunset');
    } else {
      document.documentElement.removeAttribute('data-palette');
    }
  }, [palette]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const setPalette = (newPalette: 'blue-violet' | 'sunset') => {
    setPaletteState(newPalette);
  };

  return (
    <ThemePaletteContext.Provider value={{ theme, palette, toggleTheme, setPalette }}>
      {children}
    </ThemePaletteContext.Provider>
  );
};