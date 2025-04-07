import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const Reviews: React.FC = () => {
  const { t } = useLanguage();
  const { darkMode } = useTheme();
  
  const reviews = [
    {
      id: 1,
      name: 'Julia M.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      rating: 5,
      text: t('review.julia'),
      degree: t('review.julia.degree'),
    },
    {
      id: 2,
      name: 'Markus K.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      rating: 5,
      text: t('review.markus'),
      degree: t('review.markus.degree'),
    },
    {
      id: 3,
      name: 'Laura S.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      rating: 5,
      text: t('review.laura'),
      degree: t('review.laura.degree'),
    },
    {
      id: 4,
      name: 'Thomas B.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      rating: 4,
      text: t('review.thomas'),
      degree: t('review.thomas.degree'),
    },
    {
      id: 5,
      name: 'Sarah F.',
      avatar: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      rating: 5,
      text: t('review.sarah'),
      degree: t('review.sarah.degree'),
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
      />
    ));
  };

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();
    }

    if (touchStart - touchEnd < -50) {
      handlePrev();
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="flex">
              {renderStars(5)}
            </div>
            <span className="ml-2 text-xl font-bold dark:text-white">{t('reviews.rating')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{t('reviews.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('reviews.subtitle')}
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-md">
                    <div className="flex items-center mb-6">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <div className="flex items-center mb-1">
                          {renderStars(review.rating)}
                        </div>
                        <h3 className="font-bold text-lg dark:text-white">{review.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{review.degree}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed mb-4">"{review.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-gray-700 rounded-full p-3 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none z-10 hidden md:block"
          >
            <ChevronLeft className="text-gray-700 dark:text-gray-300" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white dark:bg-gray-700 rounded-full p-3 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none z-10 hidden md:block"
          >
            <ChevronRight className="text-gray-700 dark:text-gray-300" />
          </button>
          
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-green-600 dark:bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          <a
            href="https://www.google.com/maps/place/pocat/@49.4060188,8.6886847,17z/data=!3m2!4b1!5s0x4797c11e0f7678f7:0x61bd40b5bd7ca3a6!4m6!3m5!1s0x4797c11e0f3952db:0x387be73aeae17b69!8m2!3d49.4060188!4d8.6912596!16s%2Fg%2F1tcvh0rl?entry=ttu#lrd=0x4797c11e0f3952db:0x387be73aeae17b69,3,,"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 font-medium flex items-center"
          >
            <Star className="mr-1" size={16} />
            {t('reviews.leave')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;