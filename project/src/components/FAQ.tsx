import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const { darkMode } = useTheme();
  
  const faqs = [
    {
      id: 1,
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      id: 2,
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      id: 3,
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
    {
      id: 4,
      question: t('faq.q4'),
      answer: t('faq.a4'),
    },
    {
      id: 5,
      question: t('faq.q5'),
      answer: t('faq.a5'),
    },
    {
      id: 6,
      question: t('faq.q6'),
      answer: t('faq.a6'),
    },
    {
      id: 7,
      question: t('faq.q7'),
      answer: t('faq.a7'),
    },
    {
      id: 8,
      question: t('faq.q8'),
      answer: t('faq.a8'),
    },
  ];

  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <HelpCircle className="mx-auto text-green-600 dark:text-green-500 mb-4" size={40} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{t('faq.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
          {faqs.map((faq) => (
            <div key={faq.id} className="py-5">
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex justify-between items-center w-full text-left focus:outline-none"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{faq.question}</h3>
                {openItem === faq.id ? (
                  <ChevronUp className="flex-shrink-0 text-green-600 dark:text-green-500" />
                ) : (
                  <ChevronDown className="flex-shrink-0 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              {openItem === faq.id && (
                <div className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {t('faq.more_questions')}
          </p>
          <a
            href="mailto:info@pocat.de"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 dark:bg-green-700 text-white font-medium rounded-md hover:bg-green-700 dark:hover:bg-green-800 transition-colors"
          >
            {t('faq.contact')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;