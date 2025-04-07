import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Link to="/">
                <img 
                  src="https://i.postimg.cc/hjNLBFYT/POCAT-Logo-2021-Gru-n-1.png" 
                  alt="Pocat Logo" 
                  className="h-14 w-auto" 
                />
              </Link>
            </div>
            <p className="text-gray-400 dark:text-gray-500 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/CopyshopPocat/" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors" aria-label="Pocat Facebook page">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/copyshop_pocat/" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-pink-500 dark:hover:text-pink-400 transition-colors" aria-label="Pocat Instagram page">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/ahmet-kara-37a4b5a5/" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-blue-700 dark:hover:text-blue-600 transition-colors" aria-label="Pocat LinkedIn page">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="mr-3 mt-1 text-green-500 dark:text-green-400 flex-shrink-0" size={18} />
                <span>06221 6508209</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-3 mt-1 text-green-500 dark:text-green-400 flex-shrink-0" size={18} />
                <span>info@pocat.de</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-3 mt-1 text-green-500 dark:text-green-400 flex-shrink-0" size={18} />
                <div>
                  <p>{t('about.heidelberg')}</p>
                  <p className="text-gray-400 dark:text-gray-500">Hauptstraße 123, 69117</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.opening_hours')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Clock className="mr-3 mt-1 text-green-500 dark:text-green-400 flex-shrink-0" size={18} />
                <div>
                  <p>{t('footer.monday_friday')}</p>
                  <p className="text-gray-400 dark:text-gray-500">9:00 - 18:00 Uhr</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="mr-3 mt-1 text-green-500 dark:text-green-400 flex-shrink-0" size={18} />
                <div>
                  <p>{t('footer.saturday')}</p>
                  <p className="text-gray-400 dark:text-gray-500">10:00 - 14:00 Uhr</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="mr-3 mt-1 text-green-500 dark:text-green-400 flex-shrink-0" size={18} />
                <div>
                  <p>{t('footer.sunday')}</p>
                  <p className="text-gray-400 dark:text-gray-500">{t('footer.closed')}</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.service')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#ueber-uns" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">Über uns</a>
              </li>
              <li>
                <a href="#binding-options" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">{t('footer.binding_options')}</a>
              </li>
              <li>
                <a href="#process" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">{t('footer.process')}</a>
              </li>
              <li>
                <a href="#shipping" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">{t('footer.shipping_options')}</a>
              </li>
              <li>
                <a href="#configurator" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">{t('footer.configurator')}</a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">{t('footer.privacy')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">{t('footer.imprint')}</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">{t('footer.terms')}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 dark:border-gray-700 text-center text-gray-400 dark:text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Pocat Copyshop. {t('footer.rights_reserved')}</p>
          <p className="mt-2">
            <span className="text-green-500 dark:text-green-400 font-medium">Print Green and Local</span> - {t('footer.sustainability')}
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <img src="https://i.postimg.cc/Df1r327Q/visa.png" alt="Visa" className="h-8" />
            <img src="https://i.postimg.cc/d3hgDLn0/master.jpg" alt="Mastercard" className="h-8" />
            <img src="https://i.postimg.cc/x1DBTjm0/klarna.jpg" alt="Klarna" className="h-8" />
            <img src="https://i.postimg.cc/T2sZFJY5/sofort-2.png" alt="Sofort" className="h-8" />
            <img src="https://i.postimg.cc/LXXb0ncV/pay.png" alt="Payment" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;