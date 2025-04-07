import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const AboutUsSection: React.FC = () => {
  const { darkMode } = useTheme();
  const { t } = useLanguage();

  return (
    <section id="ueber-uns" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {t('about.section_title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('about.section_subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {t('about.history_paragraph')}
            </p>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {t('about.sustainability_paragraph')}
            </p>
            
            <div className="bg-white dark:bg-gray-800 shadow-md border-l-4 border-green-500 p-5 rounded-lg mb-6">
              <h4 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">{t('about.experience_heading')}</h4>
              <p className="text-gray-700 dark:text-gray-300">{t('about.experience_text')}</p>
            </div>
            
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t('about.philosophy_heading')}</h3>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {t('about.philosophy_text')}
            </p>
            
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t('about.sustainability_heading')}</h3>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {t('about.sustainability_text')}
            </p>
            
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t('about.future_heading')}</h3>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {t('about.future_text')}
            </p>
          </div>
          
          <div className="relative">
            <img 
              src="https://i.postimg.cc/QMZSbgvZ/Chat-GPT-Image-Apr-6-2025-02-45-44-PM.png"
              alt="Pocat Team und Büro"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection; 