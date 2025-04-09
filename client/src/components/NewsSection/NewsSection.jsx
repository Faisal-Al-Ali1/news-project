import React, { useState } from 'react';

const NewsSection = () => {
  const [activeFilter, setActiveFilter] = useState('الكل');

  const newsData = {
    'الكل': [
      { id: 1, category: 'تكنولوجيا', title: 'التكنولوجيا هي أيضًا...', date: '١٢ أبريل ٢٠٢١', image: 'https://via.placeholder.com/600x400', isFeatured: true },
      { id: 2, category: 'تكنولوجيا', title: 'شاهد روبرتو...', date: '١٢ أبريل ٢٠٢١', image: 'https://via.placeholder.com/300x200' },
      { id: 3, category: 'تكنولوجيا', title: 'الرسوم المتحركة...', date: '١٢ أبريل ٢٠٢١', image: 'https://via.placeholder.com/300x200' },
    ],
    'سفر': [
      { id: 5, category: 'سفر', title: 'أفضل 5 وجهات...', date: '١٢ أبريل ٢٠٢١', image: 'https://via.placeholder.com/600x400', isFeatured: true },
      { id: 6, category: 'سفر', title: 'نصائح للسفر...', date: '١٠ أبريل ٢٠٢١', image: 'https://via.placeholder.com/300x200' },
    ],
  };

  const getFilteredNews = () => newsData[activeFilter] || [];
  const getFeaturedNews = () => getFilteredNews().find(news => news.isFeatured) || getFilteredNews()[0];
  const getSideNews = () => getFilteredNews().filter(news => !news.isFeatured).slice(0, 3);

  const featuredNews = getFeaturedNews();
  const sideNews = getSideNews();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">أخبار رائجة</h1>
        <div className="flex gap-4">
          {['الكل', 'سفر'].map(filter => (
            <button key={filter} className={`${activeFilter === filter ? 'font-semibold' : 'text-gray-600'} hover:text-black`} onClick={() => setActiveFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {featuredNews && (
          <div className="col-span-12 md:col-span-6 lg:col-span-5 relative rounded-md overflow-hidden h-96 bg-gray-800">
            <img src={featuredNews.image} alt={featuredNews.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-0 p-4 text-white">
              <span className="bg-red-500 text-white px-3 py-1 rounded-sm">{featuredNews.category}</span>
              <h2 className="text-2xl font-bold text-right">{featuredNews.title}</h2>
            </div>
          </div>
        )}

        <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-4">
          {sideNews.map(news => (
            <div key={news.id} className="flex gap-3 items-center">
              <div className="w-1/3 h-24 bg-gray-300 rounded-md overflow-hidden">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
              </div>
              <div className="w-2/3">
                <h3 className="font-bold text-right">{news.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
