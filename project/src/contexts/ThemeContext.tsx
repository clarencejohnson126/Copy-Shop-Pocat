import React, { createContext, useState, useContext, useEffect } from 'react';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

// Context mit Default-Werten erstellen
const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

// Hook für einfachen Zugriff
export const useTheme = () => useContext(ThemeContext);

// Provider Komponente
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Wir prüfen die Systemeinstellungen und gespeicherte Einstellungen
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Gespeicherte Einstellung aus dem Local Storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // Oder die Browser/System-Einstellung
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    
    // Standardeinstellung: Hell-Modus
    return false;
  });

  // Theme umschalten
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Aktualisiere das DOM und speichere die Einstellung, wenn sich darkMode ändert
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Auf Änderungen des Systemthemes reagieren
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 