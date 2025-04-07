import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BindingThesis: React.FC = () => {
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
              ? "Die richtige Bindung für deine Abschlussarbeit" 
              : "The right binding for your thesis"}
          </h1>
          
          <div className="mb-8">
            <img 
              src="https://i.postimg.cc/tgXsXLWv/Screenshot-2025-04-06-at-12-15-43.png"
              alt={isGerman ? "Bindungen für Abschlussarbeiten" : "Thesis bindings"}
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {isGerman ? (
              <>
                <p className="dark:text-gray-300">
                  Die letzten Wochen waren intensiv, die Nächte kurz und der Kaffeekonsum hoch. Nach monatelanger Recherche, 
                  unzähligen Literaturverzeichnis-Korrekturen und dem ständigen Kampf mit der Formatierung steht deine 
                  Abschlussarbeit endlich kurz vor der Vollendung. Doch eine wichtige Entscheidung fehlt noch: Wie soll dein 
                  akademisches Meisterwerk gebunden werden?
                </p>
                
                <p className="dark:text-gray-300">
                  Die Wahl der richtigen Bindung ist mehr als nur eine ästhetische Entscheidung. Sie beeinflusst, wie deine 
                  Arbeit von Prüfern wahrgenommen wird, wie langlebig sie ist und ob sie den formalen Anforderungen deiner 
                  Bildungseinrichtung entspricht. Hier bei pocat beraten wir täglich Studierende zu diesem wichtigen finalen 
                  Schritt und möchten unser Wissen teilen.
                </p>
                
                <h2 className="dark:text-white">Hardcover-Bindung: Die Premium-Option</h2>
                
                <p className="dark:text-gray-300">
                  Die Hardcover-Bindung (auch Buchhardcover oder Festeinband genannt) ist die repräsentativste und hochwertigste 
                  Bindungsmethode. Deine Arbeit erhält einen stabilen Einband mit Leinen- oder Kunstlederüberzug und kann auf Wunsch 
                  mit Goldprägung veredelt werden.
                </p>
                
                <h3 className="dark:text-gray-100">Vorteile:</h3>
                <ul className="dark:text-gray-300">
                  <li>Äußerst robust und langlebig</li>
                  <li>Professionelles Erscheinungsbild, das die Wichtigkeit des Inhalts unterstreicht</li>
                  <li>Hervorragender Schutz der Seiten</li>
                  <li>Liegt flach aufgeschlagen auf dem Tisch</li>
                  <li>Perfekt für wichtige Abschlussarbeiten wie Master- oder Doktorarbeiten</li>
                </ul>
                
                <h3 className="dark:text-gray-100">Nachteile:</h3>
                <ul className="dark:text-gray-300">
                  <li>Höhere Kosten im Vergleich zu anderen Bindungsarten</li>
                  <li>Längere Produktionszeit (in der Regel 1-2 Werktage)</li>
                  <li>Schwerer und weniger flexibel im Transport</li>
                </ul>
                
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-md my-6">
                  <p className="font-semibold dark:text-white">Heidelberger Tipp:</p>
                  <p className="dark:text-gray-300">
                    Bei wichtigen Abschlussarbeiten wie Masterarbeiten oder Dissertationen empfehlen wir fast immer die 
                    Hardcover-Bindung. Die zusätzlichen Kosten sind eine Investition in die Wertschätzung deiner monatelangen 
                    Arbeit.
                  </p>
                </div>
                
                <h2 className="dark:text-white">Softcover-Bindung: Der beliebte Mittelweg</h2>
                
                <p className="dark:text-gray-300">
                  Die Softcover-Bindung (auch Klebebindung oder Perfectbinding genannt) ist ein guter Kompromiss aus Qualität 
                  und Kosten. Deine Arbeit erhält einen flexiblen Kartonumschlag, der meist mit einer Schutzfolie überzogen ist.
                </p>
                
                <h3 className="dark:text-gray-100">Vorteile:</h3>
                <ul className="dark:text-gray-300">
                  <li>Gutes Preis-Leistungs-Verhältnis</li>
                  <li>Professionelles Erscheinungsbild bei geringerem Preis</li>
                  <li>Leichter als Hardcover</li>
                  <li>Schnellere Produktion (oft am selben Tag fertig)</li>
                  <li>Von den meisten Hochschulen akzeptiert</li>
                </ul>
                
                <h3 className="dark:text-gray-100">Nachteile:</h3>
                <ul className="dark:text-gray-300">
                  <li>Weniger langlebig als Hardcover</li>
                  <li>Bei häufigem Aufschlagen kann sich der Rücken abnutzen</li>
                  <li>Kann bei sehr umfangreichen Arbeiten an Stabilität verlieren</li>
                </ul>
                
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-md my-6">
                  <p className="font-semibold dark:text-white">Heidelberger Tipp:</p>
                  <p className="dark:text-gray-300">
                    Die Softcover-Bindung ist ideal für Bachelorarbeiten und wird von vielen unserer studentischen Kunden 
                    bevorzugt. Mit einem ansprechenden Deckblatt macht deine Arbeit auch im Softcover eine hervorragende Figur.
                  </p>
                </div>
                
                <h2 className="dark:text-white">Spiralbindung: Praktisch und funktional</h2>
                
                <p className="dark:text-gray-300">
                  Die Spiralbindung (auch Wire-O oder Ringbindung genannt) ist eine praktische Option, bei der die Seiten mit 
                  einer Metallspirale oder einem Kunststoffkamm verbunden werden.
                </p>
                
                <h3 className="dark:text-gray-100">Vorteile:</h3>
                <ul className="dark:text-gray-300">
                  <li>Liegt komplett flach aufgeschlagen</li>
                  <li>Seiten können um 360° umgeschlagen werden</li>
                  <li>Sehr praktisch zum Arbeiten mit dem Dokument</li>
                  <li>Kostengünstig und schnell produziert</li>
                  <li>Ideal für Präsentationsunterlagen</li>
                </ul>
                
                <h3 className="dark:text-gray-100">Nachteile:</h3>
                <ul className="dark:text-gray-300">
                  <li>Weniger repräsentativ als Hard- oder Softcover</li>
                  <li>Von manchen Hochschulen nicht für finale Abschlussarbeiten akzeptiert</li>
                  <li>Spirale kann sich bei unsachgemäßer Handhabung verbiegen</li>
                </ul>
                
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-md my-6">
                  <p className="font-semibold dark:text-white">Heidelberger Tipp:</p>
                  <p className="dark:text-gray-300">
                    Prüfe unbedingt die Vorgaben deiner Fakultät! Während einige die Spiralbindung ausdrücklich erlauben oder 
                    sogar bevorzugen, akzeptieren andere nur geklebte oder genähte Bindungen.
                  </p>
                </div>
                
                <h2 className="dark:text-white">Fazit: Wertschätze deine Arbeit mit der richtigen Bindung</h2>
                
                <p className="dark:text-gray-300">
                  Die Wahl der Bindung ist der letzte Schritt im langen Prozess deiner akademischen Arbeit. Sie sollte die 
                  Bedeutung deines Werks unterstreichen und einen angemessenen Rahmen für deine monatelange Mühe bilden.
                </p>
                
                <p className="dark:text-gray-300">
                  Komm vorbei in unserem Copyshop in der Heidelberger Altstadt, und wir beraten dich persönlich. Bringe am 
                  besten deine ausgedruckte Arbeit mit, damit wir gemeinsam die optimale Bindungslösung finden können.
                </p>
              </>
            ) : (
              <>
                <p className="dark:text-gray-300">
                  The last weeks were intense, the nights short, and coffee consumption high. After months of research, countless 
                  corrections to your bibliography, and the constant struggle with formatting, your thesis is finally nearing 
                  completion. But one important decision remains: How should your academic masterpiece be bound?
                </p>
                
                <p className="dark:text-gray-300">
                  Choosing the right binding is more than just an aesthetic decision. It influences how your work is perceived by 
                  examiners, how durable it is, and whether it meets the formal requirements of your educational institution. Here 
                  at pocat, we advise students daily on this important final step and would like to share our knowledge.
                </p>
                
                <h2 className="dark:text-white">Hardcover Binding: The Premium Option</h2>
                
                <p className="dark:text-gray-300">
                  Hardcover binding (also called book hardcover or hard binding) is the most representative and highest quality 
                  binding method. Your work receives a stable cover with linen or synthetic leather coating and can be enhanced 
                  with gold embossing if desired.
                </p>
                
                <h3 className="dark:text-gray-100">Advantages:</h3>
                <ul className="dark:text-gray-300">
                  <li>Extremely robust and durable</li>
                  <li>Professional appearance that emphasizes the importance of the content</li>
                  <li>Excellent protection of the pages</li>
                  <li>Lies flat when opened on the table</li>
                  <li>Perfect for important final theses such as master's or doctoral dissertations</li>
                </ul>
                
                <h3 className="dark:text-gray-100">Disadvantages:</h3>
                <ul className="dark:text-gray-300">
                  <li>Higher costs compared to other binding types</li>
                  <li>Longer production time (usually 1-2 working days)</li>
                  <li>Heavier and less flexible to transport</li>
                </ul>
                
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-md my-6">
                  <p className="font-semibold dark:text-white">Heidelberg Tip:</p>
                  <p className="dark:text-gray-300">
                    For important final theses such as master's theses or dissertations, we almost always recommend hardcover 
                    binding. The additional costs are an investment in appreciating your months of work.
                  </p>
                </div>
                
                <h2 className="dark:text-white">Softcover Binding: The Popular Middle Ground</h2>
                
                <p className="dark:text-gray-300">
                  Softcover binding (also called perfect binding) is a good compromise between quality and cost. Your work 
                  receives a flexible cardboard cover, usually coated with a protective film.
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

export default BindingThesis; 