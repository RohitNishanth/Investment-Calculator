import { createContext, useContext, ReactNode } from 'react';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeConfig } from '@/types';

interface ThemeContextType {
  theme: ThemeConfig;
  isTransitioning: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: 'light' | 'dark') => void;
  updateThemeColors: (colors: Partial<Pick<ThemeConfig, 'primaryColor' | 'accentColor'>>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeHook = useTheme();

  return (
    <ThemeContext.Provider value={themeHook}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
