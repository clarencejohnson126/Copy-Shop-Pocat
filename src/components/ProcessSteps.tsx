import React from 'react';
import { Upload, Cog, Truck, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const ProcessSteps: React.FC = () => {
  const { t } = useLanguage();
  const { darkMode } = useTheme();
  
  const steps = [
    {
      id: 1,
      icon: <Upload className="w-10 h-10 text-green-600 dark:text-green-500" />,
      title: t('process.step1.heading'),
      description: t('process.step1.desc'),
      stepTitle: t('process.step1.title'),
    },
    {
      id: 2,
      icon: <Cog className="w-10 h-10 text-green-600 dark:text-green-500" />,
      title: t('process.step2.heading'),
      description: t('process.step2.desc'),
      stepTitle: t('process.step2.title'),
    },
    {
      id: 3,
      icon: <Truck className="w-10 h-10 text-green-600 dark:text-green-500" />,
      title: t('process.step3.heading'),
      description: t('process.step3.desc'),
      stepTitle: t('process.step3.title'),
    },
    {
      id: 4,
      icon: <Check className="w-10 h-10 text-green-600 dark:text-green-500" />,
      title: t('process.step4.heading'),
      description: t('process.step4.desc'),
      stepTitle: t('process.step4.title'),
    },
  ];

  return (
    <section id="process" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{t('process.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('process.subtitle')}
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-200 dark:bg-green-800 -translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div key={step.id} className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <h3 className="text-2xl font-bold mb-2 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
                
                <div className="relative flex items-center justify-center py-4 md:w-0">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center border-4 border-green-200 dark:border-green-700 z-10">
                    {step.icon}
                  </div>
                  <div className="md:hidden absolute left-0 top-1/2 w-full h-0.5 bg-green-200 dark:bg-green-800 -translate-y-1/2 -z-10"></div>
                </div>
                
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                  <div className="text-4xl font-bold text-green-600 dark:text-green-500">
                    {step.stepTitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;