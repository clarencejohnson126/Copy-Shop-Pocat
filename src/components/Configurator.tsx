import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Check, Upload, Book, FileText, Truck, AlertCircle, Info, Palette, RefreshCw, Leaf, Download, FileCheck, Trash2, PlusCircle, Printer, ShoppingCart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import jsPDF from 'jspdf';
// @ts-ignore
import { useDropzone } from 'react-dropzone';

// Development mode flag - we'll use this instead of process.env
const isDevelopment = true;

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

// Types for component state
type BindingOption = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

type PaperOption = {
  id: string;
  name: string;
  description: string;
  pricePerPage: number;
  maxPages: number;
};

type PrintOption = {
  id: string;
  name: string;
  description: string;
};

type CoverOption = {
  id: string;
  title: string;
  name: string;
  description: string;
  logo?: string;
  image?: string;
  price: number;
};

type ShippingOption = {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryTime: string;
};

interface Extra {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ColorOption {
  id: string;
  name: string;
  color: string;
}

interface EmbossingColor {
  id: string;
  name: string;
  color: string;
}

const Configurator: React.FC<ConfiguratorProps> = ({ step, setStep }) => {
  const { t } = useLanguage();
  const { darkMode } = useTheme();
  
  // Binding options
  const bindingOptions: BindingOption[] = [
    {
      id: 'hardcover',
      name: t('binding.hardcover.name'),
      description: t('binding.hardcover.desc'),
      price: 25.00,
      image: 'https://i.postimg.cc/q7QsYQrP/Apr-5-2025-08-41-31-PM.png',
    },
    {
      id: 'softcover-klassisch',
      name: 'Softcover Klassisch',
      description: 'Die traditionelle Variante mit flexiblem Einband für alltägliche Anwendungen.',
      price: 12.90,
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'softcover-karton',
      name: 'Softcover Karton',
      description: 'Robuste Kartonvariante für mehr Stabilität und Langlebigkeit.',
      price: 14.90,
      image: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'softcover-prägung',
      name: 'Softcover mit Prägung',
      description: 'Elegante Variante mit professioneller Prägung für einen hochwertigen Look.',
      price: 16.90,
      image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'spiralbindung-metall',
      name: 'Metall Spiralbindung',
      description: 'Stabile Metallspirale für Dokumente, die komplett aufklappbar sein sollen.',
      price: 9.90,
      image: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'spiralbindung-plastik',
      name: 'Plastik Spiralbindung',
      description: 'Leichte und kostengünstige Spiralbindung für einfache Dokumente.',
      price: 7.90,
      image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'individualdruck',
      name: 'Individueller Druck',
      description: 'Eigene Designs hochladen und nach Ihren Wünschen drucken lassen.',
      price: 14.90,
      image: 'https://i.postimg.cc/TPnfVhjN/Chat-GPT-Image-Apr-4-2025-12-30-24-AM.png',
    },
  ];

  // Paper options
  const paperOptions: PaperOption[] = [
    {
      id: 'standard',
      name: '80g/m² Standardpapier',
      description: 'Leichtes Papier, ideal für umfangreiche Arbeiten',
      pricePerPage: 0.20,
      maxPages: 400,
    },
    {
      id: 'premium',
      name: '120g/m² Premiumpapier',
      description: 'Hochwertiges Papier für eine edle Optik',
      pricePerPage: 0.30,
      maxPages: 450,
    },
  ];

  // Print options
  const printOptions: PrintOption[] = [
    {
      id: 'single',
      name: 'Einseitig',
      description: 'Druck nur auf einer Seite pro Blatt',
    },
    {
      id: 'double',
      name: 'Doppelseitig',
      description: 'Druck auf beiden Seiten pro Blatt',
    },
  ];

  // Cover options (university logos)
  const coverOptions: CoverOption[] = [
    {
      id: 'uni-heidelberg',
      title: 'Universität Heidelberg',
      name: 'Universität Heidelberg',
      description: 'Logo der Universität Heidelberg',
      logo: 'https://i.postimg.cc/x8dHzG22/Ruprecht-Karls-Universita-t-Heidelberg-Logo.png',
      image: 'https://i.postimg.cc/x8dHzG22/Ruprecht-Karls-Universita-t-Heidelberg-Logo.png',
      price: 0,
    },
    {
      id: 'dhbw',
      title: 'DHBW',
      name: 'DHBW',
      description: 'Logo der Dualen Hochschule Baden-Württemberg',
      logo: 'https://i.postimg.cc/jS8jWVjL/download.png',
      image: 'https://i.postimg.cc/jS8jWVjL/download.png',
      price: 0,
    },
    {
      id: 'ph-heidelberg',
      title: 'PH Heidelberg',
      name: 'PH Heidelberg',
      description: 'Logo der Philosophischen Fakultät Heidelberg',
      logo: 'https://i.postimg.cc/SRs4bRWd/download-1.png',
      image: 'https://i.postimg.cc/SRs4bRWd/download-1.png',
      price: 0,
    },
    {
      id: 'hs-mannheim',
      title: 'Hochschule Mannheim',
      name: 'Hochschule Mannheim',
      description: 'Logo der Hochschule Mannheim',
      logo: 'https://i.postimg.cc/VvBCp7Wn/download-2.png',
      image: 'https://i.postimg.cc/VvBCp7Wn/download-2.png',
      price: 0,
    },
  ];

  // Shipping options
  const shippingOptions: ShippingOption[] = [
    {
      id: 'pickup',
      name: 'Selbstabholung',
      description: 'In unserer Filiale in Heidelberg',
      price: 0,
      deliveryTime: 'Gleicher Tag möglich',
    },
    {
      id: 'standard',
      name: 'Standardversand',
      description: 'Deutschlandweiter Versand per DHL',
      price: 4.90,
      deliveryTime: '1-3 Werktage',
    },
    {
      id: 'express',
      name: 'Express-Versand',
      description: 'Für dringende Abgabetermine',
      price: 12.90,
      deliveryTime: 'Nächster Werktag',
    },
    {
      id: 'international',
      name: 'Internationaler Versand',
      description: 'Weltweiter Versand',
      price: 19.90,
      deliveryTime: '3-7 Werktage',
    },
  ];

  // Cover colors for hardcover
  const coverColors: ColorOption[] = [
    { id: 'black', name: 'Schwarz', color: 'bg-black' },
    { id: 'blue', name: 'Blau', color: 'bg-blue-800' },
    { id: 'red', name: 'Rot', color: 'bg-red-700' },
  ];

  // Embossing colors
  const embossingColors: EmbossingColor[] = [
    { id: 'gold', name: 'Gold', color: 'bg-yellow-500' },
    { id: 'silver', name: 'Silber', color: 'bg-gray-300' },
    { id: 'white', name: 'Weiß', color: 'bg-white' },
    { id: 'copper', name: 'Kupfer', color: 'bg-orange-700' },
    { id: 'black', name: 'Schwarz', color: 'bg-black' },
  ];

  // State for user selections
  const [selectedBinding, setSelectedBinding] = useState<string | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<string>('standard');
  const [selectedPrintOption, setSelectedPrintOption] = useState<string>('double');
  const [selectedCoverOption, setSelectedCoverOption] = useState<string>('uni-heidelberg');
  const [coverNote, setCoverNote] = useState<string>('');
  const [selectedShipping, setSelectedShipping] = useState<string>('pickup');
  const [pageCount, setPageCount] = useState<number>(80);
  const [copies, setCopies] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [priceDebug, setPriceDebug] = useState<any>({});
  const [spineText, setSpineText] = useState<string>('');
  const [embossingColor, setEmbossingColor] = useState<string>('gold');
  const [coverColor, setCoverColor] = useState<string>('black');
  const [bookCorners, setBookCorners] = useState<boolean>(false);
  const [bookCornerColor, setBookCornerColor] = useState<string>('gold');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('PoCat-123456');
  
  // Hardcover specific options
  const [selectedCoverColor, setSelectedCoverColor] = useState<string>('black');
  const [selectedEmbossingColor, setSelectedEmbossingColor] = useState<string>('gold');
  const [spineEmbossing, setSpineEmbossing] = useState<boolean>(false);
  
  // File upload state variables
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for binding subtype modal/dropdown
  const [showBindingModal, setShowBindingModal] = useState(false);
  const [bindingCategory, setBindingCategory] = useState<'softcover' | 'spiralbindung' | null>(null);

  // Add state for order confirmation
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Create a canvas reference for binding preview
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Binding visualization functions
  const drawSoftcover = (ctx: CanvasRenderingContext2D) => {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const bookWidth = canvasWidth * 0.7;
    const bookHeight = canvasHeight * 0.8;
    const bookX = (canvasWidth - bookWidth) / 2;
    const bookY = (canvasHeight - bookHeight) / 2;
    
    // Determine which softcover variant is selected
    const isSoftcoverKlassisch = selectedBinding === 'softcover-klassisch';
    const isSoftcoverKarton = selectedBinding === 'softcover-karton';
    const isSoftcoverPrägung = selectedBinding === 'softcover-prägung';
    
    // Draw cover with different colors based on variant
    if (isSoftcoverKlassisch) {
      ctx.fillStyle = '#e5e7eb'; // Light gray for klassisch
    } else if (isSoftcoverKarton) {
      ctx.fillStyle = '#d97706'; // Amber for karton
    } else if (isSoftcoverPrägung) {
      ctx.fillStyle = '#4b5563'; // Dark gray for prägung
    } else {
      ctx.fillStyle = '#e5e7eb'; // Default light gray
    }
    
    // Draw main cover
    ctx.fillRect(bookX, bookY, bookWidth, bookHeight);
    
    // Draw shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(bookX + bookWidth, bookY + 3, 3, bookHeight - 3);
    ctx.fillRect(bookX + 3, bookY + bookHeight, bookWidth - 3, 3);
    
    // For prägung variant, add embossed effect
    if (isSoftcoverPrägung) {
      ctx.fillStyle = '#d1d5db';
      ctx.fillRect(bookX + 20, bookY + 20, bookWidth - 40, 30);
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Embossed Title', bookX + bookWidth/2, bookY + 40);
    }
    
    // Draw university logo if selected
    const logo = coverOptions.find(opt => opt.id === selectedCoverOption);
    if (logo) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillRect(bookX + bookWidth/2 - 40, bookY + 30, 80, 30);
      ctx.fillStyle = '#333';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(logo.name, bookX + bookWidth/2, bookY + 50);
    }
  };

  const drawSpiralBinding = (ctx: CanvasRenderingContext2D) => {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const bookWidth = canvasWidth * 0.7;
    const bookHeight = canvasHeight * 0.8;
    const bookX = (canvasWidth - bookWidth) / 2;
    const bookY = (canvasHeight - bookHeight) / 2;
    
    // Determine which spiral variant is selected
    const isMetall = selectedBinding === 'spiralbindung-metall';
    
    // Draw pages
    ctx.fillStyle = '#f9fafb'; // Page color
    ctx.fillRect(bookX, bookY, bookWidth, bookHeight);
    
    // Draw spiral binding
    const spiralColor = isMetall ? '#d1d5db' : '#000000';
    const spiralCount = Math.floor(bookHeight / 10);
    
    ctx.fillStyle = spiralColor;
    for (let i = 0; i < spiralCount; i++) {
      const y = bookY + i * 10 + 5;
      ctx.beginPath();
      ctx.arc(bookX, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw transparent cover
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(bookX, bookY, bookWidth, bookHeight);
    
    // Draw university logo if selected
    const logo = coverOptions.find(opt => opt.id === selectedCoverOption);
    if (logo) {
      ctx.fillStyle = 'rgba(200, 200, 200, 0.7)';
      ctx.fillRect(bookX + bookWidth/2 - 40, bookY + 30, 80, 30);
      ctx.fillStyle = '#333';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(logo.name, bookX + bookWidth/2, bookY + 50);
    }
  };

  const drawCustomPrint = (ctx: CanvasRenderingContext2D) => {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const documentWidth = canvasWidth * 0.7;
    const documentHeight = canvasHeight * 0.8;
    const documentX = (canvasWidth - documentWidth) / 2;
    const documentY = (canvasHeight - documentHeight) / 2;
    
    // Draw document background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(documentX, documentY, documentWidth, documentHeight);
    
    // Draw border
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.strokeRect(documentX, documentY, documentWidth, documentHeight);
    
    // Draw custom design placeholder
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(documentX + 20, documentY + 20, documentWidth - 40, documentHeight - 40);
    
    // Draw custom design text
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Custom Design', documentX + documentWidth/2, documentY + documentHeight/2);
    
    if (uploadedFile) {
      ctx.fillStyle = '#10b981';
      ctx.font = '12px Arial';
      ctx.fillText(`File: ${uploadedFile.name}`, documentX + documentWidth/2, documentY + documentHeight/2 + 30);
    } else {
      ctx.fillStyle = '#ef4444';
      ctx.font = '12px Arial';
      ctx.fillText('No file uploaded', documentX + documentWidth/2, documentY + documentHeight/2 + 30);
    }
  };
  
  // File Upload Logic
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
        }
        setUploadProgress(progress);
      }, 300);
    }
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false
  });
  
  // Checkout Handler
  const handleCheckout = () => {
    // First validate the form
    if (!validateCheckout()) {
      return;
    }
    
    // Simulate API call
    setOrderError(null);
    
    // Simulate loading
    setTimeout(() => {
      // Generate random order number
      const randomOrderNum = Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(`PoCat-${randomOrderNum}`);
      setOrderConfirmed(true); // Set order confirmed state
      setStep(5);
    }, 1500);
  };
  
  // Reset form for new order
  const handleNewOrder = () => {
    setStep(1);
    setSelectedBinding(null);
    setSelectedPaper('standard');
    setSelectedPrintOption('double');
    setSelectedCoverOption('uni-heidelberg');
    setCoverNote('');
    setSelectedShipping('pickup');
    setPageCount(80);
    setCopies(1);
    setUploadedFile(null);
    setUploadProgress(0);
    setOrderError(null);
  };

  // Update the file handling to include validation
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type - PDF is preferred but we'll allow common document formats
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a supported file format (PDF, DOC, DOCX, JPG, PNG).');
        return;
      }
      
      // Check file size (100MB max)
      if (file.size > 100 * 1024 * 1024) {
        alert('File size exceeds 100MB limit.');
        return;
      }
      
      setUploadedFile(file);
      simulateUploadProgress();
    }
  };

  // Add function to save configuration to localStorage
  const saveConfiguration = () => {
    const config = {
      selectedBinding,
      pageCount,
      selectedPaper,
      selectedPrintOption,
      selectedCoverOption,
      coverNote,
      selectedShipping,
      copies,
      selectedCoverColor,
      selectedEmbossingColor,
      spineEmbossing,
      spineText,
      bookCorners,
      bookCornerColor,
    };
    localStorage.setItem('savedConfig', JSON.stringify(config));
    
    // Provide feedback to the user
    alert('Your configuration has been saved. You can return to it later.');
  };

  // Load saved configuration on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('savedConfig');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        if (config.selectedBinding) setSelectedBinding(config.selectedBinding);
        if (config.pageCount) setPageCount(config.pageCount);
        if (config.selectedPaper) setSelectedPaper(config.selectedPaper);
        if (config.selectedPrintOption) setSelectedPrintOption(config.selectedPrintOption);
        if (config.selectedCoverOption) setSelectedCoverOption(config.selectedCoverOption);
        if (config.coverNote) setCoverNote(config.coverNote);
        if (config.selectedShipping) setSelectedShipping(config.selectedShipping);
        if (config.copies) setCopies(config.copies);
        if (config.selectedCoverColor) setSelectedCoverColor(config.selectedCoverColor);
        if (config.selectedEmbossingColor) setSelectedEmbossingColor(config.selectedEmbossingColor);
        if (config.spineEmbossing !== undefined) setSpineEmbossing(config.spineEmbossing);
        if (config.spineText) setSpineText(config.spineText);
        if (config.bookCorners !== undefined) setBookCorners(config.bookCorners);
        if (config.bookCornersColor) setBookCornerColor(config.bookCornersColor);
      } catch (e) {
        console.error('Error loading saved configuration:', e);
      }
    }
  }, []);

  // Handle checkout button click (remove duplicate handleCheckout function)
  const validateCheckout = () => {
    if (!selectedBinding) {
      alert('Please select a binding type.');
      return false;
    }
    if (pageCount <= 0) {
      alert('Please enter a valid page count.');
      return false;
    }
    if (!selectedPaper) {
      alert('Please select a paper type.');
      return false;
    }
    if (!selectedPrintOption) {
      alert('Please select a print option.');
      return false;
    }
    if (!selectedCoverOption) {
      alert('Please select a cover option.');
      return false;
    }
    if (!selectedShipping) {
      alert('Please select a shipping option.');
      return false;
    }
    if (copies < 1) {
      alert('Please select at least one copy.');
      return false;
    }
    if (!uploadedFile) {
      alert('Please upload a file.');
      return false;
    }
    if (selectedBinding === 'hardcover') {
      if (spineEmbossing && !spineText) {
        alert('Please enter spine text for embossing.');
        return false;
      }
    }
    return true;
  };

  const simulateUploadProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prevProgress => {
        const newProgress = prevProgress + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileText className="text-red-500" size={20} />;
      case 'doc':
      case 'docx':
        return <FileText className="text-blue-500" size={20} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileText className="text-green-500" size={20} />;
      default:
        return <FileText className="text-gray-500" size={20} />;
    }
  };

  // Handle binding selection with price update
  const handleBindingSelection = (bindingId: string) => {
    setSelectedBinding(bindingId);
  };

  // Calculate total price
  useEffect(() => {
    if (step === null) return;
    
    // If no binding is selected, price remains at 0
    if (selectedBinding === null) {
      setTotalPrice(0.00);
      setPriceDebug({
        paperPrice: 0,
        bindingPrice: 0,
        shippingPrice: 0,
        pricePerUnit: 0,
        effectivePages: 0,
        discountedCopies: 0,
        totalBeforeRounding: 0,
        extras: 0
      });
      return;
    }
    
    // Find the selected binding option
    const binding = bindingOptions.find(b => b.id === selectedBinding);
    let bindingPrice = binding ? binding.price : 0;
    
    // Calculate hardcover extras
    let extrasPrice = 0;
    if (selectedBinding === 'hardcover') {
      // Add spine embossing price if selected
      if (spineEmbossing) {
        extrasPrice += 15.0;
      }
      
      // Add book corners price if selected
      if (bookCorners) {
        extrasPrice += 6.0;
      }
    }
    
    // In step 1, only show the binding price + extras
    if (step === 1) {
      const totalWithExtras = bindingPrice + extrasPrice;
      setTotalPrice(totalWithExtras);
      setPriceDebug({
        paperPrice: 0,
        bindingPrice: bindingPrice,
        shippingPrice: 0,
        pricePerUnit: totalWithExtras,
        effectivePages: 0,
        discountedCopies: 1,
        totalBeforeRounding: totalWithExtras,
        extras: extrasPrice
      });
      return;
    }
    
    // For steps 2-4, calculate the full price
    // Calculate actual pages based on print option (single or double-sided)
    const effectivePages = selectedPrintOption === 'double' 
      ? Math.ceil(pageCount / 2) 
      : pageCount;
    
    // Paper price based on page count and paper type
    const paper = paperOptions.find(p => p.id === selectedPaper);
    const paperPrice = paper ? paper.pricePerPage * effectivePages : 0;
    
    // Shipping price (included for hardcover)
    const shipping = shippingOptions.find(s => s.id === selectedShipping);
    const shippingPrice = selectedBinding === 'hardcover' ? 0 : (shipping ? shipping.price : 0);
    
    // Calculate price per unit
    const pricePerUnit = paperPrice + bindingPrice + extrasPrice;
    
    // Apply volume discount (4=3 rule: buy 4, pay for 3)
    let discountedCopies = copies;
    if (copies >= 4) {
      // For every complete set of 4, charge only for 3
      const sets = Math.floor(copies / 4);
      const remainder = copies % 4;
      discountedCopies = (sets * 3) + remainder;
    }
    
    // Calculate total price: (price per unit × discounted copies) + shipping
    let price = (pricePerUnit * discountedCopies) + shippingPrice;
    
    // Round to 2 decimal places
    price = Math.round(price * 100) / 100;
    
    // Update debug state for transparency
    setPriceDebug({
      paperPrice,
      bindingPrice,
      shippingPrice,
      pricePerUnit,
      effectivePages,
      discountedCopies,
      totalBeforeRounding: price,
      extras: extrasPrice
    });
    
    // Log calculations for debugging
    console.log('Price calculation:', {
      step,
      pageCount,
      effectivePages,
      selectedPaper,
      paperPricePerPage: paper?.pricePerPage,
      paperPrice,
      selectedBinding,
      bindingPrice,
      selectedShipping,
      shippingPrice,
      copies,
      discountedCopies,
      pricePerUnit,
      extras: extrasPrice,
      totalPrice: price
    });
    
    setTotalPrice(price);
  }, [
    step, 
    selectedBinding, 
    pageCount, 
    selectedPaper, 
    selectedPrintOption, 
    selectedShipping, 
    copies, 
    bindingOptions, 
    paperOptions, 
    shippingOptions,
    spineEmbossing,
    bookCorners
  ]);

  // Draw binding preview on canvas
  const drawPreview = useCallback(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!selectedBinding) {
      // No binding selected yet
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#999';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Select a binding to preview', canvas.width / 2, canvas.height / 2);
      return;
    }

    if (selectedBinding === 'hardcover') {
      drawHardcover(ctx);
    } else if (selectedBinding.startsWith('softcover-')) {
      drawSoftcover(ctx);
    } else if (selectedBinding.startsWith('spiralbindung-')) {
      drawSpiralBinding(ctx);
    } else if (selectedBinding === 'individualdruck') {
      drawCustomPrint(ctx);
    }
  }, [selectedBinding, selectedCoverColor, selectedEmbossingColor, spineEmbossing, spineText, bookCorners, bookCornerColor]);

  const drawHardcover = (ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    
    // Draw book cover - simulate a hardcover book
    const coverWidth = 200;
    const coverHeight = 280;
    const cornerRadius = 5;
    
    // Background color
    let coverColorValue = '#000000';
    if (selectedCoverColor === 'blue') coverColorValue = '#1e3a8a';
    if (selectedCoverColor === 'red') coverColorValue = '#991b1b';
    
    // Embossing color
    let embossingColorValue = '#eab308'; // gold
    if (selectedEmbossingColor === 'silver') embossingColorValue = '#94a3b8';
    if (selectedEmbossingColor === 'white') embossingColorValue = '#ffffff';
    if (selectedEmbossingColor === 'copper') embossingColorValue = '#bf8970';
    if (selectedEmbossingColor === 'black') embossingColorValue = '#000000';
  
    const bookCornerColorValue = bookCornerColor === 'gold' ? '#eab308' : '#d1d5db';

    // Draw book dimensions
    const x = 50;
    const y = 50;
    
    // Draw the book cover
    ctx.fillStyle = coverColorValue;
    ctx.beginPath();
    ctx.moveTo(x + cornerRadius, y);
    ctx.lineTo(x + coverWidth - cornerRadius, y);
    ctx.quadraticCurveTo(x + coverWidth, y, x + coverWidth, y + cornerRadius);
    ctx.lineTo(x + coverWidth, y + coverHeight - cornerRadius);
    ctx.quadraticCurveTo(x + coverWidth, y + coverHeight, x + coverWidth - cornerRadius, y + coverHeight);
    ctx.lineTo(x + cornerRadius, y + coverHeight);
    ctx.quadraticCurveTo(x, y + coverHeight, x, y + coverHeight - cornerRadius);
    ctx.lineTo(x, y + cornerRadius);
    ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
    ctx.closePath();
    ctx.fill();
    
    // Draw book spine (side view)
    ctx.fillStyle = coverColorValue;
    ctx.fillRect(x - 15, y, 15, coverHeight);
    
    // Draw embossing if enabled
    if (spineEmbossing && spineText) {
      ctx.fillStyle = embossingColorValue;
      ctx.font = '12px Arial';
      ctx.save();
      ctx.translate(x - 10, y + coverHeight - 50);
      ctx.rotate(-Math.PI/2);
      ctx.fillText(spineText, 0, 0);
      ctx.restore();
    }
    
    // Draw title embossing (always shown)
    ctx.fillStyle = embossingColorValue;
    ctx.font = 'bold 18px Arial';
    ctx.fillText('BACHELOR THESIS', x + 45, y + 60);
    
    // Draw subtitle embossing
    ctx.font = '14px Arial';
    ctx.fillText('Universität Heidelberg', x + 65, y + 85);
    
    // Draw book corners if enabled
    if (bookCorners) {
      ctx.fillStyle = bookCornerColorValue;
      // Top left corner
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 15, y);
      ctx.lineTo(x, y + 15);
      ctx.fill();
      
      // Top right corner
      ctx.beginPath();
      ctx.moveTo(x + coverWidth, y);
      ctx.lineTo(x + coverWidth - 15, y);
      ctx.lineTo(x + coverWidth, y + 15);
      ctx.fill();
      
      // Bottom left corner
      ctx.beginPath();
      ctx.moveTo(x, y + coverHeight);
      ctx.lineTo(x + 15, y + coverHeight);
      ctx.lineTo(x, y + coverHeight - 15);
      ctx.fill();
      
      // Bottom right corner
      ctx.beginPath();
      ctx.moveTo(x + coverWidth, y + coverHeight);
      ctx.lineTo(x + coverWidth - 15, y + coverHeight);
      ctx.lineTo(x + coverWidth, y + coverHeight - 15);
      ctx.fill();
    }
  };
  
  // Update the preview when binding options change
  useEffect(() => {
    drawPreview();
  }, [drawPreview]);

  // Rendering the binding options section
  const renderBindingOptions = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bindingOptions.map((option) => {
          // Group binding options by main category
          const isMainCategory = option.id === 'hardcover' || 
                                option.id === 'softcover-klassisch' || 
                                option.id === 'spiralbindung-metall' || 
                                option.id === 'individualdruck';
          
          // For softcover subcategories
          const isSoftcoverVariant = option.id.startsWith('softcover-');
          
          // For spiralbindung subcategories
          const isSpiralVariant = option.id.startsWith('spiralbindung-');
          
          // Only show main categories in the initial grid
          if (isMainCategory) {
            return (
              <div 
                key={option.id}
                className={`border rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg ${selectedBinding === option.id ? 'border-green-500 ring-2 ring-green-500' : 'border-gray-200'}`}
                onClick={() => {
                  if (option.id === 'softcover-klassisch') {
                    // Show softcover variants modal/dropdown
                    setShowBindingModal(true);
                    setBindingCategory('softcover');
                  } else if (option.id === 'spiralbindung-metall') {
                    // Show spiralbindung variants modal/dropdown
                    setShowBindingModal(true);
                    setBindingCategory('spiralbindung');
                  } else {
                    handleBindingSelect(option.id);
                  }
                }}
              >
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${option.image})` }}></div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {option.id === 'softcover-klassisch' ? 'Softcover' : 
                     option.id === 'spiralbindung-metall' ? 'Spiralbindung' : 
                     option.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{option.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="font-semibold">{t('price.currency')}{option.price.toFixed(2)}</span>
                    {selectedBinding === option.id && <Check className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  // Render binding variants modal/dropdown
  const renderBindingVariantsModal = () => {
    if (!showBindingModal) return null;
    
    const filteredOptions = bindingOptions.filter(option => {
      if (bindingCategory === 'softcover') {
        return option.id.startsWith('softcover-');
      } else if (bindingCategory === 'spiralbindung') {
        return option.id.startsWith('spiralbindung-');
      }
      return false;
    });
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
          <div className="p-4 border-b">
            <h3 className="text-xl font-semibold">
              {bindingCategory === 'softcover' ? 'Softcover Varianten' : 'Spiralbindung Varianten'}
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOptions.map((option) => (
                <div 
                  key={option.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${selectedBinding === option.id ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  onClick={() => {
                    handleBindingSelect(option.id);
                    setShowBindingModal(false);
                  }}
                >
                  <h4 className="font-medium">{option.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="font-semibold">{t('price.currency')}{option.price.toFixed(2)}</span>
                    {selectedBinding === option.id && <Check className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-t flex justify-end">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setShowBindingModal(false)}
            >
              {t('button.cancel')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Handler for binding selection
  const handleBindingSelect = (id: string) => {
    setSelectedBinding(id);
    
    // Reset or update related options if needed
    if (id === 'hardcover') {
      // Specific hardcover options
    } else if (id.startsWith('softcover-')) {
      // Specific softcover options
    } else if (id.startsWith('spiralbindung-')) {
      // Specific spiralbindung options
    } else if (id === 'individualdruck') {
      // Specific individualdruck options
    }
  };

  // Step 1: Select binding option and color
  const renderStep1 = () => {
    return (
      <div>
        <h3 className="text-xl font-bold mb-4">{t('configurator.binding.title')}</h3>
        
        {renderBindingOptions()}
        {renderBindingVariantsModal()}
        
        {selectedBinding && renderPreviewSection()}
        
        {/* Hardcover Options - Only show when hardcover is selected */}
        {selectedBinding === 'hardcover' && (
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h4 className="text-xl font-bold mb-6">Hardcover Optionen</h4>
            
            {/* Page limits information */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h5 className="font-bold mb-2">Grundpreis: 25,-€ inkl. Versand zzgl. Druck</h5>
              <h5 className="font-bold mb-2">Seitenzahl-Limits für Hardcover:</h5>
              <ul className="space-y-1 text-sm">
                <li>• einseitig/80g: max. 400 Seiten</li>
                <li>• einseitig/120g: max. 450 Seiten</li>
                <li>• beidseitig/80g: max. 800 Seiten</li>
                <li>• beidseitig/120g: max. 900 Seiten</li>
              </ul>
            </div>
            
            {/* Print Mode */}
            <div className="mb-6">
              <h5 className="text-lg font-medium mb-3">Druckmodus</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {printOptions.map((option) => (
                  <div 
                    key={option.id}
                    onClick={() => setSelectedPrintOption(option.id)}
                    className={`
                      border rounded-lg p-4 cursor-pointer transition-all
                      ${selectedPrintOption === option.id ? 'border-green-500 bg-white' : 'border-gray-200 bg-white'}
                    `}
                  >
                    <div className="flex items-start">
                      <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mr-3 mt-0.5 flex items-center justify-center ${selectedPrintOption === option.id ? 'border-green-500' : 'border-gray-300'}`}>
                        {selectedPrintOption === option.id && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
                      </div>
                      <div>
                        <h5 className="font-medium">{option.name}</h5>
                        <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cover Colors */}
            <div className="mb-6">
              <h5 className="text-lg font-medium mb-3">{t('configurator.binding.cover_color')}</h5>
              <div className="flex flex-wrap gap-4">
                {coverColors.map((color) => (
                  <div 
                    key={color.id}
                    onClick={() => setSelectedCoverColor(color.id)}
                    className={`
                      w-20 h-20 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all
                      ${selectedCoverColor === color.id ? 'ring-4 ring-green-500' : 'ring-1 ring-gray-200'}
                    `}
                  >
                    <div className={`w-10 h-10 rounded-full ${color.color} mb-2 border border-gray-300`}></div>
                    <span className="text-sm">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Embossing Colors */}
            <div className="mb-6">
              <h5 className="text-lg font-medium mb-3">{t('configurator.binding.embossing')}</h5>
              <div className="flex flex-wrap gap-4">
                {embossingColors.map((color) => (
                  <div 
                    key={color.id}
                    onClick={() => setSelectedEmbossingColor(color.id)}
                    className={`
                      w-20 h-20 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all
                      ${selectedEmbossingColor === color.id ? 'ring-4 ring-green-500' : 'ring-1 ring-gray-200'}
                    `}
                  >
                    <div className={`w-10 h-10 rounded-full ${color.color} mb-2 border border-gray-300`}></div>
                    <span className="text-sm">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Spine Embossing */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div 
                  onClick={() => setSpineEmbossing(!spineEmbossing)}
                  className={`w-6 h-6 rounded-md border-2 flex-shrink-0 mr-3 cursor-pointer ${spineEmbossing ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                >
                  {spineEmbossing && <Check className="text-white" size={20} />}
                </div>
                <h5 className="text-lg font-medium">Buchrückenprägung (+15,00 €)</h5>
              </div>
              
              {spineEmbossing && (
                <div className="ml-9">
                  <p className="text-sm text-gray-600 mb-2">Von unten nach oben: Name, Titel, Datum (max. 52 Zeichen)</p>
                  <input
                    type="text"
                    value={spineText}
                    onChange={(e) => {
                      if (e.target.value.length <= 52) {
                        setSpineText(e.target.value);
                      }
                    }}
                    maxLength={52}
                    placeholder="z.B. Max Mustermann, Titel der Arbeit, 2023"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{spineText.length} / 52 Zeichen</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Book Corners */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div 
                  onClick={() => setBookCorners(!bookCorners)}
                  className={`w-6 h-6 rounded-md border-2 flex-shrink-0 mr-3 cursor-pointer ${bookCorners ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                >
                  {bookCorners && <Check className="text-white" size={20} />}
                </div>
                <h5 className="text-lg font-medium">Buchecken (+6,00 €)</h5>
              </div>
              
              {bookCorners && (
                <div className="ml-9">
                  <div className="flex gap-4 mt-2">
                    <div 
                      onClick={() => setBookCornerColor('gold')}
                      className={`
                        px-4 py-2 rounded-md flex items-center border cursor-pointer
                        ${bookCornerColor === 'gold' ? 'border-green-500 bg-green-50' : 'border-gray-200'}
                      `}
                    >
                      <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                      <span>Gold</span>
                    </div>
                    <div 
                      onClick={() => setBookCornerColor('silver')}
                      className={`
                        px-4 py-2 rounded-md flex items-center border cursor-pointer
                        ${bookCornerColor === 'silver' ? 'border-green-500 bg-green-50' : 'border-gray-200'}
                      `}
                    >
                      <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>
                      <span>Silber</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* University Logo Selection */}
            <div className="mb-6">
              <h5 className="text-lg font-medium mb-3">Hochschullogo auswählen</h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {coverOptions.map((option) => (
                  <div 
                    key={option.id}
                    onClick={() => setSelectedCoverOption(option.id)}
                    className={`
                      border rounded-lg p-3 cursor-pointer transition-all
                      ${selectedCoverOption === option.id ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}
                    `}
                  >
                    <div className="h-16 flex items-center justify-center mb-2">
                      <img 
                        src={option.logo} 
                        alt={option.name} 
                        className="max-h-full max-w-full object-contain" 
                      />
                    </div>
                    <div className="text-center text-sm font-medium">{option.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Additional options for the selected binding */}
        {selectedBinding && selectedBinding === 'individualdruck' && (
          <div className="mt-8">
            <h4 className="text-lg font-medium mb-4">{t('configurator.binding.upload_design')}</h4>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                ref={fileInputRef}
              />
              {!uploadedFile ? (
                <button
                  type="button"
                  className="flex flex-col items-center justify-center w-full py-6 text-gray-600 hover:text-green-600 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 mb-4" />
                  <p className="text-base font-medium">{t('configurator.binding.drag_drop')}</p>
                  <p className="text-sm mt-1">{t('configurator.binding.supported_formats')}</p>
                </button>
              ) : (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {getFileIcon(uploadedFile.name)}
                      <span className="ml-2 font-medium">{uploadedFile.name}</span>
                    </div>
                    <button 
                      type="button" 
                      className="text-gray-500 hover:text-red-500"
                      onClick={handleRemoveFile}
                    >
                      <RefreshCw className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="rounded-lg p-4 bg-blue-50 border border-blue-200 mt-6 mb-6">
          <div className="flex items-start">
            <Info className="flex-shrink-0 text-blue-500 mt-1 mr-3" size={20} />
            <div>
              <h4 className="font-bold text-lg mb-2">Über unsere Bindungsarten</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold text-blue-800">Hardcover</h5>
                  <p className="text-sm text-gray-600">Premium-Bindung mit festem Einband, ideal für Abschlussarbeiten. Mit individueller Prägung und verschiedenen Farboptionen.</p>
                </div>
                <div>
                  <h5 className="font-bold text-blue-800">Softcover</h5>
                  <p className="text-sm text-gray-600">Leichte, flexible Bindung in drei Varianten: Klassisch (mit Folie), Karton (bedruckbar) oder mit Prägung.</p>
                </div>
                <div>
                  <h5 className="font-bold text-blue-800">Spiralbindung</h5>
                  <p className="text-sm text-gray-600">In Metall- oder Plastikausführung erhältlich. Komplett aufklappbar, ideal für Präsentationen und flach aufliegende Materialien.</p>
                </div>
                <div>
                  <h5 className="font-bold text-blue-800">Individueller Druck</h5>
                  <p className="text-sm text-gray-600">Eigene Designs hochladen und nach Ihren Wünschen drucken lassen. Unterstützt verschiedene Formate wie PDF, JPG, PNG und Word.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add canvas element right after the binding options section in renderStep1
  const renderPreviewSection = () => {
    return (
      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-white">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-lg font-medium">{t('configurator.binding.preview')}</h4>
          <button 
            onClick={generatePreviewPDF}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
          >
            <Download className="mr-2" size={16} />
            Als PDF speichern
          </button>
        </div>
        <div className="flex justify-center">
          <canvas 
            id="binding-preview"
            ref={previewCanvasRef}
            width={300}
            height={200}
            className="border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    );
  };

  // Add the PDF generation function
  const generatePreviewPDF = () => {
    const canvas = document.getElementById('binding-preview') as HTMLCanvasElement;
    if (!canvas) {
      alert('Preview canvas not found');
      return;
    }

    // Create PDF with A4 size
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Get binding type name
    const binding = bindingOptions.find(b => b.id === selectedBinding);
    const bindingName = binding ? binding.name : 'Custom Binding';
    
    // Add title and date
    doc.setFontSize(20);
    doc.text('Binding Preview', 20, 20);
    
    doc.setFontSize(12);
    const today = new Date().toLocaleDateString();
    doc.text(`Generated on: ${today}`, 20, 30);
    
    // Add binding details
    doc.setFontSize(14);
    doc.text('Configuration Details', 20, 45);
    
    doc.setFontSize(10);
    doc.text(`Binding Type: ${bindingName}`, 20, 55);
    doc.text(`Page Count: ${pageCount}`, 20, 60);
    
    if (selectedBinding === 'hardcover') {
      const coverColor = coverColors.find(c => c.id === selectedCoverColor)?.name || 'Default';
      const embossingColor = embossingColors.find(c => c.id === selectedEmbossingColor)?.name || 'Default';
      
      doc.text(`Cover Color: ${coverColor}`, 20, 65);
      doc.text(`Embossing Color: ${embossingColor}`, 20, 70);
      
      if (spineEmbossing) {
        doc.text(`Spine Embossing: Yes`, 20, 75);
        doc.text(`Spine Text: ${spineText || 'Not specified'}`, 20, 80);
      } else {
        doc.text(`Spine Embossing: No`, 20, 75);
      }
      
      if (bookCorners) {
        doc.text(`Book Corners: ${bookCornerColor === 'gold' ? 'Gold' : 'Silver'}`, 20, 85);
      } else {
        doc.text(`Book Corners: No`, 20, 85);
      }
    }
    
    doc.text(`Paper Type: ${paperOptions.find(p => p.id === selectedPaper)?.name || selectedPaper}`, 20, 90);
    doc.text(`Print Mode: ${printOptions.find(p => p.id === selectedPrintOption)?.name || selectedPrintOption}`, 20, 95);
    doc.text(`Estimated Price: €${totalPrice.toFixed(2)}`, 20, 100);
    
    // Get canvas image
    const imgData = canvas.toDataURL('image/png');
    
    // Calculate aspect ratio to fit within PDF width
    const canvasAspectRatio = canvas.width / canvas.height;
    const pdfWidth = 170; // mm, slightly less than A4 width
    const pdfHeight = pdfWidth / canvasAspectRatio;
    
    // Add the preview image
    doc.text('Preview:', 20, 115);
    doc.addImage(imgData, 'PNG', 20, 120, pdfWidth, pdfHeight);
    
    // Add footer
    doc.setFontSize(8);
    doc.text('This is a preview document. Actual product may vary.', 20, 280);
    
    // Save the PDF
    doc.save(`binding-preview-${today.replace(/\//g, '-')}.pdf`);
  };

  // Add validation functions after the generatePreviewPDF function
  // Validation functions for each step
  const validateStep1 = () => {
    return selectedBinding !== null;
  };

  const validateStep2 = () => {
    return pageCount > 0 && selectedPaper && selectedPrintOption;
  };

  const validateStep3 = () => {
    return selectedCoverOption !== null;
  };

  const validateStep4 = () => {
    return uploadedFile !== null;
  };

  if (step === null) {
    return null;
  }

  // Order confirmation screen
  if (orderConfirmed) {
    return (
      <section id="configurator" className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="text-green-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Bestellung erfolgreich aufgegeben!</h2>
              <p className="text-gray-600 mt-2">Vielen Dank für Ihre Bestellung.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">Bestellübersicht</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Bindung</h4>
                    <p className="text-gray-900">
                      {bindingOptions.find(b => b.id === selectedBinding)?.name || selectedBinding}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Seitenanzahl</h4>
                    <p className="text-gray-900">{pageCount} Seiten</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Papier</h4>
                    <p className="text-gray-900">
                      {paperOptions.find(p => p.id === selectedPaper)?.name || selectedPaper}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Druckoption</h4>
                    <p className="text-gray-900">
                      {printOptions.find(p => p.id === selectedPrintOption)?.name || selectedPrintOption}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Logo</h4>
                    <p className="text-gray-900">
                      {coverOptions.find(c => c.id === selectedCoverOption)?.name || selectedCoverOption}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Versand</h4>
                    <p className="text-gray-900">
                      {shippingOptions.find(s => s.id === selectedShipping)?.name || selectedShipping}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Exemplare</h4>
                    <p className="text-gray-900">{copies}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Datei</h4>
                    <p className="text-gray-900">{uploadedFile?.name || 'Keine Datei'}</p>
                  </div>
                </div>
                
                {selectedBinding === 'hardcover' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-2">Hardcover Optionen</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-600">Farbe</h5>
                        <p className="text-gray-900">
                          {coverColors.find(c => c.id === selectedCoverColor)?.name || selectedCoverColor}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-600">Prägung</h5>
                        <p className="text-gray-900">
                          {embossingColors.find(c => c.id === selectedEmbossingColor)?.name || selectedEmbossingColor}
                        </p>
                      </div>
                      {spineEmbossing && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-600">Buchrückenprägung</h5>
                          <p className="text-gray-900">{spineText || 'Keine Angabe'}</p>
                        </div>
                      )}
                      {bookCorners && (
                        <div>
                          <h5 className="text-sm font-medium text-gray-600">Buchecken</h5>
                          <p className="text-gray-900">{bookCornerColor === 'gold' ? 'Gold' : 'Silber'}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Gesamtpreis</h3>
                <div className="text-2xl font-bold text-green-600">{totalPrice.toFixed(2)} €</div>
              </div>
              <p className="text-gray-500 text-sm mt-1">inkl. MwSt.</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8">
              <div className="flex items-start">
                <Info className="flex-shrink-0 text-blue-500 mt-1 mr-3" size={20} />
                <div>
                  <h4 className="font-bold text-blue-800 mb-2">Weitere Schritte</h4>
                  <p className="text-blue-700">
                    Sie erhalten in Kürze eine Bestätigungs-E-Mail mit allen Details zu Ihrer Bestellung. 
                    Bei Fragen stehen wir Ihnen gerne zur Verfügung.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={() => setOrderConfirmed(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors mr-4"
              >
                Zurück zum Konfigurator
              </button>
              <button 
                onClick={() => {
                  setOrderConfirmed(false);
                  setStep(1);
                  // Reset all selections for a new order
                  setSelectedBinding(null);
                  setUploadedFile(null);
                  setUploadProgress(0);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Neue Bestellung
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="configurator" className="py-10 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold dark:text-white">{t('configurator.title')}</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t('configurator.subtitle')}
          </p>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-10 relative">
          {[1, 2, 3, 4].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div 
                className={`flex flex-col items-center ${stepNumber < step ? 'cursor-pointer' : ''} relative z-10`}
                onClick={() => stepNumber < step ? setStep(stepNumber) : null}
              >
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center text-xl font-medium mb-2
                  ${step > stepNumber 
                    ? 'bg-green-600 dark:bg-green-700 text-white' 
                    : step === stepNumber 
                      ? 'bg-green-600 dark:bg-green-700 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}
                `}>
                  {step > stepNumber ? <Check size={24} /> : stepNumber}
                </div>
                <div className={`text-sm font-medium ${step === stepNumber ? 'text-green-600 dark:text-green-500' : 'text-gray-600 dark:text-gray-400'}`}>
                  {stepNumber === 1 && t('configurator.step1')}
                  {stepNumber === 2 && t('configurator.step2')}
                  {stepNumber === 3 && t('configurator.step3')}
                  {stepNumber === 4 && t('configurator.step4')}
                </div>
              </div>
              
              {stepNumber < 4 && (
                <div className={`flex-1 h-0.5 ${step > stepNumber ? 'bg-green-600 dark:bg-green-700' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Step 1: Binding Selection */}
        {step === 1 && renderStep1()}
        
        {/* Step 2: Page Count and Print Options */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Schritt 2: Seitenanzahl & Druckoption</h2>
            
            {/* Paper and Print Options */}
            
            {/* Step Navigation */}
            <div className="flex justify-between mt-12">
              <button 
                onClick={() => setStep(1)} 
                className="px-8 py-3 bg-gray-200 dark:bg-gray-700 rounded-md font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-sm flex items-center dark:text-white"
              >
                <ArrowLeft className="mr-2" size={18} /> Zurück
              </button>
              <button 
                onClick={() => setStep(3)}
                className={`
                  px-8 py-3 rounded-md font-medium transition-colors shadow-sm flex items-center
                  ${validateStep2() 
                    ? 'bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600 text-white' 
                    : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-600 dark:text-gray-400'
                  }
                `}
                disabled={!validateStep2()}
              >
                Weiter <ArrowRight className="ml-2" size={18} />
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Cover */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Schritt 3: Cover Optionen</h2>
            
            {/* Cover Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {coverOptions.map((option) => (
                <div 
                  key={option.id}
                  className={`
                    bg-white rounded-lg shadow-md p-5 flex flex-col h-full transition-all
                    ${selectedCoverOption === option.id ? 'ring-2 ring-green-500' : 'hover:shadow-lg cursor-pointer'}
                  `}
                  onClick={() => setSelectedCoverOption(option.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-gray-800">{option.title}</h3>
                      <input 
                        type="radio" 
                        name="coverOption"
                        checked={selectedCoverOption === option.id}
                        onChange={() => setSelectedCoverOption(option.id)}
                        className="form-radio h-5 w-5 text-green-600"
                      />
                    </div>
                    {option.image && (
                      <div className="mb-4">
                        <img 
                          src={option.image} 
                          alt={option.title} 
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                    <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                  </div>
                  {option.price > 0 && (
                    <div className="text-green-600 font-bold mt-3">+{option.price.toFixed(2)} €</div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Step Navigation */}
            <div className="flex justify-between mt-8">
              <button 
                onClick={() => setStep(2)} 
                className="px-8 py-3 bg-gray-200 rounded-md font-medium hover:bg-gray-300 transition-colors shadow-sm flex items-center"
              >
                <ArrowLeft className="mr-2" size={18} /> Zurück
              </button>
              <button 
                onClick={() => setStep(4)}
                className={`
                  px-8 py-3 rounded-md font-medium transition-colors shadow-sm flex items-center
                  ${validateStep3() ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-600'}
                `}
                disabled={!validateStep3()}
              >
                Weiter <ArrowRight className="ml-2" size={18} />
              </button>
            </div>
          </div>
        )}
        
        {/* Step 4: Upload (previously Step 5) */}
        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Schritt 4: Datei hochladen</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Ihre Arbeit hochladen</h3>
                <p className="text-gray-600 mb-4">Laden Sie Ihre Arbeit als PDF-Datei hoch. Die maximale Dateigröße beträgt 100 MB.</p>
                
                <div 
                  className={`
                    border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center
                    ${isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500 hover:bg-gray-50'} 
                    transition-colors cursor-pointer
                  `}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {uploadedFile ? (
                    <div className="flex items-center justify-center flex-col">
                      <div className="bg-green-100 text-green-800 p-3 rounded-full mb-4">
                        <FileCheck size={24} />
                      </div>
                      <p className="font-medium text-gray-800 mb-1">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(uploadedFile.size)}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadedFile(null);
                          setUploadProgress(0);
                        }}
                        className="mt-4 text-sm text-red-600 hover:text-red-800 flex items-center"
                      >
                        <Trash2 size={16} className="mr-1" /> Entfernen
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="bg-gray-100 p-3 rounded-full mb-4">
                        <Upload size={24} className="text-gray-500" />
                      </div>
                      <p className="font-medium text-gray-800 mb-1">Dateien hierher ziehen</p>
                      <p className="text-sm text-gray-500 mb-4">oder</p>
                      <button 
                        className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Datei auswählen
                      </button>
                    </>
                  )}
                </div>
                
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-600 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Hochladen: {uploadProgress.toFixed(0)}%
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="text-lg font-medium mb-2">Bestellübersicht</div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Bindungsart:</span>
                    <span className="font-medium">{bindingOptions.find(b => b.id === selectedBinding)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Seitenanzahl:</span>
                    <span className="font-medium">{pageCount} Seiten ({selectedPrintOption === 'double' ? 'doppelseitig' : 'einseitig'})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Papierqualität:</span>
                    <span className="font-medium">{paperOptions.find(p => p.id === selectedPaper)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Cover-Option:</span>
                    <span className="font-medium">{coverOptions.find(c => c.id === selectedCoverOption)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Anzahl Exemplare:</span>
                    <span className="font-medium">{copies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Versand:</span>
                    <span className="font-medium">{shippingOptions.find(s => s.id === selectedShipping)?.name}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Gesamtpreis:</span>
                    <span className="text-green-600">{totalPrice.toFixed(2)} €</span>
                  </div>
                  <p className="text-sm text-gray-500">inkl. MwSt.</p>
                </div>
                
                {/* Preview button */}
                <button 
                  onClick={generatePreviewPDF}
                  className="w-full mb-3 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium transition-colors shadow-sm flex items-center justify-center"
                >
                  <FileText className="mr-2" size={18} /> Vorschau generieren
                </button>
                
                {/* Error message */}
                {orderError && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
                    {orderError}
                  </div>
                )}
                
                {/* Order button */}
                <button 
                  onClick={handleCheckout}
                  className={`
                    w-full py-3 rounded-md font-medium transition-colors shadow-sm flex items-center justify-center
                    ${validateStep4() ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 cursor-not-allowed text-gray-600'}
                  `}
                  disabled={!validateStep4()}
                >
                  Bestellung aufgeben <ShoppingCart className="ml-2" size={18} />
                </button>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button 
                onClick={() => setStep(3)} 
                className="px-8 py-3 bg-gray-200 rounded-md font-medium hover:bg-gray-300 transition-colors shadow-sm flex items-center"
              >
                <ArrowLeft className="mr-2" size={18} /> Zurück
              </button>
            </div>
          </div>
        )}
        
        {/* Order Confirmation Step */}
        {step === 5 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Bestellung erfolgreich aufgegeben!</h2>
            <p className="text-gray-600 mb-6">
              Vielen Dank für Ihre Bestellung. Wir haben Ihnen eine Bestätigungs-E-Mail mit allen Details zugesendet.
              Ihre Bestellnummer lautet: <span className="font-bold">{orderNumber}</span>
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-medium mb-4">Bestellübersicht</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-700">Bindungsart:</span>
                  <span className="font-medium">{bindingOptions.find(b => b.id === selectedBinding)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Seitenanzahl:</span>
                  <span className="font-medium">{pageCount} Seiten ({selectedPrintOption === 'double' ? 'doppelseitig' : 'einseitig'})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Papierqualität:</span>
                  <span className="font-medium">{paperOptions.find(p => p.id === selectedPaper)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Cover-Option:</span>
                  <span className="font-medium">{coverOptions.find(c => c.id === selectedCoverOption)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Anzahl:</span>
                  <span className="font-medium">{copies} Exemplare</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Versand:</span>
                  <span className="font-medium">{shippingOptions.find(s => s.id === selectedShipping)?.name}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200 font-bold">
                  <span>Gesamtpreis:</span>
                  <span className="text-green-600">{totalPrice.toFixed(2)} €</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => window.print()}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors flex items-center justify-center"
              >
                <Printer className="mr-2" size={18} /> Bestellung drucken
              </button>
              <button 
                onClick={handleNewOrder}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors flex items-center justify-center"
              >
                <PlusCircle className="mr-2" size={18} /> Neue Bestellung
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Configurator;