import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageDebug: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white rounded-md px-3 py-2 text-sm z-50">
      Active Language: {language === 'de' ? 'German 🇩🇪' : 'English 🇬🇧'}
    </div>
  );
};

export default LanguageDebug; 