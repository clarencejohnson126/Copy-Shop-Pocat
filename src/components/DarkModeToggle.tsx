import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const DarkModeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 transition-colors"
      aria-label={darkMode ? 'In den hellen Modus wechseln' : 'In den dunklen Modus wechseln'}
      title={darkMode ? 'In den hellen Modus wechseln' : 'In den dunklen Modus wechseln'}
    >
      {darkMode ? (
        <Sun className="text-yellow-300 dark:text-yellow-200 hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors" size={22} />
      ) : (
        <Moon className="text-gray-600 hover:text-gray-800 transition-colors" size={22} />
      )}
    </button>
  );
};

export default DarkModeToggle; 