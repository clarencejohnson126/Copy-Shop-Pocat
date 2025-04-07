import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const SustainablePrinting: React.FC = () => {
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
              ? "Nachhaltig drucken: Unsere Umweltinitiativen" 
              : "Sustainable printing: Our environmental initiatives"}
          </h1>
          
          <div className="mb-8">
            <img 
              src="https://i.postimg.cc/k5fBDfyJ/Screenshot-2025-04-06-at-12-15-32.png"
              alt={isGerman ? "Nachhaltiges Drucken" : "Sustainable printing"}
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {isGerman ? (
              <>
                <p className="dark:text-gray-300">
                  Als lokaler Copyshop in Heidelberg liegt uns nicht nur die Qualität unserer Druckprodukte am Herzen, 
                  sondern auch deren Auswirkungen auf unsere Umwelt. In Zeiten des Klimawandels und schwindender Ressourcen 
                  haben wir bei pocat eine klare Mission: Wir wollen Druckdienstleistungen anbieten, die sowohl hochwertig 
                  als auch umweltfreundlich sind.
                </p>
                
                <h2 className="dark:text-white">Unser ganzheitlicher Ansatz für nachhaltiges Drucken</h2>
                
                <p className="dark:text-gray-300">
                  Nachhaltigkeit ist für uns kein Marketingbegriff, sondern eine Grundhaltung, die sich durch alle Bereiche 
                  unseres Betriebs zieht. Von der Papierbeschaffung über den Druckprozess bis hin zur Abfallvermeidung – wir 
                  denken den gesamten Lebenszyklus unserer Produkte.
                </p>
                
                <h3 className="dark:text-gray-100">FSC-zertifiziertes Papier als Standard</h3>
                
                <p className="dark:text-gray-300">
                  Bei pocat verwenden wir standardmäßig FSC-zertifiziertes Papier. Das Forest Stewardship Council (FSC) stellt 
                  sicher, dass das Holz für die Papierherstellung aus verantwortungsvoll bewirtschafteten Wäldern stammt. Diese 
                  Wälder werden nach strengen ökologischen und sozialen Standards bewirtschaftet, wobei auf Nachhaltigkeit, 
                  Biodiversität und die Rechte indigener Völker geachtet wird.
                </p>
                
                <p className="dark:text-gray-300">
                  Anders als viele Copy-Shops, die umweltfreundliches Papier nur als teure Option anbieten, haben wir uns 
                  entschieden, komplett auf FSC-zertifiziertes Papier umzustellen – ohne Aufpreis für unsere Kunden. Dies bedeutet:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Keine Abholzung von Primärwäldern</li>
                  <li>Schutz bedrohter Arten und ihrer Lebensräume</li>
                  <li>Faire Arbeitsbedingungen für Waldarbeiter</li>
                  <li>Nachverfolgbarkeit entlang der gesamten Lieferkette</li>
                </ul>
                
                <h2 className="dark:text-white">Umweltfreundliche Drucktechnologien</h2>
                
                <p className="dark:text-gray-300">
                  Die Drucktechnologie hat in den letzten Jahren enorme Fortschritte gemacht, besonders im Hinblick auf 
                  Umweltfreundlichkeit. Bei pocat investieren wir kontinuierlich in die neuesten Technologien:
                </p>
                
                <h3 className="dark:text-gray-100">Pflanzliche Tinten und Toner</h3>
                
                <p className="dark:text-gray-300">
                  Unsere Drucker verwenden überwiegend Tinten und Toner auf pflanzlicher Basis anstelle von erdölbasierten 
                  Produkten. Diese biobasierten Alternativen:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Reduzieren den CO2-Fußabdruck um bis zu 35%</li>
                  <li>Sind besser abbaubar in der Umwelt</li>
                  <li>Enthalten weniger flüchtige organische Verbindungen (VOCs)</li>
                  <li>Produzieren weniger toxische Abfälle</li>
                </ul>
                
                <h3 className="dark:text-gray-100">Energieeffiziente Geräte</h3>
                
                <p className="dark:text-gray-300">
                  Alle unsere Druckmaschinen und Kopierer sind nach den neuesten Energieeffizienzstandards ausgewählt. 
                  Das bedeutet:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Bis zu 40% geringerer Stromverbrauch im Vergleich zu älteren Modellen</li>
                  <li>Intelligente Standby-Modi, die den Energieverbrauch in Leerlaufzeiten minimieren</li>
                  <li>Schnellere Aufwärmzeiten, die weniger Energie verbrauchen</li>
                  <li>Jährliche Wartung für optimale Effizienz</li>
                </ul>
                
                <h2 className="dark:text-white">Kreislaufwirtschaft im Copyshop</h2>
                
                <p className="dark:text-gray-300">
                  Der Begriff "Kreislaufwirtschaft" beschreibt ein Wirtschaftssystem, in dem Ressourcen so lange wie möglich 
                  wiederverwendet werden. Bei pocat setzen wir dieses Prinzip auf mehreren Ebenen um:
                </p>
                
                <h3 className="dark:text-gray-100">Recycling-Programme</h3>
                
                <p className="dark:text-gray-300">Unser umfassendes Recycling-Programm umfasst:</p>
                
                <ul className="dark:text-gray-300">
                  <li>Separate Sammlung und fachgerechte Entsorgung aller Papiersorten</li>
                  <li>Rücknahme und Wiederaufbereitung leerer Tonerkartuschen</li>
                  <li>Recycling elektronischer Geräte am Ende ihrer Lebensdauer</li>
                  <li>Kompostierung organischer Abfälle aus unserem Pausenraum</li>
                </ul>
                
                <h3 className="dark:text-gray-100">Upcycling-Initiativen</h3>
                
                <p className="dark:text-gray-300">
                  Aus Fehldrucken und überschüssigem Papier stellen wir Notizblöcke her, die unsere Kunden kostenlos mitnehmen 
                  können. Diese beliebte Initiative spart jährlich über 100 kg Papier, das sonst entsorgt werden müsste.
                </p>
                
                <h2 className="dark:text-white">CO2-Kompensation: Unsere Klimaneutralitäts-Strategie</h2>
                
                <p className="dark:text-gray-300">
                  Trotz aller Bemühungen können wir nicht alle Emissionen vermeiden. Für die verbleibenden CO2-Emissionen 
                  haben wir ein Kompensationsprogramm entwickelt:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Berechnung unseres jährlichen CO2-Fußabdrucks durch externe Experten</li>
                  <li>Investition in zertifizierte Klimaschutzprojekte, hauptsächlich Aufforstung im Odenwald</li>
                  <li>Transparente Kommunikation unserer Klimabilanz</li>
                  <li>Jährliche Überprüfung und kontinuierliche Verbesserung</li>
                </ul>
                
                <h2 className="dark:text-white">Fazit: Kleiner Copyshop, große Wirkung</h2>
                
                <p className="dark:text-gray-300">
                  Als lokaler Copyshop mögen unsere Maßnahmen im globalen Maßstab klein erscheinen, aber wir sind überzeugt: 
                  Viele kleine Schritte führen zu großen Veränderungen. Durch unsere konsequente Ausrichtung auf Nachhaltigkeit 
                  zeigen wir, dass auch kleine Unternehmen einen wichtigen Beitrag zum Umweltschutz leisten können.
                </p>
                
                <p className="dark:text-gray-300">
                  Wir laden dich ein, Teil unserer grünen Journey zu werden. Bei deinem nächsten Druckauftrag kannst du mit 
                  gutem Gewissen zu uns kommen – für Qualität, die nicht auf Kosten unserer Umwelt geht.
                </p>
              </>
            ) : (
              <>
                <p className="dark:text-gray-300">
                  As a local copy shop in Heidelberg, we care not only about the quality of our print products but also about 
                  their impact on our environment. In times of climate change and dwindling resources, we at pocat have a clear 
                  mission: We want to offer printing services that are both high quality and environmentally friendly.
                </p>
                
                <h2 className="dark:text-white">Our holistic approach to sustainable printing</h2>
                
                <p className="dark:text-gray-300">
                  For us, sustainability is not a marketing term but a fundamental attitude that permeates all areas of our 
                  business. From paper procurement to the printing process to waste prevention - we consider the entire life 
                  cycle of our products.
                </p>
                
                <h3 className="dark:text-gray-100">FSC-certified paper as standard</h3>
                
                <p className="dark:text-gray-300">
                  At pocat, we use FSC-certified paper as standard. The Forest Stewardship Council (FSC) ensures that the wood 
                  for paper production comes from responsibly managed forests. These forests are managed according to strict 
                  ecological and social standards, with attention to sustainability, biodiversity, and the rights of indigenous 
                  peoples.
                </p>
                
                <p className="dark:text-gray-300">
                  Unlike many copy shops that offer environmentally friendly paper only as an expensive option, we have decided 
                  to completely switch to FSC-certified paper - at no extra cost to our customers. This means:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>No deforestation of primary forests</li>
                  <li>Protection of endangered species and their habitats</li>
                  <li>Fair working conditions for forest workers</li>
                  <li>Traceability along the entire supply chain</li>
                </ul>
                
                <h2 className="dark:text-white">Environmentally friendly printing technologies</h2>
                
                <p className="dark:text-gray-300">
                  Printing technology has made enormous progress in recent years, especially in terms of environmental 
                  friendliness. At pocat, we continuously invest in the latest technologies:
                </p>
                
                <h3 className="dark:text-gray-100">Plant-based inks and toners</h3>
                
                <p className="dark:text-gray-300">
                  Our printers predominantly use plant-based inks and toners instead of petroleum-based products. These 
                  bio-based alternatives:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Reduce the carbon footprint by up to 35%</li>
                  <li>Are more biodegradable in the environment</li>
                  <li>Contain fewer volatile organic compounds (VOCs)</li>
                  <li>Produce less toxic waste</li>
                </ul>
                
                <h3 className="dark:text-gray-100">Energy-efficient devices</h3>
                
                <p className="dark:text-gray-300">
                  All our printing machines and copiers are selected according to the latest energy efficiency standards. 
                  This means:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Up to 40% lower power consumption compared to older models</li>
                  <li>Intelligent standby modes that minimize energy consumption during idle times</li>
                  <li>Faster warm-up times that consume less energy</li>
                  <li>Annual maintenance for optimal efficiency</li>
                </ul>
                
                <h2 className="dark:text-white">Circular economy in the copy shop</h2>
                
                <p className="dark:text-gray-300">
                  The term "circular economy" describes an economic system in which resources are reused for as long as possible. 
                  At pocat, we implement this principle on several levels:
                </p>
                
                <h3 className="dark:text-gray-100">Recycling programs</h3>
                
                <p className="dark:text-gray-300">Our comprehensive recycling program includes:</p>
                
                <ul className="dark:text-gray-300">
                  <li>Separate collection and proper disposal of all types of paper</li>
                  <li>Take-back and reconditioning of empty toner cartridges</li>
                  <li>Recycling electronic devices at the end of their life</li>
                  <li>Composting organic waste from our break room</li>
                </ul>
                
                <h3 className="dark:text-gray-100">Upcycling initiatives</h3>
                
                <p className="dark:text-gray-300">
                  From misprints and excess paper, we create notebooks that our customers can take for free. This popular 
                  initiative saves over 100 kg of paper annually that would otherwise be discarded.
                </p>
                
                <h2 className="dark:text-white">CO2 compensation: Our climate neutrality strategy</h2>
                
                <p className="dark:text-gray-300">
                  Despite all efforts, we cannot avoid all emissions. For the remaining CO2 emissions, we have developed a 
                  compensation program:
                </p>
                
                <ul className="dark:text-gray-300">
                  <li>Calculation of our annual carbon footprint by external experts</li>
                  <li>Investment in certified climate protection projects, mainly reforestation in the Odenwald</li>
                  <li>Transparent communication of our climate balance</li>
                  <li>Annual review and continuous improvement</li>
                </ul>
                
                <h2 className="dark:text-white">Conclusion: Small copy shop, big impact</h2>
                
                <p className="dark:text-gray-300">
                  As a local copy shop, our measures may seem small on a global scale, but we are convinced: Many small steps 
                  lead to big changes. Through our consistent focus on sustainability, we show that even small businesses can 
                  make an important contribution to environmental protection.
                </p>
                
                <p className="dark:text-gray-300">
                  We invite you to become part of our green journey. With your next print job, you can come to us with a clear 
                  conscience - for quality that doesn't come at the expense of our environment.
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

export default SustainablePrinting; 