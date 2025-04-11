import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Check, Upload, Book, FileText, Truck, Info, Printer, ShoppingCart, Trash2, FileCheck, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useDropzone } from 'react-dropzone';

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

interface ConfiguratorProps {
  step: number | null;
  setStep: React.Dispatch<React.SetStateAction<number | null>>;
}

// Binding types
type BindingType = 
  | 'softcover-classic'
  | 'softcover-cardboard'
  | 'softcover-embossing'
  | 'spiral-plastic'
  | 'spiral-metal'
  | 'hardcover';

// Paper format
type Format = 'A4' | 'A5';

// Paper weight
type PaperWeight = '80g' | '120g';

// Printing option
type PrintingOption = 'single-sided' | 'double-sided';

// Logo options
type LogoOption = 'heidelberg' | 'mannheim' | 'custom' | null;

// Cover color options (based on binding type)
type CoverColor = 'black' | 'blue' | 'red' | 'white' | 'green' | 'grey' | 'burgundy';

// Embossing color options (for hardcover)
type EmbossingColor = 'gold' | 'silver' | 'white' | 'copper' | 'black' | null;

// Metal corners options (for hardcover)
type MetalCorners = 'gold' | 'silver' | null;

// Main configuration type
interface ThesisConfig {
  bindingType: BindingType | null;
  format: Format;
  paperWeight: PaperWeight;
  printingOption: PrintingOption;
  pageCount: number;
  xxlUpgrade: boolean;
  coverColor: CoverColor | null;
  embossingColor: EmbossingColor;
  embossingText: string | null;
  metalCorners: MetalCorners;
  logoOption: LogoOption;
  customLogo: File | null;
  coverFile: File | null;
  thesisFile: File | null;
  totalPrice: number;
}

// Binding option definition
interface BindingOption {
  id: BindingType;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  formats: Format[];
  paperWeights: PaperWeight[];
  printingOptions: PrintingOption[];
  coverColors: CoverColor[];
  embossingColors?: EmbossingColor[];
  supportsXXL: boolean;
  pageLimits: {
    '80g': {
      'single-sided': number;
      'double-sided': number;
    };
    '120g': {
      'single-sided': number;
      'double-sided': number;
    };
  };
  xxlThreshold?: {
    '80g': {
      'single-sided': number;
      'double-sided': number;
    };
    '120g': {
      'single-sided': number;
      'double-sided': number;
    };
  };
  supportsMetalCorners?: boolean;
  supportsEmbossingText?: boolean;
}

const Configurator: React.FC<ConfiguratorProps> = ({ step, setStep }) => {
  const { t } = useLanguage();
  const { darkMode } = useTheme();
  
  // Steps
  const TOTAL_STEPS = 6;
  
  // Initial state
  const initialConfig: ThesisConfig = {
    bindingType: null,
    format: 'A4',
    paperWeight: '80g',
    printingOption: 'single-sided',
    pageCount: 0,
    xxlUpgrade: false,
    coverColor: null,
    embossingColor: null,
    embossingText: null,
    metalCorners: null,
    logoOption: null,
    customLogo: null,
    coverFile: null,
    thesisFile: null,
    totalPrice: 0
  };
  
  // State
  const [config, setConfig] = useState<ThesisConfig>(initialConfig);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Define binding options with all specifications
  const bindingOptions: BindingOption[] = [
    {
      id: 'softcover-classic',
      name: 'Softcover Classic',
      description: 'Transparent foil front, colored cardboard back',
      basePrice: 10,
      image: 'https://i.postimg.cc/q7QsYQrP/Apr-5-2025-08-41-31-PM.png',
      formats: ['A4', 'A5'],
      paperWeights: ['80g', '120g'],
      printingOptions: ['single-sided', 'double-sided'],
      coverColors: ['black', 'blue', 'red', 'white', 'green', 'grey', 'burgundy'],
      supportsXXL: true,
      pageLimits: {
        '80g': {
          'single-sided': 400,
          'double-sided': 800
        },
        '120g': {
          'single-sided': 350,
          'double-sided': 700
        }
      },
      xxlThreshold: {
        '80g': {
          'single-sided': 190,
          'double-sided': 380
        },
        '120g': {
          'single-sided': 150,
          'double-sided': 300
        }
      }
    },
    {
      id: 'softcover-cardboard',
      name: 'Softcover Cardboard',
      description: 'Printed cardboard cover',
      basePrice: 15,
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      formats: ['A4', 'A5'],
      paperWeights: ['80g', '120g'],
      printingOptions: ['single-sided', 'double-sided'],
      coverColors: ['white', 'grey', 'green', 'blue', 'red', 'burgundy'],
      supportsXXL: false,
      pageLimits: {
        '80g': {
          'single-sided': 190,
          'double-sided': 380
        },
        '120g': {
          'single-sided': 150,
          'double-sided': 300
        }
      }
    },
    {
      id: 'softcover-embossing',
      name: 'Softcover with Embossing',
      description: 'Embossed synthetic leather',
      basePrice: 20,
      image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      formats: ['A4', 'A5'],
      paperWeights: ['80g', '120g'],
      printingOptions: ['single-sided', 'double-sided'],
      coverColors: ['white', 'grey', 'green', 'blue', 'red', 'burgundy'],
      supportsXXL: false,
      pageLimits: {
        '80g': {
          'single-sided': 190,
          'double-sided': 380
        },
        '120g': {
          'single-sided': 150,
          'double-sided': 300
        }
      }
    },
    {
      id: 'spiral-plastic',
      name: 'Plastic Spiral Binding',
      description: 'Transparent front, cardboard back',
      basePrice: 6.90,
      image: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      formats: ['A4', 'A5'],
      paperWeights: ['80g', '120g'],
      printingOptions: ['single-sided', 'double-sided'],
      coverColors: ['black', 'blue', 'red', 'white', 'green', 'grey', 'burgundy'],
      supportsXXL: true,
      pageLimits: {
        '80g': {
          'single-sided': 400,
          'double-sided': 800
        },
        '120g': {
          'single-sided': 350,
          'double-sided': 700
        }
      },
      xxlThreshold: {
        '80g': {
          'single-sided': 190,
          'double-sided': 380
        },
        '120g': {
          'single-sided': 150,
          'double-sided': 300
        }
      }
    },
    {
      id: 'spiral-metal',
      name: 'Metal Spiral Binding',
      description: 'Transparent front, cardboard back',
      basePrice: 6.90,
      image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      formats: ['A4', 'A5'],
      paperWeights: ['80g', '120g'],
      printingOptions: ['single-sided', 'double-sided'],
      coverColors: ['black', 'blue', 'red', 'white', 'green', 'grey', 'burgundy'],
      supportsXXL: false,
      pageLimits: {
        '80g': {
          'single-sided': 190,
          'double-sided': 380
        },
        '120g': {
          'single-sided': 150,
          'double-sided': 300
        }
      }
    },
    {
      id: 'hardcover',
      name: 'Hardcover Binding',
      description: 'Premium hardcover with embossing options',
      basePrice: 25,
      image: 'https://i.postimg.cc/TPnfVhjN/Chat-GPT-Image-Apr-4-2025-12-30-24-AM.png',
      formats: ['A4', 'A5'],
      paperWeights: ['80g', '120g'],
      printingOptions: ['single-sided', 'double-sided'],
      coverColors: ['black', 'blue', 'red'],
      embossingColors: ['gold', 'silver', 'white', 'copper', 'black'],
      supportsXXL: false,
      supportsMetalCorners: true,
      supportsEmbossingText: true,
      pageLimits: {
        '80g': {
          'single-sided': 400,
          'double-sided': 800
        },
        '120g': {
          'single-sided': 450,
          'double-sided': 900
        }
      }
    }
  ];

  // University logos
  const universityLogos = [
    { id: 'heidelberg', name: 'Universität Heidelberg', image: 'https://i.postimg.cc/x8dHzG22/Ruprecht-Karls-Universita-t-Heidelberg-Logo.png' },
    { id: 'mannheim', name: 'Universität Mannheim', image: 'https://i.postimg.cc/VvBCp7Wn/download-2.png' }
  ];

  // Effect to calculate total price whenever configuration changes
  useEffect(() => {
    calculateTotalPrice();
  }, [config.bindingType, config.format, config.paperWeight, config.printingOption, config.pageCount, config.xxlUpgrade, config.metalCorners, config.embossingText]);

  // Calculate the total price based on current configuration
  const calculateTotalPrice = () => {
    if (!config.bindingType) return;

    const selectedBinding = bindingOptions.find(b => b.id === config.bindingType);
    if (!selectedBinding) return;

    let totalPrice = selectedBinding.basePrice;

    // Add page printing cost
    const printingCostPerPage = config.paperWeight === '80g' ? 0.05 : 0.08;
    const pagesToCharge = config.printingOption === 'double-sided' 
      ? Math.ceil(config.pageCount / 2) 
      : config.pageCount;
    
    totalPrice += pagesToCharge * printingCostPerPage;

    // Add XXL upgrade if applicable
    if (config.xxlUpgrade && selectedBinding.supportsXXL) {
      totalPrice += 10;
    }

    // Add metal corners price if applicable
    if (config.metalCorners && selectedBinding.supportsMetalCorners) {
      totalPrice += 6;
    }

    // Add embossing text price if applicable
    if (config.embossingText && selectedBinding.supportsEmbossingText) {
      totalPrice += 15;
    }

    setConfig(prev => ({ ...prev, totalPrice }));
  };

  // Function to handle file upload dropzone
  const onDrop = (acceptedFiles: File[], fileType: 'coverFile' | 'thesisFile' | 'customLogo') => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      simulateUploadProgress();
      setConfig(prev => ({ ...prev, [fileType]: file }));
    }
  };

  // Dropzone for thesis file
  const { getRootProps: getThesisRootProps, getInputProps: getThesisInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'thesisFile'),
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1
  });

  // Dropzone for cover file
  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'coverFile'),
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1
  });

  // Dropzone for custom logo 
  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'customLogo'),
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
    },
    maxFiles: 1
  });

  // Simulate file upload progress
  const simulateUploadProgress = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  // Handle removing a file
  const handleRemoveFile = (fileType: 'coverFile' | 'thesisFile' | 'customLogo') => {
    setConfig(prev => ({ ...prev, [fileType]: null }));
  };

  // Navigation functions
  const goToNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Get current binding option details
  const getCurrentBindingDetails = () => {
    if (!config.bindingType) return null;
    return bindingOptions.find(option => option.id === config.bindingType);
  };

  // Step validation
  const validateCurrentStep = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    switch (currentStep) {
      case 1: // Binding Type
        if (!config.bindingType) {
          newErrors.bindingType = "Please select a binding type";
        }
        break;
      case 2: // Configurable Features
        if (!config.format) {
          newErrors.format = "Please select a format";
        }
        if (!config.paperWeight) {
          newErrors.paperWeight = "Please select a paper weight";
        }
        if (!config.printingOption) {
          newErrors.printingOption = "Please select a printing option";
        }
        if (!config.pageCount || config.pageCount <= 0) {
          newErrors.pageCount = "Please enter a valid page count";
        } else {
          // Check if page count exceeds limits
          const binding = getCurrentBindingDetails();
          if (binding) {
            const limit = binding.pageLimits[config.paperWeight][config.printingOption];
            if (config.pageCount > limit) {
              newErrors.pageCount = `Maximum page count for this configuration is ${limit}`;
            }
          }
        }
        if (!config.coverColor) {
          newErrors.coverColor = "Please select a cover color";
        }
        break;
      case 3: // Logo Selection
        if (config.logoOption === "custom" && !config.customLogo) {
          newErrors.customLogo = "Please upload a custom logo or select a predefined one";
        }
        break;
      case 4: // File Upload
        if (!config.coverFile) {
          newErrors.coverFile = "Please upload a cover file";
        }
        if (!config.thesisFile) {
          newErrors.thesisFile = "Please upload your thesis document";
        }
        break;
      case 5: // Preview
        // No validation needed for preview
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if XXL upgrade is needed based on page count
  const checkIfXXLNeeded = () => {
    const binding = getCurrentBindingDetails();
    if (binding?.supportsXXL && binding.xxlThreshold) {
      const threshold = binding.xxlThreshold[config.paperWeight][config.printingOption];
      const shouldBeXXL = config.pageCount >= threshold;
      
      if (shouldBeXXL !== config.xxlUpgrade) {
        setConfig(prev => ({ ...prev, xxlUpgrade: shouldBeXXL }));
      }
    }
  };

  // Effect to check XXL upgrade when page count changes
  useEffect(() => {
    checkIfXXLNeeded();
  }, [config.pageCount, config.paperWeight, config.printingOption, config.bindingType]);

  // Reset the configurator
  const resetConfigurator = () => {
    setConfig(initialConfig);
    setCurrentStep(1);
    setErrors({});
    setShowPreview(false);
  };

  // Render steps (will implement these next)
  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step 1: Select Binding Type
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Choose the type of binding that best suits your thesis
        </p>
        
        {errors.bindingType && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{errors.bindingType}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bindingOptions.map((option) => (
            <div 
              key={option.id}
              onClick={() => {
                setConfig(prev => ({
                  ...prev,
                  bindingType: option.id,
                  coverColor: option.coverColors[0] || null,
                  embossingColor: option.embossingColors?.[0] || null,
                  metalCorners: null,
                  embossingText: null
                }));
                setErrors(prev => ({ ...prev, bindingType: '' }));
              }}
              className={`
                border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md
                ${config.bindingType === option.id 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-gray-200 dark:border-gray-700'}
              `}
            >
              <div className="h-36 mb-4 overflow-hidden rounded-md">
                <img 
                  src={option.image} 
                  alt={option.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-lg font-medium mb-1">{option.name}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{option.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  €{option.basePrice.toFixed(2)}
                </span>
                {config.bindingType === option.id && (
                  <span className="bg-blue-500 text-white p-1 rounded-full">
                    <Check size={16} />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {config.bindingType && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="text-lg font-medium mb-2">Selected: {bindingOptions.find(o => o.id === config.bindingType)?.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {bindingOptions.find(o => o.id === config.bindingType)?.description}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderStep2 = () => {
    // Get current binding option
    const binding = getCurrentBindingDetails();
    if (!binding) return <p>Please go back and select a binding type</p>;
    
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step 2: Configure Features
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Customize the features for your {binding.name}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Format selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Format
            </label>
            {errors.format && <p className="text-red-500 text-xs">{errors.format}</p>}
            <div className="flex space-x-4">
              {binding.formats.map(format => (
                <button
                  key={format}
                  type="button"
                  onClick={() => {
                    setConfig(prev => ({ ...prev, format }));
                    setErrors(prev => ({ ...prev, format: '' }));
                  }}
                  className={`
                    px-4 py-2 rounded-md border ${
                      config.format === format
                        ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'border-gray-300 dark:border-gray-600'
                    }
                  `}
                >
                  DIN {format}
                </button>
              ))}
            </div>
          </div>
          
          {/* Paper weight selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Paper Weight
            </label>
            {errors.paperWeight && <p className="text-red-500 text-xs">{errors.paperWeight}</p>}
            <div className="flex space-x-4">
              {binding.paperWeights.map(weight => (
                <button
                  key={weight}
                  type="button"
                  onClick={() => {
                    setConfig(prev => ({ ...prev, paperWeight: weight }));
                    setErrors(prev => ({ ...prev, paperWeight: '' }));
                  }}
                  className={`
                    px-4 py-2 rounded-md border ${
                      config.paperWeight === weight
                        ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'border-gray-300 dark:border-gray-600'
                    }
                  `}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>
          
          {/* Printing option */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Printing
            </label>
            {errors.printingOption && <p className="text-red-500 text-xs">{errors.printingOption}</p>}
            <div className="flex space-x-4">
              {binding.printingOptions.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setConfig(prev => ({ ...prev, printingOption: option }));
                    setErrors(prev => ({ ...prev, printingOption: '' }));
                  }}
                  className={`
                    px-4 py-2 rounded-md border ${
                      config.printingOption === option
                        ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                        : 'border-gray-300 dark:border-gray-600'
                    }
                  `}
                >
                  {option === 'single-sided' ? 'Single-sided' : 'Double-sided'}
                </button>
              ))}
            </div>
          </div>
          
          {/* Page count */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Page Count
            </label>
            {errors.pageCount && <p className="text-red-500 text-xs">{errors.pageCount}</p>}
            <input
              type="number"
              min="1"
              max={binding.pageLimits[config.paperWeight][config.printingOption]}
              value={config.pageCount || ''}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setConfig(prev => ({ ...prev, pageCount: isNaN(value) ? 0 : value }));
                setErrors(prev => ({ ...prev, pageCount: '' }));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Maximum: {binding.pageLimits[config.paperWeight][config.printingOption]} pages
            </p>
          </div>
          
          {/* Cover color */}
          <div className="space-y-2 col-span-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Cover Color
            </label>
            {errors.coverColor && <p className="text-red-500 text-xs">{errors.coverColor}</p>}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {binding.coverColors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setConfig(prev => ({ ...prev, coverColor: color }));
                    setErrors(prev => ({ ...prev, coverColor: '' }));
                  }}
                  className={`
                    h-12 rounded-md border-2 transition-all
                    ${config.coverColor === color ? 'ring-2 ring-blue-500 border-white' : 'border-transparent'}
                  `}
                  style={{
                    backgroundColor: 
                      color === 'black' ? '#000000' :
                      color === 'blue' ? '#1a365d' :
                      color === 'red' ? '#b91c1c' :
                      color === 'white' ? '#ffffff' :
                      color === 'green' ? '#166534' :
                      color === 'grey' ? '#4b5563' :
                      color === 'burgundy' ? '#7f1d1d' : '#ffffff'
                  }}
                >
                  {config.coverColor === color && (
                    <span className={`flex justify-center items-center h-full ${color === 'white' ? 'text-black' : 'text-white'}`}>
                      <Check size={18} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* XXL upgrade (if supported) */}
          {binding.supportsXXL && (
            <div className="col-span-full">
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="xxl-upgrade"
                  checked={config.xxlUpgrade}
                  onChange={(e) => {
                    setConfig(prev => ({ ...prev, xxlUpgrade: e.target.checked }));
                  }}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  disabled={config.pageCount >= (binding.xxlThreshold?.[config.paperWeight][config.printingOption] || 0)}
                />
                <div>
                  <label htmlFor="xxl-upgrade" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    XXL Upgrade (+€10)
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Required for {binding.xxlThreshold?.[config.paperWeight][config.printingOption]}+ pages with your configuration
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Hardcover specific options */}
          {config.bindingType === 'hardcover' && (
            <>
              {/* Embossing options */}
              <div className="space-y-2 col-span-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Embossing Color
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {binding.embossingColors?.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => {
                        setConfig(prev => ({ ...prev, embossingColor: color }));
                      }}
                      className={`
                        h-12 rounded-md border-2 transition-all
                        ${config.embossingColor === color ? 'ring-2 ring-blue-500 border-white' : 'border-transparent'}
                      `}
                      style={{
                        backgroundColor: 
                          color === 'gold' ? '#d4af37' :
                          color === 'silver' ? '#c0c0c0' :
                          color === 'copper' ? '#b87333' :
                          color === 'white' ? '#ffffff' :
                          color === 'black' ? '#000000' : '#ffffff'
                      }}
                    >
                      {config.embossingColor === color && (
                        <span className={`flex justify-center items-center h-full ${color === 'white' ? 'text-black' : 'text-white'}`}>
                          <Check size={18} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Spine embossing text */}
              <div className="space-y-2 col-span-full">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="spine-embossing"
                    checked={config.embossingText !== null}
                    onChange={(e) => {
                      setConfig(prev => ({ 
                        ...prev, 
                        embossingText: e.target.checked ? '' : null
                      }));
                    }}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="spine-embossing" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Book Spine Embossing (+€15)
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Vertical text on book spine (max 52 characters)
                    </p>
                  </div>
                </div>
                
                {config.embossingText !== null && (
                  <input
                    type="text"
                    value={config.embossingText}
                    maxLength={52}
                    onChange={(e) => {
                      setConfig(prev => ({ ...prev, embossingText: e.target.value }));
                    }}
                    placeholder="Name, Title, Date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                )}
              </div>
              
              {/* Metal corners */}
              <div className="space-y-2 col-span-full">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="metal-corners"
                    checked={config.metalCorners !== null}
                    onChange={(e) => {
                      setConfig(prev => ({ 
                        ...prev, 
                        metalCorners: e.target.checked ? 'gold' : null
                      }));
                    }}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="metal-corners" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Metal Corners (+€6)
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Elegant metal corners for your hardcover thesis
                    </p>
                  </div>
                </div>
                
                {config.metalCorners && (
                  <div className="flex space-x-4 mt-2">
                    <button
                      type="button"
                      onClick={() => setConfig(prev => ({ ...prev, metalCorners: 'gold' }))}
                      className={`
                        px-4 py-2 rounded-md border ${
                          config.metalCorners === 'gold'
                            ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                            : 'border-gray-300'
                        }
                      `}
                    >
                      Gold
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfig(prev => ({ ...prev, metalCorners: 'silver' }))}
                      className={`
                        px-4 py-2 rounded-md border ${
                          config.metalCorners === 'silver'
                            ? 'bg-gray-100 border-gray-500 text-gray-700'
                            : 'border-gray-300'
                        }
                      `}
                    >
                      Silver
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* Summary of selected features */}
        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-lg font-medium mb-2">Configuration Summary</h4>
          <ul className="space-y-2 text-sm">
            <li><strong>Binding:</strong> {binding.name}</li>
            <li><strong>Format:</strong> DIN {config.format}</li>
            <li><strong>Paper Weight:</strong> {config.paperWeight}</li>
            <li><strong>Printing:</strong> {config.printingOption === 'single-sided' ? 'Single-sided' : 'Double-sided'}</li>
            <li><strong>Pages:</strong> {config.pageCount || 0}</li>
            <li><strong>Cover Color:</strong> {config.coverColor ? config.coverColor.charAt(0).toUpperCase() + config.coverColor.slice(1) : 'Not selected'}</li>
            
            {config.bindingType === 'hardcover' && config.embossingColor && (
              <li><strong>Embossing Color:</strong> {config.embossingColor.charAt(0).toUpperCase() + config.embossingColor.slice(1)}</li>
            )}
            
            {config.bindingType === 'hardcover' && config.embossingText !== null && (
              <li><strong>Spine Embossing:</strong> {config.embossingText ? 'Yes' : 'No text entered'}</li>
            )}
            
            {config.bindingType === 'hardcover' && config.metalCorners && (
              <li><strong>Metal Corners:</strong> {config.metalCorners.charAt(0).toUpperCase() + config.metalCorners.slice(1)}</li>
            )}
            
            {binding.supportsXXL && (
              <li><strong>XXL Upgrade:</strong> {config.xxlUpgrade ? 'Yes (+€10)' : 'No'}</li>
            )}
            
            <li className="font-bold text-blue-600 dark:text-blue-400">
              <strong>Estimated Price:</strong> €{config.totalPrice.toFixed(2)}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step 3: Logo Selection
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Choose a university logo or upload your own custom logo
        </p>
        
        {errors.customLogo && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{errors.customLogo}</p>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {universityLogos.map(logo => (
              <div 
                key={logo.id}
                onClick={() => {
                  setConfig(prev => ({
                    ...prev,
                    logoOption: logo.id as LogoOption,
                    customLogo: null
                  }));
                }}
                className={`
                  border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md
                  ${config.logoOption === logo.id 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                    : 'border-gray-200 dark:border-gray-700'}
                `}
              >
                <div className="h-24 mb-4 flex items-center justify-center">
                  <img 
                    src={logo.image} 
                    alt={logo.name} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h4 className="text-center font-medium">{logo.name}</h4>
              </div>
            ))}
            
            <div 
              onClick={() => {
                setConfig(prev => ({
                  ...prev,
                  logoOption: 'custom',
                }));
              }}
              className={`
                border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md
                ${config.logoOption === 'custom' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-gray-200 dark:border-gray-700'}
              `}
            >
              <div className="h-24 mb-4 flex items-center justify-center">
                <Upload size={48} className="text-gray-400" />
              </div>
              <h4 className="text-center font-medium">Upload Custom Logo</h4>
            </div>
          </div>
          
          {/* Custom logo upload */}
          {config.logoOption === 'custom' && (
            <div className="mt-4">
              <div
                {...getLogoRootProps()}
                className="border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col items-center justify-center text-center"
              >
                <input {...getLogoInputProps()} />
                
                {config.customLogo ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={URL.createObjectURL(config.customLogo)} 
                      alt="Custom logo" 
                      className="max-h-32 max-w-full object-contain mb-2"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {config.customLogo.name} ({formatFileSize(config.customLogo.size)})
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile('customLogo');
                      }}
                      className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center text-sm"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={36} className="text-gray-400 mb-2" />
                    <p className="text-sm font-medium">
                      Drag & drop your logo here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      PNG, JPG, JPEG, SVG up to 2MB
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Selected logo display */}
        {config.logoOption && config.logoOption !== 'custom' && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center space-x-4">
            <div className="h-16 w-16 flex items-center justify-center bg-white rounded-md">
              <img 
                src={universityLogos.find(l => l.id === config.logoOption)?.image} 
                alt={universityLogos.find(l => l.id === config.logoOption)?.name} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-lg font-medium">
                Selected: {universityLogos.find(l => l.id === config.logoOption)?.name}
              </h4>
              <button
                type="button"
                onClick={() => setConfig(prev => ({ ...prev, logoOption: null }))}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Change selection
              </button>
            </div>
          </div>
        )}
        
        {config.logoOption === 'custom' && config.customLogo && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center space-x-4">
            <div className="h-16 w-16 flex items-center justify-center bg-white rounded-md">
              <img 
                src={URL.createObjectURL(config.customLogo)} 
                alt="Custom logo" 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-lg font-medium">Custom Logo Selected</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {config.customLogo.name} ({formatFileSize(config.customLogo.size)})
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderStep4 = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step 4: Upload Files
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Upload your thesis document and cover design (PDF format)
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cover PDF Upload */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium">Cover Design</h4>
            {errors.coverFile && <p className="text-red-500 text-xs">{errors.coverFile}</p>}
            
            <div
              {...getCoverRootProps()}
              className="border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col items-center justify-center text-center h-40"
            >
              <input {...getCoverInputProps()} />
              
              {config.coverFile ? (
                <div className="flex flex-col items-center">
                  <FileCheck size={36} className="text-green-500 mb-2" />
                  <p className="text-sm font-medium">
                    {config.coverFile.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(config.coverFile.size)}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile('coverFile');
                    }}
                    className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center text-sm"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={36} className="text-gray-400 mb-2" />
                  <p className="text-sm font-medium">
                    Drag & drop your cover PDF, or click to browse
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PDF files only, max 10MB
                  </p>
                </>
              )}
            </div>
          </div>
          
          {/* Thesis PDF Upload */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium">Thesis Document</h4>
            {errors.thesisFile && <p className="text-red-500 text-xs">{errors.thesisFile}</p>}
            
            <div
              {...getThesisRootProps()}
              className="border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 flex flex-col items-center justify-center text-center h-40"
            >
              <input {...getThesisInputProps()} />
              
              {config.thesisFile ? (
                <div className="flex flex-col items-center">
                  <FileCheck size={36} className="text-green-500 mb-2" />
                  <p className="text-sm font-medium">
                    {config.thesisFile.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(config.thesisFile.size)}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile('thesisFile');
                    }}
                    className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center text-sm"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={36} className="text-gray-400 mb-2" />
                  <p className="text-sm font-medium">
                    Drag & drop your thesis PDF, or click to browse
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PDF files only, max 30MB
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Upload progress */}
        {isUploading && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">Uploading files...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* File upload instructions and notes */}
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h4 className="text-lg font-medium mb-2 flex items-center">
            <Info size={16} className="mr-2 text-yellow-500" />
            Important Notes
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Files must be in PDF format</li>
            <li>Cover design should match your selected binding type</li>
            <li>Page count in your document should match the number you specified</li>
            <li>For double-sided printing, ensure your document is properly formatted</li>
            <li>Maximum file size: Cover PDF (10MB), Thesis PDF (30MB)</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderStep5 = () => {
    const binding = getCurrentBindingDetails();
    if (!binding) return <p>Please go back and select a binding type</p>;
    
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step 5: Preview Your Order
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Review your thesis binding configuration before proceeding to checkout
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Product preview */}
          <div className="md:col-span-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-4">Product Preview</h4>
            
            <div className="aspect-w-3 aspect-h-4 bg-white dark:bg-gray-700 rounded-md shadow overflow-hidden mb-4">
              <div className="flex items-center justify-center h-full">
                <img 
                  src={binding.image} 
                  alt={binding.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
            
            <h5 className="font-medium">{binding.name}</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{binding.description}</p>
          </div>
          
          {/* Configuration details */}
          <div className="md:col-span-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-4">Order Details</h4>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Binding Type</h5>
                  <p>{binding.name}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Format</h5>
                  <p>DIN {config.format}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Paper Weight</h5>
                  <p>{config.paperWeight}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Printing</h5>
                  <p>{config.printingOption === 'single-sided' ? 'Single-sided' : 'Double-sided'}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Pages</h5>
                  <p>{config.pageCount}</p>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Cover Color</h5>
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2"
                      style={{
                        backgroundColor: 
                          config.coverColor === 'black' ? '#000000' :
                          config.coverColor === 'blue' ? '#1a365d' :
                          config.coverColor === 'red' ? '#b91c1c' :
                          config.coverColor === 'white' ? '#ffffff' :
                          config.coverColor === 'green' ? '#166534' :
                          config.coverColor === 'grey' ? '#4b5563' :
                          config.coverColor === 'burgundy' ? '#7f1d1d' : '#ffffff',
                        border: config.coverColor === 'white' ? '1px solid #e2e8f0' : 'none'
                      }}
                    ></div>
                    <p>{config.coverColor ? config.coverColor.charAt(0).toUpperCase() + config.coverColor.slice(1) : 'Not selected'}</p>
                  </div>
                </div>
              </div>
              
              {binding.supportsXXL && (
                <div>
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">XXL Upgrade</h5>
                  <p>{config.xxlUpgrade ? 'Yes (+€10)' : 'No'}</p>
                </div>
              )}
              
              {config.bindingType === 'hardcover' && (
                <>
                  {config.embossingColor && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Embossing Color</h5>
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2"
                          style={{
                            backgroundColor: 
                              config.embossingColor === 'gold' ? '#d4af37' :
                              config.embossingColor === 'silver' ? '#c0c0c0' :
                              config.embossingColor === 'copper' ? '#b87333' :
                              config.embossingColor === 'white' ? '#ffffff' :
                              config.embossingColor === 'black' ? '#000000' : '#ffffff',
                            border: config.embossingColor === 'white' ? '1px solid #e2e8f0' : 'none'
                          }}
                        ></div>
                        <p>{config.embossingColor.charAt(0).toUpperCase() + config.embossingColor.slice(1)}</p>
                      </div>
                    </div>
                  )}
                  
                  {config.embossingText !== null && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Spine Embossing</h5>
                      <p>{config.embossingText || 'No text entered'}</p>
                    </div>
                  )}
                  
                  {config.metalCorners && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Metal Corners</h5>
                      <p>{config.metalCorners.charAt(0).toUpperCase() + config.metalCorners.slice(1)}</p>
                    </div>
                  )}
                </>
              )}
              
              <div>
                <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">University Logo</h5>
                {config.logoOption === 'custom' && config.customLogo ? (
                  <div className="flex items-center">
                    <img 
                      src={URL.createObjectURL(config.customLogo)} 
                      alt="Custom logo" 
                      className="h-6 mr-2"
                    />
                    <p>Custom Logo</p>
                  </div>
                ) : config.logoOption ? (
                  <div className="flex items-center">
                    <img 
                      src={universityLogos.find(l => l.id === config.logoOption)?.image} 
                      alt={universityLogos.find(l => l.id === config.logoOption)?.name} 
                      className="h-6 mr-2"
                    />
                    <p>{universityLogos.find(l => l.id === config.logoOption)?.name}</p>
                  </div>
                ) : (
                  <p>None</p>
                )}
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400">Uploaded Files</h5>
                <p>
                  {config.coverFile ? (
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <FileCheck size={16} className="mr-1" />
                      Cover file uploaded
                    </span>
                  ) : (
                    <span className="text-red-500">Cover file missing</span>
                  )}
                </p>
                <p className="mt-1">
                  {config.thesisFile ? (
                    <span className="flex items-center text-green-600 dark:text-green-400">
                      <FileCheck size={16} className="mr-1" />
                      Thesis file uploaded
                    </span>
                  ) : (
                    <span className="text-red-500">Thesis file missing</span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Price:</span>
                <span className="text-blue-600 dark:text-blue-400">€{config.totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Includes base price, printing costs, and all selected upgrades
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep6 = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Step 6: Checkout
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Complete your order by proceeding to payment
        </p>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Check size={24} className="text-green-500" />
            </div>
            <div className="ml-3">
              <h4 className="text-lg font-medium text-green-800 dark:text-green-300">Order Ready!</h4>
              <p className="text-green-700 dark:text-green-400 mt-1">
                Your thesis binding configuration is complete and ready for checkout
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
            <h4 className="text-lg font-medium">Order Summary</h4>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
                <span className="font-medium">Binding Type:</span>
                <span>{getCurrentBindingDetails()?.name}</span>
              </div>
              
              <div className="flex justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
                <span className="font-medium">Format:</span>
                <span>DIN {config.format}</span>
              </div>
              
              <div className="flex justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
                <span className="font-medium">Paper:</span>
                <span>{config.paperWeight}, {config.printingOption === 'single-sided' ? 'Single-sided' : 'Double-sided'}</span>
              </div>
              
              <div className="flex justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
                <span className="font-medium">Pages:</span>
                <span>{config.pageCount}</span>
              </div>
              
              {config.xxlUpgrade && (
                <div className="flex justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
                  <span className="font-medium">XXL Upgrade:</span>
                  <span>+€10.00</span>
                </div>
              )}
              
              {config.embossingText !== null && (
                <div className="flex justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
                  <span className="font-medium">Spine Embossing:</span>
                  <span>+€15.00</span>
                </div>
              )}
              
              {config.metalCorners && (
                <div className="flex justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
                  <span className="font-medium">Metal Corners:</span>
                  <span>+€6.00</span>
                </div>
              )}
              
              <div className="flex justify-between py-4 text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600 dark:text-blue-400">€{config.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              type="button"
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium flex items-center justify-center"
              onClick={() => {
                // Payment integration would go here in a real implementation
                alert('Payment integration will be added in the future. Your order has been saved.');
                resetConfigurator();
                setStep(null);
              }}
            >
              <ShoppingCart size={20} className="mr-2" />
              Proceed to Payment
            </button>
            
            <button 
              type="button"
              className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md font-medium"
              onClick={resetConfigurator}
            >
              Start Over
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-400">
          <p className="flex items-center">
            <Truck size={16} className="mr-2" />
            <span>Estimated production time: 1-2 business days</span>
          </p>
          <p className="flex items-center mt-2">
            <Info size={16} className="mr-2" />
            <span>Payment processing is secure and encrypted</span>
          </p>
        </div>
      </div>
    );
  };

  // Main render function
  return (
    <section id="configurator" className="py-10 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center dark:text-white">
          Thesis Binding Configurator
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          Configure your thesis binding in a few simple steps
        </p>
        
        {/* Steps bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
            {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold 
                    ${currentStep > index + 1 ? 'bg-green-500' : currentStep === index + 1 ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  {currentStep > index + 1 ? <Check size={18} /> : index + 1}
                </div>
                <span className="text-xs mt-2 text-center">
                  {index === 0 && "Binding Type"}
                  {index === 1 && "Features"}
                  {index === 2 && "Logo"}
                  {index === 3 && "Files"}
                  {index === 4 && "Preview"}
                  {index === 5 && "Checkout"}
                </span>
              </div>
            ))}
          </div>
          <div className="relative w-full max-w-4xl h-1 bg-gray-200 mt-5 mx-auto">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-600"
              style={{ width: `${((currentStep - 1) / (TOTAL_STEPS - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Content area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 max-w-4xl mx-auto">
          <div className="min-h-[400px]">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && renderStep6()}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={goToPreviousStep}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <ArrowLeft size={16} className="mr-2" />
              Previous
            </button>
            
            {currentStep < TOTAL_STEPS && (
              <button
                onClick={goToNextStep}
                className="flex items-center px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Next
                <ArrowRight size={16} className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Configurator;