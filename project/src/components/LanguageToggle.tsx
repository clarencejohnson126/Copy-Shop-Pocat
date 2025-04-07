import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center px-3 py-1 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
      aria-label={`Switch to ${language === 'de' ? 'English' : 'German'}`}
    >
      <Globe size={16} className="mr-1" />
      {t('language.toggle')}
    </button>
  );
};

export default LanguageToggle; 