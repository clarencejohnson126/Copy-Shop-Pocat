import React from 'react';
import { Truck, Clock, MapPin, Package, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const ShippingOptions: React.FC = () => {
  const { t } = useLanguage();
  const { darkMode } = useTheme();
  
  const shippingOptions = [
    {
      id: 'pickup',
      icon: <MapPin className="w-12 h-12 text-green-600 dark:text-green-500 mb-4" />,
      title: t('shipping.pickup.title'),
      description: t('shipping.pickup.desc'),
      timeframe: t('shipping.delivery.same') + ' ' + t('shipping.delivery.next'),
      price: t('shipping.cost.free'),
      highlight: false,
    },
    {
      id: 'standard',
      icon: <Truck className="w-12 h-12 text-green-600 dark:text-green-500 mb-4" />,
      title: t('shipping.standard.title'),
      description: t('shipping.standard.desc'),
      timeframe: t('shipping.delivery.days13'),
      price: '4,90 €',
      highlight: false,
    },
    {
      id: 'express',
      icon: <Package className="w-12 h-12 text-green-600 dark:text-green-500 mb-4" />,
      title: t('shipping.express.title'),
      description: t('shipping.express.desc'),
      timeframe: t('shipping.delivery.nextday'),
      price: '12,90 €',
      highlight: true,
      recommended: t('shipping.express.recommended'),
    },
    {
      id: 'international',
      icon: <Clock className="w-12 h-12 text-green-600 dark:text-green-500 mb-4" />,
      title: t('shipping.international.title'),
      description: t('shipping.international.desc'),
      timeframe: t('shipping.delivery.days25'),
      price: 'ab 19,90 €',
      highlight: false,
    },
  ];

  return (
    <section id="shipping" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{t('shipping.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('shipping.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {shippingOptions.map((option) => (
            <div 
              key={option.id} 
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg ${
                option.highlight 
                  ? 'border-2 border-green-500 shadow-md transform hover:-translate-y-1' 
                  : 'border border-gray-200 dark:border-gray-700 hover:-translate-y-1'
              }`}
            >
              {option.highlight && (
                <div className="bg-green-500 dark:bg-green-600 text-white text-sm font-medium py-1 px-3 rounded-full self-start mb-4">
                  {option.recommended}
                </div>
              )}
              
              <div className="text-center mb-2">
                {option.icon}
                <h3 className="text-xl font-bold mb-2 dark:text-white">{option.title}</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{option.description}</p>
              
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">{t('shipping.label.delivery')}</span>
                  <span className="font-medium dark:text-gray-200">{option.timeframe}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{t('shipping.label.cost')}</span>
                  <span className={`font-bold ${option.highlight ? 'text-green-600 dark:text-green-500' : 'dark:text-white'}`}>{option.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* DHL Banner Section */}
        <div className="mt-16 mb-10 mx-auto max-w-3xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="relative" style={{ maxHeight: "280px" }}>
              <img 
                src="https://i.postimg.cc/gjZ5prYb/Screenshot-2025-04-05-at-21-38-14.png" 
                alt="DHL Shipping Services" 
                className="w-full h-auto object-cover"
                style={{ maxHeight: "280px" }}
              />
              <div className="absolute inset-0 flex items-center">
                <div className="absolute bottom-2 left-20">
                  <a 
                    href="https://www.dhl.de" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors shadow-sm"
                  >
                    Sendungsverfolgung
                    <ExternalLink className="ml-1" size={14} />
                  </a>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 dark:text-white">DHL - Unser Versandpartner</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Wir versenden deine Bestellung zuverlässig mit DHL. Profitiere von schneller Lieferung, zuverlässiger Sendungsverfolgung und klimafreundlichem Versand.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg max-w-3xl mx-auto">
          <h3 className="font-bold text-xl mb-3 dark:text-white">{t('shipping.hints')}</h3>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-green-500 dark:text-green-400 mr-2">•</span>
              <span>{t('shipping.hints.sameday')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 dark:text-green-400 mr-2">•</span>
              <span>{t('shipping.hints.express')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 dark:text-green-400 mr-2">•</span>
              <span>{t('shipping.hints.tracking')}</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 dark:text-green-400 mr-2">•</span>
              <span>{t('shipping.hints.packaging')}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ShippingOptions;