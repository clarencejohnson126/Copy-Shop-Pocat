import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { ArrowRight } from "lucide-react";

interface BlogArticle {
  id: number;
  title: {
    de: string;
    en: string;
  };
  summary: {
    de: string;
    en: string;
  };
  image: string;
  url: string;
}

const articles: BlogArticle[] = [
  {
    id: 1,
    title: {
      de: "Die richtige Bindung für deine Abschlussarbeit",
      en: "The right binding for your thesis",
    },
    summary: {
      de: "Erfahre, welche Bindungsmethode am besten für deine Abschlussarbeit geeignet ist und welche Vor- und Nachteile die verschiedenen Optionen bieten.",
      en: "Learn which binding method is best suited for your thesis and what advantages and disadvantages the different options offer.",
    },
    image: "https://i.postimg.cc/tgXsXLWv/Screenshot-2025-04-06-at-12-15-43.png",
    url: "/blog/binding-thesis",
  },
  {
    id: 2,
    title: {
      de: "Nachhaltig drucken: Unsere Umweltinitiativen",
      en: "Sustainable printing: Our environmental initiatives",
    },
    summary: {
      de: "Entdecke, wie wir bei pocat auf umweltfreundliche Druckmethoden setzen und aktiv zum Umweltschutz beitragen.",
      en: "Discover how we at pocat focus on environmentally friendly printing methods and actively contribute to environmental protection.",
    },
    image: "https://i.postimg.cc/k5fBDfyJ/Screenshot-2025-04-06-at-12-15-32.png",
    url: "/blog/sustainable-printing",
  },
  {
    id: 3,
    title: {
      de: "Digitalisierung trifft Tradition: Moderne Drucktechniken",
      en: "Digitization meets tradition: Modern printing techniques",
    },
    summary: {
      de: "Wie moderne Technologien den traditionellen Druckprozess revolutionieren und welche Vorteile das für deine Projekte bringt.",
      en: "How modern technologies are revolutionizing the traditional printing process and what advantages this brings to your projects.",
    },
    image: "https://i.postimg.cc/d3T1Hvc3/Screenshot-2025-04-06-at-12-21-39.png",
    url: "/blog/modern-printing",
  }
];

const Blog: React.FC = () => {
  const { language, t } = useLanguage();
  const { darkMode } = useTheme();

  return (
    <section id="blog" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {t('blog.section_title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('blog.section_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-72 overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img 
                  src={article.image} 
                  alt={article.title[language as 'de' | 'en']} 
                  className="w-full h-full object-contain p-2"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  {article.title[language as 'de' | 'en']}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {article.summary[language as 'de' | 'en']}
                </p>
                
                <Link
                  to={article.url}
                  className="inline-flex items-center text-primary dark:text-green-500 font-medium hover:underline"
                >
                  {t('blog.read_more')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog; 