import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ModernPrinting: React.FC = () => {
  const { language } = useLanguage();
  const { darkMode } = useTheme();
  const isGerman = language === 'de';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar startConfigurator={() => {}} />
      
      <div className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center text-primary dark:text-green-500 font-medium mb-8 hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {isGerman ? 'Zurück zur Startseite' : 'Back to home'}
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
            {isGerman 
              ? "Digitalisierung trifft Tradition: Moderne Drucktechniken" 
              : "Digitization meets tradition: Modern printing techniques"}
          </h1>
          
          <div className="mb-8">
            <img 
              src="https://i.postimg.cc/d3T1Hvc3/Screenshot-2025-04-06-at-12-21-39.png"
              alt={isGerman ? "Moderne Drucktechniken" : "Modern printing techniques"}
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {isGerman ? (
              <>
                <p className="dark:text-gray-300">
                  In einer Welt, in der digitale Dokumente und Online-Medien allgegenwärtig sind, erlebt die Druckindustrie 
                  einen bemerkenswerten Wandel. Anstatt im digitalen Zeitalter zu verschwinden, hat sich das Druckhandwerk 
                  neu erfunden – durch die Integration modernster Technologien bei gleichzeitiger Bewahrung traditioneller 
                  Qualitätsstandards. Bei pocat in Heidelberg erleben wir täglich, wie diese Symbiose aus Alt und Neu 
                  beeindruckende Ergebnisse hervorbringt.
                </p>
                
                <h2 className="dark:text-white">Die Evolution des Druckens: Von Gutenberg zu Gigabytes</h2>
                
                <p className="dark:text-gray-300">
                  Die Geschichte des Druckens ist geprägt von kontinuierlicher Innovation. Von Gutenbergs revolutionärer 
                  Druckerpresse im 15. Jahrhundert über die Industrialisierung des 19. Jahrhunderts bis hin zur Digitalisierung 
                  unserer Tage – Drucken war stets ein Spiegelbild technologischen Fortschritts.
                </p>
                
                <p className="dark:text-gray-300">
                  Die heutige Drucktechnologie unterscheidet sich fundamental von der noch vor 20 Jahren:
                </p>
                
                <h3 className="dark:text-gray-100">Der digitale Workflow revolutioniert die Vorbereitung</h3>
                
                <p className="dark:text-gray-300">
                  Während früher umständliche physische Vorbereitungen nötig waren, ermöglichen heute Cloud-basierte Systeme 
                  und fortschrittliche Software einen nahtlosen Übergang vom Bildschirm zum fertigen Druck:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Design-Software mit präziser Farbmanagement-Technologie</li>
                  <li>Automatisierte Preflight-Checks zur Fehlererkennung</li>
                  <li>Druckvorstufe ohne physische Filme oder Platten</li>
                  <li>Remote-Übermittlung druckfertiger Dateien</li>
                </ul>
                
                <p className="dark:text-gray-300">
                  In unserem Heidelberger Copyshop können Kunden ihre Dokumente digital einreichen, präzise Anweisungen geben 
                  und Echtzeitfeedback erhalten, noch bevor der erste Tropfen Tinte fließt.
                </p>
                
                <h2 className="dark:text-white">Hochmoderne Druckmaschinen: Präzision trifft Geschwindigkeit</h2>
                
                <p className="dark:text-gray-300">
                  Unsere neueste Generation von Digitaldruckern vereint technologische Brillanz mit handwerklicher Tradition:
                </p>
                
                <h3 className="dark:text-gray-100">Hochauflösende Drucksysteme</h3>
                
                <p className="dark:text-gray-300">
                  Mit einer Auflösung von bis zu 2400 DPI (Dots Per Inch) erreichen moderne Drucker eine Detailtreue, die selbst 
                  anspruchsvollste Grafikdesigner begeistert:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Mikrofeines Rendering komplexer Schriftarten</li>
                  <li>Nahtlose Farbverläufe ohne sichtbare Absätze</li>
                  <li>Präzise Wiedergabe feiner Linien und Strukturen</li>
                  <li>Fotorealistische Bildqualität bei jeder Vergrößerung</li>
                </ul>
                
                <h3 className="dark:text-gray-100">Vielseitige Materialbearbeitung</h3>
                
                <p className="dark:text-gray-300">
                  Anders als frühere Drucksysteme mit eingeschränkten Materialmöglichkeiten können moderne Drucker auf einer 
                  beeindruckenden Bandbreite von Medien arbeiten:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Spezialpapiere mit unterschiedlichen Texturen und Grammaturen</li>
                  <li>Umweltfreundliche Recyclingmaterialien ohne Qualitätseinbußen</li>
                  <li>Synthetische Materialien wie Polyester und Vinyl</li>
                  <li>Naturfaserpapiere mit einzigartigen haptischen Eigenschaften</li>
                </ul>
                
                <p className="dark:text-gray-300">
                  Diese Vielseitigkeit ermöglicht Druckprodukte, die nicht nur visuell beeindrucken, sondern auch taktile 
                  Erlebnisse bieten.
                </p>
                
                <h2 className="dark:text-white">Die Renaissance traditioneller Drucktechniken im digitalen Zeitalter</h2>
                
                <p className="dark:text-gray-300">
                  Paradoxerweise hat das digitale Zeitalter zu einer Wiederbelebung traditioneller Drucktechniken geführt. 
                  Als Reaktion auf die allgegenwärtige Digitalisierung wächst die Wertschätzung für handwerkliche Druckverfahren:
                </p>
                
                <h3 className="dark:text-gray-100">Letterpress im 21. Jahrhundert</h3>
                
                <p className="dark:text-gray-300">
                  Der klassische Buchdruck (Letterpress) erlebt eine Renaissance – allerdings mit modernem Twist:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Computergestützte Herstellung präziser Druckplatten</li>
                  <li>Kombination von Letterpress mit digitalen Designelementen</li>
                  <li>Innovative Materialien für neue haptische Erlebnisse</li>
                  <li>Individualisierte Kleinauflagen für besondere Anlässe</li>
                </ul>
                
                <p className="dark:text-gray-300">
                  Bei pocat bieten wir ausgewählte Letterpress-Optionen für besondere Projekte wie Hochzeitseinladungen oder 
                  Visitenkarten an, die durch ihre haptische Qualität beeindrucken.
                </p>
                
                <h2 className="dark:text-white">Personalisierung: Der Game-Changer im modernen Druck</h2>
                
                <p className="dark:text-gray-300">
                  Die vielleicht wichtigste Revolution durch digitale Drucktechniken ist die Möglichkeit zur Personalisierung 
                  ohne Mehrkosten:
                </p>
                
                <h3 className="dark:text-gray-100">Variable Datendrucktechnologie</h3>
                
                <p className="dark:text-gray-300">
                  Mit moderner Software können wir heute jeden einzelnen Druck eines Auftrags individualisieren:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Personalisierte Ansprache in Mailings und Broschüren</li>
                  <li>Individuelle Bildmotive je nach Zielgruppe</li>
                  <li>Maßgeschneiderte Inhaltselemente basierend auf Nutzerverhalten</li>
                  <li>QR-Codes, die zu personalisierten Landing-Pages führen</li>
                </ul>
                
                <p className="dark:text-gray-300">
                  Diese Technologie ermöglicht Drucksachen, die direkt mit dem Betrachter "sprechen" und dadurch deutlich 
                  wirksamer sind als generische Massenkommunikation.
                </p>
                
                <h2 className="dark:text-white">Fazit: Die Renaissance des Drucks durch Technologie</h2>
                
                <p className="dark:text-gray-300">
                  Das digitale Zeitalter hat den Druck nicht verdrängt, sondern neu definiert. Bei pocat erleben wir täglich, 
                  wie traditionelles Handwerk und modernste Technologie sich zu etwas Neuem verbinden, das mehr ist als die 
                  Summe seiner Teile.
                </p>
                
                <p className="dark:text-gray-300">
                  In unserem Copyshop in Heidelberg bieten wir diese Symbiose aus Tradition und Innovation – vom hochauflösenden 
                  Digitaldruck bis zu ausgewählten traditionellen Veredelungstechniken. Wir laden dich ein, die faszinierende 
                  Welt des modernen Drucks zu entdecken und für deine Projekte zu nutzen. Denn eines ist sicher: Gedrucktes hat 
                  eine Präsenz und Wirkung, die digitale Medien allein nicht erreichen können.
                </p>
              </>
            ) : (
              <>
                <p className="dark:text-gray-300">
                  In a world where digital documents and online media are ubiquitous, the printing industry is experiencing a 
                  remarkable transformation. Rather than disappearing in the digital age, the printing craft has reinvented 
                  itself - by integrating cutting-edge technologies while preserving traditional quality standards. At pocat 
                  in Heidelberg, we experience daily how this symbiosis of old and new produces impressive results.
                </p>
                
                <h2 className="dark:text-white">The evolution of printing: From Gutenberg to gigabytes</h2>
                
                <p className="dark:text-gray-300">
                  The history of printing is characterized by continuous innovation. From Gutenberg's revolutionary printing 
                  press in the 15th century to the industrialization of the 19th century to the digitization of our days - 
                  printing has always been a reflection of technological progress.
                </p>
                
                <p className="dark:text-gray-300">
                  Today's printing technology differs fundamentally from that of 20 years ago:
                </p>
                
                <h3 className="dark:text-gray-100">The digital workflow revolutionizes preparation</h3>
                
                <p className="dark:text-gray-300">
                  While cumbersome physical preparations were necessary in the past, today cloud-based systems and advanced 
                  software enable a seamless transition from screen to finished print:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Design software with precise color management technology</li>
                  <li>Automated preflight checks for error detection</li>
                  <li>Prepress without physical films or plates</li>
                  <li>Remote transmission of print-ready files</li>
                </ul>
                
                <p className="dark:text-gray-300">
                  In our Heidelberg copy shop, customers can submit their documents digitally, give precise instructions, and 
                  receive real-time feedback even before the first drop of ink flows.
                </p>
                
                <h2 className="dark:text-white">State-of-the-art printing machines: Precision meets speed</h2>
                
                <p className="dark:text-gray-300">
                  Our latest generation of digital printers combines technological brilliance with traditional craftsmanship:
                </p>
                
                <h3 className="dark:text-gray-100">High-resolution printing systems</h3>
                
                <p className="dark:text-gray-300">
                  With a resolution of up to 2400 DPI (Dots Per Inch), modern printers achieve a level of detail that excites 
                  even the most demanding graphic designers:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Microfine rendering of complex fonts</li>
                  <li>Seamless color gradients without visible steps</li>
                  <li>Precise reproduction of fine lines and structures</li>
                  <li>Photorealistic image quality at any magnification</li>
                </ul>
                
                <h3 className="dark:text-gray-100">Versatile material processing</h3>
                
                <p className="dark:text-gray-300">
                  Unlike earlier printing systems with limited material possibilities, modern printers can work on an impressive 
                  range of media:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Special papers with different textures and weights</li>
                  <li>Environmentally friendly recycled materials without loss of quality</li>
                  <li>Synthetic materials like polyester and vinyl</li>
                  <li>Natural fiber papers with unique tactile properties</li>
                </ul>
                
                <p className="dark:text-gray-300">
                  This versatility enables print products that not only impress visually but also offer tactile experiences.
                </p>
                
                <h2 className="dark:text-white">The renaissance of traditional printing techniques in the digital age</h2>
                
                <p className="dark:text-gray-300">
                  Paradoxically, the digital age has led to a revival of traditional printing techniques. As a reaction to 
                  ubiquitous digitization, appreciation for artisanal printing methods is growing:
                </p>
                
                <h3 className="dark:text-gray-100">Letterpress in the 21st century</h3>
                
                <p className="dark:text-gray-300">
                  Classic letterpress is experiencing a renaissance - albeit with a modern twist:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Computer-aided production of precise printing plates</li>
                  <li>Combination of letterpress with digital design elements</li>
                  <li>Innovative materials for new tactile experiences</li>
                  <li>Individualized small runs for special occasions</li>
                </ul>
                
                <p className="dark:text-gray-300">
                  At pocat, we offer selected letterpress options for special projects such as wedding invitations or 
                  business cards that impress with their tactile quality.
                </p>
                
                <h2 className="dark:text-white">Personalization: The game-changer in modern printing</h2>
                
                <p className="dark:text-gray-300">
                  Perhaps the most important revolution through digital printing techniques is the possibility for 
                  personalization without additional costs:
                </p>
                
                <h3 className="dark:text-gray-100">Variable data printing technology</h3>
                
                <p className="dark:text-gray-300">
                  With modern software, we can now customize each individual print of an order:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Personalized addressing in mailings and brochures</li>
                  <li>Individual image motifs depending on the target group</li>
                  <li>Tailored content elements based on user behavior</li>
                  <li>QR codes that lead to personalized landing pages</li>
                </ul>
                
                <p className="dark:text-gray-300">
                  This technology enables printed matter that speaks directly to the viewer and is therefore significantly 
                  more effective than generic mass communication.
                </p>
                
                <h2 className="dark:text-white">Conclusion: The renaissance of print through technology</h2>
                
                <p className="dark:text-gray-300">
                  The digital age has not displaced printing but redefined it. At pocat, we experience daily how traditional 
                  craftsmanship and state-of-the-art technology combine to form something new that is more than the sum of its parts.
                </p>
                
                <p className="dark:text-gray-300">
                  In our copy shop in Heidelberg, we offer this symbiosis of tradition and innovation - from high-resolution 
                  digital printing to selected traditional finishing techniques. We invite you to discover the fascinating 
                  world of modern printing and use it for your projects. Because one thing is certain: printed matter has a 
                  presence and impact that digital media alone cannot achieve.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ModernPrinting; 