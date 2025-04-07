import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Image, 
  FileUp, 
  Scan, 
  Layers, 
  Calendar, 
  Shirt, 
  BookOpen, 
  Briefcase, 
  Globe, 
  Mail, 
  Palette, 
  MessageSquare
} from 'lucide-react';

// Service Interface für bessere Typisierung
interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Service-Komponente für konsistentes Design
const ServiceCard: React.FC<ServiceProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="w-16 h-16 flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="font-semibold text-center text-lg mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-center text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
};

const AdditionalServices: React.FC = () => {
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  return (
    <section id="additional-services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('additionalServices.section_title')}
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mt-3 max-w-3xl mx-auto">
            {t('additionalServices.section_subtitle')}
          </p>
        </div>

        {/* Hauptdienste - 3er Grid für größere Bildschirme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <ServiceCard
            icon={<Image className="w-12 h-12 text-green-700 dark:text-green-500" strokeWidth={1.5} />}
            title={t('additional.printing.title')}
            description={t('additional.printing.desc')}
          />
          
          <ServiceCard
            icon={<Scan className="w-12 h-12 text-green-700 dark:text-green-500" strokeWidth={1.5} />}
            title={t('additional.scanning.title')}
            description={t('additional.scanning.desc')}
          />
          
          <ServiceCard
            icon={<Mail className="w-12 h-12 text-green-700 dark:text-green-500" strokeWidth={1.5} />}
            title={t('additional.mailings.title')}
            description={t('additional.mailings.desc')}
          />
          
          <ServiceCard
            icon={<Palette className="w-12 h-12 text-green-700 dark:text-green-500" strokeWidth={1.5} />}
            title={t('additional.consulting.title')}
            description={t('additional.consulting.desc')}
          />
          
          <ServiceCard
            icon={<Calendar className="w-12 h-12 text-green-700 dark:text-green-500" strokeWidth={1.5} />}
            title={t('additional.calendar.title')}
            description={t('additional.calendar.desc')}
          />
          
          <ServiceCard
            icon={<Shirt className="w-12 h-12 text-green-700 dark:text-green-500" strokeWidth={1.5} />}
            title={t('additional.merchandise.title')}
            description={t('additional.merchandise.desc')}
          />
        </div>
        
        {/* Weitere Dienste - 4er Grid für größere Bildschirme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <ServiceCard
            icon={<BookOpen className="w-10 h-10 text-green-700 dark:text-green-500" strokeWidth={1.5} />}
            title={t('additional.proofreading.title')}
            description={t('additional.proofreading.desc')}
          />
          
          <ServiceCard
            icon={<Briefcase className="w-10 h-10 text-green-700 dark:text-green-500" strokeWidth={1.5} />}
            title={t('additional.business.title')}
            description={t('additional.business.desc')}
          />
          
          <ServiceCard
            icon={<Globe className="w-10 h-10 text-green-700 dark:text-green-500" strokeWidth={1.5} />}
            title={t('additional.online.title')}
            description={t('additional.online.desc')}
          />
          
          <ServiceCard
            icon={<FileUp className="w-10 h-10 text-green-700 dark:text-green-500" strokeWidth={1.5} />}
            title={t('additionalServices.plotting.title')}
            description={t('additionalServices.plotting.description')}
          />
        </div>

        {/* Zusätzliche Dienste - 2er Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <ServiceCard
            icon={<Layers className="w-10 h-10 text-green-700 dark:text-green-500" strokeWidth={1.5} />}
            title={t('additionalServices.laminating.title')}
            description={t('additionalServices.laminating.description')}
          />
          
          <ServiceCard
            icon={<div className="w-10 h-10 text-green-700 dark:text-green-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 11.5a.5.5 0 1 1-.5-.5.5.5 0 0 1 .5.5M16 11.5a.5.5 0 1 1-.5-.5.5.5 0 0 1 .5.5M12 16a4 4 0 0 0 4-4" />
              </svg>
            </div>}
            title={t('additionalServices.stickers.title')}
            description={t('additionalServices.stickers.description')}
          />
        </div>

        {/* Chatbot und Kontaktbereich */}
        <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Chatbot Section */}
            <div 
              className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 p-4 rounded-lg transition-colors" 
              onClick={() => {
                // Versuche den TIXAE Chatbot zu öffnen, wenn verfügbar
                const windowWithChatbot = window as Window;
                if (windowWithChatbot.VG_CHATBOT && typeof windowWithChatbot.VG_CHATBOT.open === 'function') {
                  windowWithChatbot.VG_CHATBOT.open();
                }
              }}
            >
              <div className="mr-4 flex-shrink-0">
                <img src="/images/chatbot.svg" alt="Chatbot" className="w-16 h-16" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">{t('additionalServices.chatbot.title')}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('additionalServices.chatbot.description')}
                </p>
              </div>
            </div>
            
            {/* Spezielle Anfragen */}
            <a 
              href="mailto:info@pocat.de" 
              className="flex items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <div className="mr-4 flex-shrink-0">
                <MessageSquare className="w-14 h-14 text-green-700 dark:text-green-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">Individuelle Anfragen willkommen</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Benötigst du einen besonderen Service, der hier nicht aufgeführt ist? Kontaktiere uns direkt - wir finden eine Lösung!
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices; 