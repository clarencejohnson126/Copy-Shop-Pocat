import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar startConfigurator={() => {}} />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-primary font-medium mb-8 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
            Über uns
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Über Pocot - Ihr Copyshop in Heidelberg
              </h2>
              
              <p className="text-lg text-gray-700 mb-6">
                Wir begleiten unsere Kunden seit über 20 Jahren – von der Bachelorarbeit bis zur Promotion. Unser Ziel ist es, Studierenden und Akademikern dabei zu helfen, ihre Arbeiten im besten Licht zu präsentieren.
              </p>
              
              <p className="text-lg text-gray-700 mb-6">
                Zudem setzen wir auf Nachhaltigkeit und möchten unser Unternehmen fit für die Zukunft als umweltbewussten Copyshop gestalten.
              </p>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-green-800 mb-2">Über 20 Jahre Erfahrung</h3>
                <p className="text-gray-700">Seit 2005 ein fester Begriff in Heidelberg</p>
              </div>
            </div>
            
            <div className="relative">
              <svg className="w-full h-auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
                {/* Cartoon Mann mit Daumen hoch */}
                <g transform="translate(50, 50)">
                  {/* Körper - grünes Shirt */}
                  <path d="M100,120 C130,120 150,160 150,200 C150,240 130,280 100,280 C70,280 50,240 50,200 C50,160 70,120 100,120" fill="#16A34A" />
                  
                  {/* Kopf */}
                  <circle cx="100" cy="80" r="40" fill="#374151" />
                  
                  {/* Gesicht */}
                  <circle cx="85" cy="70" r="5" fill="white" />
                  <circle cx="115" cy="70" r="5" fill="white" />
                  <circle cx="85" cy="72" r="2" fill="black" />
                  <circle cx="115" cy="72" r="2" fill="black" />
                  
                  {/* Lächeln */}
                  <path d="M80,95 Q100,115 120,95" fill="none" stroke="white" strokeWidth="3" />
                  
                  {/* Bart */}
                  <path d="M70,85 Q100,120 130,85 Q115,105 100,110 Q85,105 70,85" fill="#374151" />
                  
                  {/* Arm mit Daumen hoch */}
                  <path d="M150,180 C170,170 200,150 180,120" fill="#16A34A" stroke="#064E3B" strokeWidth="2" />
                  <path d="M180,120 C190,110 195,120 190,130" fill="white" stroke="#064E3B" strokeWidth="2" />
                  <path d="M190,130 C200,125 200,140 190,145" fill="white" stroke="#064E3B" strokeWidth="2" />
                </g>
                
                {/* Bürodrucker */}
                <g transform="translate(280, 100)">
                  {/* Drucker Hauptteil */}
                  <rect x="0" y="0" width="150" height="100" rx="5" fill="#374151" />
                  
                  {/* Drucker Oberteil */}
                  <rect x="20" y="-20" width="110" height="20" rx="5" fill="#4B5563" />
                  
                  {/* Papierausgabe */}
                  <rect x="30" y="40" width="90" height="10" fill="white" />
                  
                  {/* Papier im Drucker */}
                  <rect x="30" y="40" width="90" height="40" fill="white" />
                  <path d="M30,80 L120,80 L120,130 L75,160 L30,130 Z" fill="white" />
                </g>
                
                {/* Tisch */}
                <rect x="250" y="200" width="200" height="10" fill="#D1D5DB" />
                <rect x="270" y="210" width="20" height="150" fill="#D1D5DB" />
                <rect x="410" y="210" width="20" height="150" fill="#D1D5DB" />
                
                {/* Pflanze */}
                <g transform="translate(390, 170)">
                  {/* Topf */}
                  <rect x="-20" y="0" width="40" height="30" fill="#D1D5DB" />
                  <rect x="-25" y="0" width="50" height="5" fill="#9CA3AF" />
                  
                  {/* Pflanzenstamm */}
                  <path d="M0,0 L0,-30" stroke="#065F46" strokeWidth="2" fill="none" />
                  
                  {/* Blätter */}
                  <path d="M0,-30 C-20,-40 -10,-70 0,-60" fill="#059669" />
                  <path d="M0,-30 C20,-40 10,-70 0,-60" fill="#059669" />
                  <path d="M0,-30 C-15,-35 -30,-50 -10,-55" fill="#059669" />
                  <path d="M0,-30 C15,-35 30,-50 10,-55" fill="#059669" />
                  <path d="M0,-60 C-5,-65 -5,-80 0,-75" fill="#059669" />
                  <path d="M0,-60 C5,-65 5,-80 0,-75" fill="#059669" />
                </g>
              </svg>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Unsere Geschichte</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Pocat wurde 2005 in Heidelberg gegründet, mit dem einfachen Ziel, Studierenden der Universität Heidelberg einen zuverlässigen Service für ihre Druckbedürfnisse anzubieten. Aus einem kleinen Laden in der Altstadt haben wir uns zu einem etablierten Copyshop entwickelt, der heute eine breite Palette an Druck- und Bindungsdienstleistungen anbietet.
            </p>
            
            <p className="text-lg text-gray-700 mb-6">
              In den vergangenen zwei Jahrzehnten haben wir tausende Abschlussarbeiten gedruckt und gebunden, haben mit Studierenden ihren Erfolg gefeiert und sind mit vielen von ihnen gewachsen - von der ersten Hausarbeit bis zur Doktorarbeit.
            </p>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Unsere Philosophie</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Bei Pocat verstehen wir, dass ein gedrucktes Dokument mehr ist als nur Tinte auf Papier. Es repräsentiert Wochen, Monate oder gar Jahre harter Arbeit und Hingabe. Daher gehen wir mit jedem Projekt mit größter Sorgfalt um.
            </p>
            
            <p className="text-lg text-gray-700 mb-6">
              Wir glauben an persönlichen Service. Wir nehmen uns Zeit, um die spezifischen Anforderungen jedes Projekts zu verstehen, und beraten unsere Kunden, um das bestmögliche Ergebnis zu erzielen. Diese individuelle Betreuung hat uns zahlreiche Stammkunden eingebracht, die uns über Jahre hinweg treu geblieben sind.
            </p>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Nachhaltigkeit als Kernwert</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              In einer Branche, die traditionell ressourcenintensiv ist, haben wir es uns zur Aufgabe gemacht, nachhaltiger zu arbeiten. Wir verwenden FSC-zertifiziertes Papier, arbeiten mit umweltfreundlichen Tinten und achten auf energieeffiziente Geräte.
            </p>
            
            <p className="text-lg text-gray-700 mb-6">
              Zudem haben wir Initiativen gestartet, um Papierabfall zu reduzieren, indem wir Fehldrucke zu Notizblöcken verarbeiten und digitale Alternativen fördern, wo immer es sinnvoll ist.
            </p>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Die Zukunft von Pocat</h2>
            
            <p className="text-lg text-gray-700 mb-4">
              Während wir stolz auf unsere Geschichte sind, blicken wir auch stets nach vorne. Die Druckbranche entwickelt sich ständig weiter, und wir entwickeln uns mit ihr. Wir investieren in neue Technologien, schulen unser Team regelmäßig und bleiben offen für Innovationen.
            </p>
            
            <p className="text-lg text-gray-700 mb-4">
              Unser Ziel für die kommenden Jahre ist es, weiterhin erstklassige Druckdienstleistungen anzubieten, während wir unseren ökologischen Fußabdruck weiter reduzieren. Wir möchten zeigen, dass Qualität und Nachhaltigkeit Hand in Hand gehen können.
            </p>
            
            <p className="text-lg text-gray-700 mb-12">
              Wir laden Sie ein, Teil unserer Geschichte zu werden. Besuchen Sie uns in unserem Copyshop in der Heidelberger Altstadt, und erleben Sie selbst den Unterschied, den persönlicher Service und Qualität ausmachen können.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs; 