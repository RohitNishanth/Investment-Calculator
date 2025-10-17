import { useState, useEffect, useCallback } from 'react';
import type { ThemeConfig } from '@/types';

/**
 * Custom hook for managing theme state
 */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('investment-calculator-theme');
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch {
        // Fallback to default if parsing fails
      }
    }

    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return {
      mode: prefersDark ? 'dark' : 'light',
      primaryColor: '#3b82f6',
      accentColor: '#10b981'
    };
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('investment-calculator-theme', JSON.stringify(theme));
    
    // Apply theme to document
    const root = document.documentElement;
    if (theme.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Set CSS custom properties
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--accent-color', theme.accentColor);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('investment-calculator-theme');
      if (!savedTheme) {
        setTheme(prev => ({
          ...prev,
          mode: e.matches ? 'dark' : 'light'
        }));
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'dark' ? 'light' : 'dark'
    }));
    
    // Reset transition state after animation
    setTimeout(() => setIsTransitioning(false), 300);
  }, []);

  const setThemeMode = useCallback((mode: 'light' | 'dark') => {
    setIsTransitioning(true);
    setTheme(prev => ({
      ...prev,
      mode
    }));
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, []);

  const updateThemeColors = useCallback((colors: Partial<Pick<ThemeConfig, 'primaryColor' | 'accentColor'>>) => {
    setTheme(prev => ({
      ...prev,
      ...colors
    }));
  }, []);

  return {
    theme,
    isTransitioning,
    toggleTheme,
    setThemeMode,
    updateThemeColors
  };
}
