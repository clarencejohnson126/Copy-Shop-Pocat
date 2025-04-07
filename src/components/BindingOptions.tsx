import React, { useState, useRef } from 'react';
import { Check, ChevronDown, ChevronUp, Upload, File, FileText, Image, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface BindingOptionsProps {
  startConfigurator: () => void;
}

type SoftcoverVariant = 'klassisch' | 'karton' | 'prägung';
type SpiralVariant = 'plastik' | 'metall';

interface SoftcoverOption {
  id: SoftcoverVariant;
  title: string;
  description: string;
  features: string[];
  price: string;
  color: string;
}

interface SpiralOption {
  id: SpiralVariant;
  title: string;
  description: string;
  features: string[];
  price: string;
  color: string;
  image: string;
}

const BindingOptions: React.FC<BindingOptionsProps> = ({ startConfigurator }) => {
  const { t } = useLanguage();
  const { darkMode } = useTheme();
  const [showSoftcoverOptions, setShowSoftcoverOptions] = useState(false);
  const [selectedSoftcoverVariant, setSelectedSoftcoverVariant] = useState<SoftcoverVariant>('klassisch');
  const [showSpiralOptions, setShowSpiralOptions] = useState(false);
  const [selectedSpiralVariant, setSelectedSpiralVariant] = useState<SpiralVariant>('metall');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Softcover variant options
  const softcoverOptions: Record<SoftcoverVariant, SoftcoverOption> = {
    klassisch: {
      id: 'klassisch',
      title: 'Softcover Klassisch',
      description: 'Die traditionelle Variante mit flexiblem Einband für alltägliche Anwendungen.',
      features: [
        t('binding.feature.affordable'),
        'Schnelle Produktion innerhalb von 1-2 Stunden',
        'Ideal für Seminararbeiten und Berichte',
        t('binding.feature.production'),
      ],
      price: `${t('price.starting_from')} ${t('price.currency')}12,90`,
      color: 'bg-green-600'
    },
    karton: {
      id: 'karton',
      title: 'Softcover Karton',
      description: 'Robuste Kartonvariante für mehr Stabilität und Langlebigkeit.',
      features: [
        'Verstärkter Kartoneinband für besseren Schutz',
        'Geeignet für häufig verwendete Dokumente',
        'Attraktive matte oder glänzende Oberfläche',
        t('binding.feature.colors.various'),
      ],
      price: `${t('price.starting_from')} ${t('price.currency')}14,90`,
      color: 'bg-amber-600'
    },
    prägung: {
      id: 'prägung',
      title: 'Softcover mit Prägung',
      description: 'Elegante Variante mit professioneller Prägung für einen hochwertigen Look.',
      features: [
        'Stilvolle Gold-, Silber- oder Blindprägung',
        'Personalisierbar mit Titel, Name oder Logo',
        'Professionelles Erscheinungsbild',
        t('binding.feature.thesis'),
      ],
      price: `${t('price.starting_from')} ${t('price.currency')}16,90`,
      color: 'bg-blue-600'
    }
  };
  
  // Spiral binding variant options
  const spiralOptions: Record<SpiralVariant, SpiralOption> = {
    metall: {
      id: 'metall',
      title: 'Metall Spiralbindung',
      description: 'Stabile Metallspirale für Dokumente, die komplett aufklappbar sein sollen.',
      features: [
        t('binding.feature.turning'),
        t('binding.feature.foldable'),
        t('binding.feature.durable'),
        t('binding.feature.presentations'),
      ],
      price: `${t('price.starting_from')} ${t('price.currency')}9,90`,
      color: 'bg-gray-500',
      image: 'https://i.postimg.cc/5NzCh2nb/B20-600x600.png'
    },
    plastik: {
      id: 'plastik',
      title: 'Plastik Spiralbindung',
      description: 'Leichte und kostengünstige Spiralbindung für einfache Dokumente.',
      features: [
        t('binding.feature.cheapest'),
        t('binding.feature.fast'),
        t('binding.feature.colors.various'),
        t('binding.feature.documentation'),
      ],
      price: `${t('price.starting_from')} ${t('price.currency')}7,90`,
      color: 'bg-purple-500',
      image: 'https://i.postimg.cc/5N2BDVDt/comb-bound-book-02-blak-600x600.png'
    }
  };
  
  const bindings = [
    {
      id: 'hardcover',
      name: t('binding.hardcover.name'),
      description: t('binding.hardcover.desc'),
      price: `${t('price.starting_from')} ${t('price.currency')}19,90`,
      image: 'https://i.postimg.cc/KYxBrh7F/B6-768x768.png',
      features: [
        t('binding.feature.premium'),
        t('binding.feature.elegant'),
        t('binding.feature.thesis'),
        t('binding.feature.colors'),
      ],
      popular: true,
    },
    {
      id: 'softcover',
      name: t('binding.softcover.name'),
      description: t('binding.softcover.desc'),
      price: softcoverOptions[selectedSoftcoverVariant].price,
      image: 'https://i.postimg.cc/fTP9F0xH/B10-2048x2048.png',
      features: softcoverOptions[selectedSoftcoverVariant].features,
      popular: false,
    },
    {
      id: 'spiralbindung',
      name: 'Spiralbindung',
      description: 'Flexible Bindung mit Spiral-Mechanismus für einfaches Aufklappen.',
      price: spiralOptions[selectedSpiralVariant].price,
      image: spiralOptions[selectedSpiralVariant].image,
      features: spiralOptions[selectedSpiralVariant].features,
      popular: false,
    },
    {
      id: 'individualdruck',
      name: 'Individueller Druck',
      description: 'Eigene Designs hochladen und nach Ihren Wünschen drucken lassen.',
      price: `${t('price.starting_from')} ${t('price.currency')}14,90`,
      image: 'https://i.postimg.cc/TPnfVhjN/Chat-GPT-Image-Apr-4-2025-12-30-24-AM.png',
      features: [
        'Vielfältige Formate (PDF, JPG, PNG, Word)',
        'Individuelles Design und Layout',
        'Kundenspezifische Bindungsoptionen',
        'Express-Service verfügbar',
      ],
      popular: false,
    },
  ];

  // Handlers for selecting variants
  const handleSoftcoverVariantSelect = (variant: SoftcoverVariant) => {
    setSelectedSoftcoverVariant(variant);
    setShowSoftcoverOptions(false);
  };
  
  const handleSpiralVariantSelect = (variant: SpiralVariant) => {
    setSelectedSpiralVariant(variant);
    setShowSpiralOptions(false);
  };

  // File upload handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setUploadedFile(file);
      simulateUpload();
    }
  };

  // Simulate file upload progress
  const simulateUpload = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Reset file upload
  const resetFileUpload = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Get file icon based on file type
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <File className="text-red-500" size={24} />;
      case 'doc':
      case 'docx':
        return <FileText className="text-blue-500" size={24} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Image className="text-green-500" size={24} />;
      default:
        return <File className="text-gray-500" size={24} />;
    }
  };

  return (
    <section id="binding-options" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{t('binding.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('binding.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bindings.map((binding) => (
            <div 
              key={binding.id} 
              className={`bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden relative ${binding.popular ? 'border-2 border-green-500' : ''}`}
            >
              {binding.popular && (
                <div className="absolute top-4 right-4 bg-green-500 dark:bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                  {t('binding.popular')}
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 dark:text-white">{binding.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4" style={{minHeight: '60px'}}>{binding.description}</p>
                
                <div className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">{binding.price}</div>
                
                {/* Special action buttons based on binding type */}
                {binding.id === 'softcover' && (
                  <div className="relative mb-4">
                    <button 
                      onClick={() => setShowSoftcoverOptions(!showSoftcoverOptions)}
                      className="w-full flex justify-between items-center bg-gray-100 dark:bg-gray-600 rounded px-4 py-2"
                    >
                      <span className="font-medium dark:text-white">{softcoverOptions[selectedSoftcoverVariant].title}</span>
                      {showSoftcoverOptions ? 
                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-300" /> : 
                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                      }
                    </button>
                    
                    {showSoftcoverOptions && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 rounded-md shadow-lg z-20 overflow-hidden">
                        {Object.values(softcoverOptions).map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handleSoftcoverVariantSelect(option.id)}
                            className={`w-full text-left px-4 py-2 ${selectedSoftcoverVariant === option.id ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                          >
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full ${option.color} mr-2`}></div>
                              <span className="font-medium dark:text-white">{option.title}</span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{option.price}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {binding.id === 'spiralbindung' && (
                  <div className="relative mb-4">
                    <button 
                      onClick={() => setShowSpiralOptions(!showSpiralOptions)}
                      className="w-full flex justify-between items-center bg-gray-100 dark:bg-gray-600 rounded px-4 py-2"
                    >
                      <span className="font-medium dark:text-white">{spiralOptions[selectedSpiralVariant].title}</span>
                      {showSpiralOptions ? 
                        <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-300" /> : 
                        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                      }
                    </button>
                    
                    {showSpiralOptions && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 rounded-md shadow-lg z-20 overflow-hidden">
                        {Object.values(spiralOptions).map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handleSpiralVariantSelect(option.id)}
                            className={`w-full text-left px-4 py-2 ${selectedSpiralVariant === option.id ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                          >
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full ${option.color} mr-2`}></div>
                              <span className="font-medium dark:text-white">{option.title}</span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{option.price}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* File upload for individualdruck */}
                {binding.id === 'individualdruck' && (
                  <div className="mb-4">
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    
                    {!uploadedFile ? (
                      <button
                        onClick={triggerFileInput}
                        className="w-full flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded px-4 py-2"
                      >
                        <Upload className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-300" />
                        <span className="font-medium dark:text-white">{t('binding.upload')}</span>
                      </button>
                    ) : (
                      <div className="w-full bg-gray-100 dark:bg-gray-600 rounded px-4 py-2">
                        {/* Progress bar */}
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-500 rounded-full mb-2">
                          <div 
                            className="h-full bg-green-500 rounded-full" 
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        
                        {/* File info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {getFileIcon(uploadedFile.name)}
                            <span className="ml-2 font-medium truncate max-w-[150px] dark:text-white">
                              {uploadedFile.name}
                            </span>
                          </div>
                          
                          <button 
                            onClick={resetFileUpload}
                            className="text-gray-500 dark:text-gray-300"
                          >
                            <RefreshCw size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <button 
                  onClick={startConfigurator}
                  className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 text-white py-2 px-4 rounded shadow-md"
                >
                  Auswählen
                </button>
              </div>
              
              {/* Product image */}
              <div className="h-64 overflow-hidden border-t border-gray-100 dark:border-gray-600">
                <img 
                  src={binding.image} 
                  alt={binding.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              
              {/* Features list */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6">
                <h4 className="font-bold mb-3 dark:text-white">{t('binding.features')}</h4>
                <ul className="space-y-2">
                  {binding.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BindingOptions;