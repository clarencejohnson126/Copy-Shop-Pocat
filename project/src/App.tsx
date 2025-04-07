import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ChevronDown, MapPin, Clock, Phone, Mail,
  Star, Truck, Leaf, Award, BookOpen, Bookmark, ShieldCheck, LogIn, LogOut
} from 'lucide-react';

// Supabase Auth Form and Client
import AuthForm from './AuthForm';
import { supabase } from './lib/supabaseClient';

// Komponenten
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUsSection from './components/AboutUsSection';
import BindingOptions from './components/BindingOptions';
import Configurator from './components/Configurator';
import ProcessSteps from './components/ProcessSteps';
import ShippingOptions from './components/ShippingOptions';
import AdditionalServices from './components/AdditionalServices';
import Reviews from './components/Reviews';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import LanguageDebug from './components/LanguageDebug';
import SoftcoverDemo from './components/SoftcoverDemo';
import { useLanguage } from './contexts/LanguageContext';
import { useTheme } from './contexts/ThemeContext';

// Blog-Seiten
import BindingThesis from './pages/blog/BindingThesis';
import SustainablePrinting from './pages/blog/SustainablePrinting';
import ModernPrinting from './pages/blog/ModernPrinting';

// Die Hauptanwendung ohne Routing-Wrapper
function MainApp() {
  const [configStep, setConfigStep] = useState<number | null>(null);
  const [showSoftcoverDemo, setShowSoftcoverDemo] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (data?.session) {
        setIsAuthenticated(true);
        setUserEmail(data.session.user.email || null);
        console.log('User is authenticated:', data.session.user);
      } else {
        setIsAuthenticated(false);
        setUserEmail(null);
        console.log('User is not authenticated');
      }
      
      if (error) {
        console.error('Error checking auth status:', error);
      }
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        console.log('Auth state changed:', event, session);
        if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email || null);
          setShowAuth(false); // Close auth modal if open
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setUserEmail(null);
        }
      }
    );
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const startConfigurator = () => {
    setConfigStep(1);
    setTimeout(() => {
      const configuratorElement = document.getElementById('configurator');
      if (configuratorElement) {
        configuratorElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const toggleAuth = () => {
    // If already authenticated, sign out
    if (isAuthenticated) {
      handleSignOut();
    } else {
      setShowAuth(!showAuth);
    }
  };
  
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      } else {
        console.log('User signed out successfully');
        setIsAuthenticated(false);
        setUserEmail(null);
      }
    } catch (err) {
      console.error('Unexpected error during sign out:', err);
    }
  };

  useEffect(() => {
    // Check URL parameters
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') === 'softcover') {
      setShowSoftcoverDemo(true);
    }

    if (params.get('auth') === '1') {
      setShowAuth(true);
    }

    // Configuration from URL parameter
    if (params.get('configure') === '1') {
      startConfigurator();
    }

    // Log that the app is rendering
    console.log('App rendering, auth state:', showAuth);
  }, []);

  if (showSoftcoverDemo) {
    return <SoftcoverDemo />;
  }

  // If auth should be shown, show the auth form in a modal
  if (showAuth) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <Navbar 
          startConfigurator={startConfigurator} 
          toggleAuth={toggleAuth}
          isAuthenticated={isAuthenticated}
          userEmail={userEmail}
        />
        <div className="flex-1 flex items-center justify-center p-6 mt-32">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 bg-green-600 dark:bg-green-700 text-white">
                <h2 className="text-2xl font-bold text-center">{t('auth.signin_title')}</h2>
              </div>
              <AuthForm />
              <div className="p-4 text-center">
                <button 
                  onClick={toggleAuth}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                >
                  {t('auth.back')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main app
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Navbar 
        startConfigurator={startConfigurator} 
        toggleAuth={toggleAuth}
        isAuthenticated={isAuthenticated}
        userEmail={userEmail}
      />
      
      {isAuthenticated && (
        <div className="bg-green-100 dark:bg-green-900 p-2 text-center">
          <p className="text-green-800 dark:text-green-200">
            {t('auth.welcome', { email: userEmail })}
            <button 
              onClick={handleSignOut}
              className="ml-4 text-sm underline text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100"
            >
              {t('auth.signout')}
            </button>
          </p>
        </div>
      )}
      
      <Hero startConfigurator={startConfigurator} />
      <AboutUsSection />
      <BindingOptions startConfigurator={startConfigurator} />
      
      {/* Only show configurator when configStep is not null */}
      {configStep !== null && (
        <div id="configurator">
          <Configurator step={configStep} setStep={setConfigStep} />
        </div>
      )}
      
      <ProcessSteps />
      <ShippingOptions />
      <AdditionalServices />
      <Reviews />
      <Blog />
      <FAQ />
      <Footer />
      {isDevelopment && <LanguageDebug />}
    </div>
  );
}

// Hauptkomponente mit Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/blog/binding-thesis" element={<BindingThesis />} />
        <Route path="/blog/sustainable-printing" element={<SustainablePrinting />} />
        <Route path="/blog/modern-printing" element={<ModernPrinting />} />
      </Routes>
    </Router>
  );
}

// Development mode flag
const isDevelopment = import.meta.env.DEV; 

export default App;
