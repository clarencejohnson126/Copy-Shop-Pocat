import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock, LogIn, LogOut, User } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import DarkModeToggle from './DarkModeToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  startConfigurator: () => void;
  toggleAuth?: () => void;
  isAuthenticated?: boolean;
  userEmail?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ 
  startConfigurator, 
  toggleAuth, 
  isAuthenticated = false, 
  userEmail = null 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
        : 'bg-transparent dark:bg-transparent py-4'
    }`}>
      <div className={`${
        isScrolled ? 'hidden' : 'hidden lg:block'
      } bg-green-700 dark:bg-green-800 text-white py-1 transition-all duration-300`}>
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex space-x-6">
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              <a 
                href="https://www.google.com/maps/place/pocat/@49.4060188,8.6886847,17z/data=!3m2!4b1!5s0x4797c11e0f7678f7:0x61bd40b5bd7ca3a6!4m6!3m5!1s0x4797c11e0f3952db:0x387be73aeae17b69!8m2!3d49.4060188!4d8.6912596!16s%2Fg%2F1tcvh0rl?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <span>Heidelberg</span>
              </a>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{t('topbar.hours')}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Phone size={14} className="mr-1" />
            <span>06221 6508209</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center mt-3">
            <Link to="/" className="flex items-center">
              <img 
                src="https://i.postimg.cc/hjNLBFYT/POCAT-Logo-2021-Gru-n-1.png" 
                alt="Pocat Logo" 
                className="h-16 w-auto" 
              />
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-lg font-medium">
            <a href="#ueber-uns" className={`${isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-green-600 dark:text-green-400'} hover:text-green-700 dark:hover:text-green-300 transition-colors`}>Über uns</a>
            <a href="#binding-options" className={`${isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-green-600 dark:text-green-400'} hover:text-green-700 dark:hover:text-green-300 transition-colors`}>{t('nav.bindings')}</a>
            <a href="#process" className={`${isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-green-600 dark:text-green-400'} hover:text-green-700 dark:hover:text-green-300 transition-colors`}>{t('nav.process')}</a>
            <a href="#shipping" className={`${isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-green-600 dark:text-green-400'} hover:text-green-700 dark:hover:text-green-300 transition-colors`}>{t('nav.shipping')}</a>
            <a href="#faq" className={`${isScrolled ? 'text-gray-800 dark:text-gray-200' : 'text-green-600 dark:text-green-400'} hover:text-green-700 dark:hover:text-green-300 transition-colors`}>{t('nav.faq')}</a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <DarkModeToggle />
            {toggleAuth && (
              <button 
                onClick={toggleAuth}
                className={`flex items-center ${
                  isAuthenticated 
                    ? 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600' 
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                } text-white px-4 py-2 rounded-md font-medium transition-colors shadow-md`}
              >
                {isAuthenticated ? (
                  <>
                    <LogOut className="mr-2" size={16} />
                    {t('nav.logout')}
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2" size={16} />
                    {t('nav.login')}
                  </>
                )}
              </button>
            )}
            {isAuthenticated && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <User size={14} className="mr-1" />
                <span className="truncate max-w-[140px]">{userEmail}</span>
              </div>
            )}
            <button 
              onClick={startConfigurator}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium transition-colors shadow-md"
            >
              {t('nav.configure')}
            </button>
          </div>
          
          <button 
            className="md:hidden text-gray-800 dark:text-gray-200" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Quality Badge - Positioned between config button and binding image */}
      <div className="hidden md:block fixed top-36 right-12 z-50">
        <img 
          src="https://i.postimg.cc/Zqd51566/Chat-GPT-Image-Apr-5-2025-09-15-58-PM.png" 
          alt="Pocat Premium Qualität" 
          className="h-48 w-auto" 
        />
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <a href="#ueber-uns" className="text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 border-b border-gray-100 dark:border-gray-800" onClick={() => setIsOpen(false)}>Über uns</a>
              <a href="#binding-options" className="text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 border-b border-gray-100 dark:border-gray-800" onClick={() => setIsOpen(false)}>{t('nav.bindings')}</a>
              <a href="#process" className="text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 border-b border-gray-100 dark:border-gray-800" onClick={() => setIsOpen(false)}>{t('nav.process')}</a>
              <a href="#shipping" className="text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 border-b border-gray-100 dark:border-gray-800" onClick={() => setIsOpen(false)}>{t('nav.shipping')}</a>
              <a href="#faq" className="text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 border-b border-gray-100 dark:border-gray-800" onClick={() => setIsOpen(false)}>{t('nav.faq')}</a>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-800 dark:text-gray-200">{t('language.name')}</span>
                <LanguageToggle />
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-800 dark:text-gray-200">{darkMode ? 'Heller Modus' : 'Dunkler Modus'}</span>
                <DarkModeToggle />
              </div>
              
              <div className="flex items-center justify-center py-2 my-2">
                <img 
                  src="https://i.postimg.cc/Zqd51566/Chat-GPT-Image-Apr-5-2025-09-15-58-PM.png" 
                  alt="Pocat Premium Qualität" 
                  className="h-40 w-auto" 
                />
              </div>
              {toggleAuth && (
                <button 
                  onClick={() => {
                    toggleAuth();
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-md w-full mt-2"
                >
                  <LogIn className="mr-2" size={16} />
                  {t('nav.login')}
                </button>
              )}
              <button 
                onClick={() => {
                  startConfigurator();
                  setIsOpen(false);
                }}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-md w-full mt-2"
              >
                {t('nav.configure')}
              </button>
              <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400 py-2">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-2" />
                  <a 
                    href="https://www.google.com/maps/place/pocat/@49.4060188,8.6886847,17z/data=!3m2!4b1!5s0x4797c11e0f7678f7:0x61bd40b5bd7ca3a6!4m6!3m5!1s0x4797c11e0f3952db:0x387be73aeae17b69!8m2!3d49.4060188!4d8.6912596!16s%2Fg%2F1tcvh0rl?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    <span>Heidelberg</span>
                  </a>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-2" />
                  <span>{t('topbar.hours')}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={14} className="mr-2" />
                  <span>06221 6508209</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;