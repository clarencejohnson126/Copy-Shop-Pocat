import React from 'react';
import { ArrowRight, Star, StarHalf } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  startConfigurator: () => void;
}

const Hero: React.FC<HeroProps> = ({ startConfigurator }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Library with books" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-gray-900/70"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10 mt-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left column with text */}
          <div className="max-w-3xl md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 text-gray-200">
              {t('hero.subtitle')}
            </p>
            
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{t('hero.deadline')}</h2>
              <p className="text-xl md:text-2xl font-light mb-8">{t('hero.binding')}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={startConfigurator}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-md font-medium text-lg transition-colors shadow-lg flex items-center justify-center"
              >
                {t('hero.configure')}
                <ArrowRight className="ml-2" size={20} />
              </button>
              <a
                href="#binding-options"
                className="border border-white hover:bg-white/10 text-white px-8 py-4 rounded-md font-medium text-lg transition-colors text-center"
              >
                {t('hero.show.options')}
              </a>
            </div>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="font-bold text-green-400 text-lg">{t('hero.premium')}</div>
                <p className="text-gray-200 text-sm">{t('hero.premium.desc')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="font-bold text-green-400 text-lg">{t('hero.sustainability')}</div>
                <p className="text-gray-200 text-sm">{t('hero.sustainability.desc')}</p>
                <p className="text-gray-300 text-xs mt-1">{t('hero.sustainability.iso')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="font-bold text-green-400 text-lg">{t('hero.express')}</div>
                <p className="text-gray-200 text-sm">{t('hero.express.desc')}</p>
                <p className="text-gray-300 text-xs mt-1">{t('hero.express.insurance')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <div className="font-bold text-green-400 text-lg">{t('hero.guarantee')}</div>
                <p className="text-gray-200 text-sm">{t('hero.guarantee.desc')}</p>
              </div>
            </div>
            
            {/* Google rating with number of reviews */}
            <div className="mt-6 flex justify-start">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <StarHalf className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  </div>
                  <p className="text-gray-200 text-sm">{t('hero.google_rating')}</p>
                </div>
                <p className="text-gray-300 text-xs mt-1 ml-1">{t('hero.google_reviews_count')}</p>
              </div>
            </div>
          </div>
          
          {/* Right column with image */}
          <div className="md:w-1/2 flex justify-center items-center mt-12 md:mt-0">
            <div 
              className="relative transform transition-transform hover:scale-125 duration-500 shadow-2xl rounded-lg overflow-hidden cursor-pointer"
              onClick={startConfigurator}
            >
              <img 
                src="https://i.postimg.cc/bNQJMryC/Photoroom-20250323-225937.png" 
                alt="Green Pocat thesis binding"
                className="max-w-full h-auto rounded-lg transform rotate-0"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 hover:opacity-100 text-white font-bold text-xl transition-opacity duration-300">
                  {t('hero.configure')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;