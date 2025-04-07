import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

type SoftcoverVariant = 'klassisch' | 'karton' | 'prägung';

interface SoftcoverOption {
  id: SoftcoverVariant;
  title: string;
  description: string;
  features: string[];
  color: string;
}

const SoftcoverCard: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<SoftcoverVariant>('klassisch');

  const softcoverOptions: Record<SoftcoverVariant, SoftcoverOption> = {
    klassisch: {
      id: 'klassisch',
      title: 'Softcover Klassisch',
      description: 'Die traditionelle Variante mit flexiblem Einband für alltägliche Anwendungen.',
      features: [
        'Schnelle Produktion innerhalb von 1-2 Stunden',
        'Ideal für Seminararbeiten und Berichte',
        'Leichtes Gewicht und platzsparend',
        'Kostengünstige Option'
      ],
      color: 'bg-green-600'
    },
    karton: {
      id: 'karton',
      title: 'Softcover Karton',
      description: 'Robuste Kartonvariante für mehr Stabilität und Langlebigkeit.',
      features: [
        'Verstärkter Kartoneinband für besseren Schutz',
        'Geeignet für häufig verwendete Dokumente',
        'Attraktive matte oder glänzende Oberfläche möglich',
        'Vielseitige Farboptionen'
      ],
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
        'Perfekt für repräsentative Zwecke'
      ],
      color: 'bg-blue-600'
    }
  };

  const selectedOption = softcoverOptions[selectedVariant];

  const handleVariantSelect = (variant: SoftcoverVariant) => {
    setSelectedVariant(variant);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 max-w-sm mx-auto flex flex-col">
      {/* Book image */}
      <div className="h-48 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Softcover Book" 
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2">Softcover</h3>
        <p className="text-gray-600 mb-4">Flexible, leichte Bindung mit dünnem Einband</p>
        
        {/* Dropdown selector */}
        <div className="mb-4">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <div className="flex items-center">
              <div className={`w-3 h-3 ${softcoverOptions[selectedVariant].color} rounded-full mr-2`}></div>
              <span className="font-medium">{selectedVariant.charAt(0).toUpperCase() + selectedVariant.slice(1)}</span>
            </div>
            {isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          {isDropdownOpen && (
            <div className="mt-2 py-2 px-3 bg-white rounded-md border border-gray-200 shadow-md absolute z-10">
              <div className="space-y-2">
                {(Object.keys(softcoverOptions) as SoftcoverVariant[]).map((variant) => (
                  <button 
                    key={variant}
                    onClick={() => handleVariantSelect(variant)}
                    className="flex items-center w-full py-1.5 px-2 hover:bg-gray-100 rounded-md transition-colors text-left"
                  >
                    <div className={`w-3 h-3 ${softcoverOptions[variant].color} rounded-full mr-2`}></div>
                    <span className={`${selectedVariant === variant ? 'font-semibold' : ''}`}>
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Selected variant details */}
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">{selectedOption.title}</h4>
          <p className="text-gray-600 mb-3 text-sm">{selectedOption.description}</p>
          <ul className="space-y-2 mb-4">
            {selectedOption.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Price and action button */}
        <div className="mt-auto">
          <div className="text-2xl font-bold text-green-600 mb-4">ab €12,90</div>
          <button className="w-full py-3 rounded-md font-medium transition-colors bg-gray-100 hover:bg-gray-200 text-gray-800">
            Auswählen
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoftcoverCard; 