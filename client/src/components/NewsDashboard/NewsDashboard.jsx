// import React, { useState } from 'react';

//  const NewsDashboard = () => {
//    // News Section State
//    const [activeFilter, setActiveFilter] = useState('الكل');
   
//    // Sidebar State
//    const [trendingFilter, setTrendingFilter] = useState('today');
 
//    // News Data
//    const newsData = {
//      'الكل': [
//        { id: 1, category: 'تكنولوجيا', title: 'التكنولوجيا هي أيضًا سلاح ذو حدين في الحروب الحديثة', date: '١٢ أبريل ٢٠٢١', image: 'pexels-thisisengineering-3861969.jpg', isFeatured: true },
//        { id: 2, category: 'تكنولوجيا', title: 'الرسوم المتحركة الحديثة تعتمد على تقنيات الذكاء الاصطناعي', date: '١٢ أبريل ٢٠٢١', image: 'pexels-pixabay-267350.jpg' },
//        { id: 3, category: 'تكنولوجيا', title: 'الرسوم المتحركة الحديثة تعتمد على تقنيات الذكاء الاصطناعي', date: '١٢ أبريل ٢٠٢١', image: 'exploration.jpg' }

//      ],
//      'سفر': [
//        { id: 5, category: 'سفر', title: 'أفضل 5 وجهات سياحية في المملكة العربية السعودية', date: '١٢ أبريل ٢٠٢١', image: '', isFeatured: true },
//        { id: 6, category: 'سفر', title: 'نصائح للسفر في الشرق الأوسط خلال فصل الصيف', date: '١٠ أبريل ٢٠٢١', image: 'pexels-te-lensfix-380994-1371360.jpg' },
//      ],
//      'رياضة': [
//        { id: 7, category: 'رياضة', title: 'الدوري السعودي يستقطب نجوم كرة القدم العالمية', date: '١٥ أبريل ٢٠٢١', image: '', isFeatured: true },
//        { id: 8, category: 'رياضة', title: 'منتخب مصر يستعد للتصفيات المؤهلة لكأس العالم', date: '١٤ أبريل ٢٠٢١', image: '' },
//      ],
//    };
 
//    // Most Viewed Videos Data
//    const trendingVideos = {
//      today: [
//        { id: 1, title: 'وثائقي عن المساجد التاريخية في المدينة المنورة', image: 'pexels-umaraffan499-338416.jpg', number: 1 },
//        { id: 2, title: 'الأزمة الإقتصادية في لبنان وتداعياتها الإقليمية', image: 'exploration.jpg', number: 2 },
//        { id: 3, title: 'التطورات الأخيرة في قطاع التكنولوجيا العربية', image: 'pexels-divinetechygirl-1181354.jpg', number: 3 },
//      ],
//      week: [
//        { id: 1, title: 'تقرير خاص عن الوضع في غزة والمفاوضات الجارية', image: '', number: 1 },
//        { id: 2, title: 'السياحة الصحراوية في المملكة العربية السعودية', image:'', number: 2 },
//        { id: 3, title: 'الإنجازات العلمية العربية في مجال الفضاء', image: '', number: 3 },
//      ],
//    };
 
//    // Helper Functions
//    const getFilteredNews = () => newsData[activeFilter] || [];
//    const getFeaturedNews = () => getFilteredNews().find(news => news.isFeatured) || getFilteredNews()[0];
//    const getSideNews = () => getFilteredNews().filter(news => !news.isFeatured).slice(0, 3);
 
//    const featuredNews = getFeaturedNews();
//    const sideNews = getSideNews();
 
//    return (
//      <div className=" py-10">
//        <div className="container mx-auto px-4">
//          {/* Section Title with Border Bottom */}
//          <div className=" border-gray-300 pb-4 mb-8">
//            {/* <h2 className="text-2xl font-bold text-gray-900">آخر المستجدات</h2> */}
//          </div>
         
//          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//            {/* Main News Section - 8 columns */}
//            <div className="lg:col-span-8">
//              <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
//                {/* News Section Header */}
//                <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
//                  <h3 className="text-xl font-bold text-gray-900">أخبار رائجة</h3>
//                  <div className="flex space-x-1 space-x-reverse">
//                    {Object.keys(newsData).map(filter => (
//                      <button 
//                        key={filter} 
//                        className={`px-3 py-1 text-sm font-medium rounded-md transition duration-200 ${
//                          activeFilter === filter 
//                            ? 'bg-[#F4AE3F] text-white' 
//                            : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
//                        }`}
//                        onClick={() => setActiveFilter(filter)}
//                      >
//                        {filter}
//                      </button>
//                    ))}
//                  </div>
//                </div>
 
//                {/* News Content Grid */}
//                <div className="grid grid-cols-12 gap-6">
//                  {featuredNews && (
//                    <div className="col-span-12 md:col-span-7 relative rounded-lg overflow-hidden h-80 bg-gray-800">
//                      <img 
//                        src={featuredNews.image} 
//                        alt={featuredNews.title} 
//                        className="w-full h-full object-cover"
//                        onError={(e) => {
//                          e.target.onerror = null;
//                          e.target.src = "/api/placeholder/600/400";
//                        }}
//                      />
//                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
//                      <div className="absolute bottom-0 p-4 text-white text-right w-full">
//                        <span className="inline-block bg-[#F4AE3F] text-white text-xs px-2 py-1 rounded-md mb-2">{featuredNews.category}</span>
//                        <h2 className="text-xl font-bold leading-tight">{featuredNews.title}</h2>
//                        <p className="text-sm text-gray-300 mt-1">{featuredNews.date}</p>
//                      </div>
//                    </div>
//                  )}
 
//                  <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
//                    {sideNews.map(news => (
//                      <div key={news.id} className="flex gap-3 items-center bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition duration-200">
//                        <div className="w-24 h-20 flex-shrink-0 bg-gray-300 rounded-md overflow-hidden">
//                          <img 
//                            src={news.image} 
//                            alt={news.title} 
//                            className="w-full h-full object-cover"
//                            onError={(e) => {
//                              e.target.onerror = null;
//                              e.target.src = "/api/placeholder/300/200";
//                            }}
//                          />
//                        </div>
//                        <div className="flex-1">
//                          <span className="text-xs font-medium text-[#F4AE3F]">{news.category}</span>
//                          <h3 className="font-bold text-gray-800 text-sm leading-tight">{news.title}</h3>
//                        </div>
//                      </div>
//                    ))}
//                  </div>
//                </div>
//              </div>
//            </div>
 
//            {/* Sidebar - 4 columns */}
//            <div className="lg:col-span-4">
//              <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                {/* Sidebar Header */}
//                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//                  <h3 className="text-lg font-bold text-gray-900">الأكثر مشاهدة</h3>
//                  <div className="flex space-x-1 space-x-reverse">
//                    <button 
//                      onClick={() => setTrendingFilter('today')} 
//                      className={`px-3 py-1 text-xs font-medium rounded-md transition duration-200 ${
//                        trendingFilter === 'today' 
//                          ? 'bg-[#F4AE3F] text-white' 
//                          : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
//                      }`}
//                    >اليوم</button>
//                    <button 
//                      onClick={() => setTrendingFilter('week')} 
//                      className={`px-3 py-1 text-xs font-medium rounded-md transition duration-200 ${
//                        trendingFilter === 'week' 
//                          ? 'bg-[#F4AE3F] text-white' 
//                          : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
//                      }`}
//                    >الأسبوع</button>
//                  </div>
//                </div>
               
//                {/* Trending Videos List */}
//                <div>
//                  {trendingVideos[trendingFilter].map((video) => (
//                    <div key={video.id} className="flex p-3 border-b border-gray-100 hover:bg-gray-50 transition duration-200">
//                      <div className="w-24 h-16 flex-shrink-0 ml-3 bg-gray-200 rounded-md overflow-hidden relative">
//                        <img 
//                          src={video.image} 
//                          alt={video.title} 
//                          className="w-full h-full object-cover"
//                          onError={(e) => {
//                            e.target.onerror = null;
//                            e.target.src = "/api/placeholder/150/100";
//                          }}
//                        />
//                        <div className="absolute inset-0 flex items-center justify-center">
//                          <div className="w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
//                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
//                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//                            </svg>
//                          </div>
//                        </div>
//                      </div>
//                      <div className="flex flex-1">
//                        <div className="text-2xl font-bold text-[#F4AE3F] ml-2 flex items-start">{video.number}</div>
//                        <div>
//                          <p className="font-medium text-gray-800 text-sm leading-tight">{video.title}</p>
//                          <span className="text-xs text-gray-500 mt-1 block">12:35</span>
//                        </div>
//                      </div>
//                    </div>
//                  ))}
//                </div>
               
//                {/* View All Button */}
//                <div className="p-3 text-center">
//                  <button className="text-[#F4AE3F] hover:text-red-700 text-sm font-medium transition">
//                    عرض المزيد ←
//                  </button>
//                </div>
//              </div>
//            </div>
//          </div>
//        </div>
//      </div>
//    );
//  };
 
//  export default NewsDashboard;
import React, { useState, useEffect } from 'react';

const NewsDashboard = () => {
  const [activeFilter, setActiveFilter] = useState('الكل');
  const [trendingFilter, setTrendingFilter] = useState('today');
  const [mostViewedArticles, setMostViewedArticles] = useState([]);
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  // جلب المقالات الأكثر مشاهدة عند تغيير الـ trendingFilter
  useEffect(() => {
    const fetchMostViewedArticles = async () => {
      setLoading(true); // بداية التحميل
      setError(null); // إعادة تعيين الخطأ في كل مرة
      try {
        const response = await fetch(`http://localhost:8000/api/most-viewed?filter=${trendingFilter}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setMostViewedArticles(data);
        } else {
          setMostViewedArticles([]); // إذا كانت البيانات ليست مصفوفة
        }
      } catch (error) {
        setError('حدث خطأ أثناء جلب المقالات.');
        console.error('Error fetching most viewed articles:', error);
      } finally {
        setLoading(false); // إيقاف حالة التحميل
      }
    };

    fetchMostViewedArticles();
  }, [trendingFilter]);

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar - 4 columns */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">الأكثر مشاهدة</h3>
                <div className="flex space-x-1 space-x-reverse">
                  <button 
                    onClick={() => setTrendingFilter('today')} 
                    className={`px-3 py-1 text-xs font-medium rounded-md transition duration-200 ${trendingFilter === 'today' ? 'bg-[#F4AE3F] text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-100'}`}
                  >
                    اليوم
                  </button>
                  <button 
                    onClick={() => setTrendingFilter('week')} 
                    className={`px-3 py-1 text-xs font-medium rounded-md transition duration-200 ${trendingFilter === 'week' ? 'bg-[#F4AE3F] text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-100'}`}
                  >
                    الأسبوع
                  </button>
                </div>
              </div>

              {/* رسالة عند حدوث خطأ */}
              {error && <div className="text-red-500 p-3">{error}</div>}

              {/* رسالة عند التحميل */}
              {loading && <div className="text-gray-500 p-3">جارٍ التحميل...</div>}

              {/* Trending Articles List */}
              <div>
                {Array.isArray(mostViewedArticles) && mostViewedArticles.length > 0 ? (
                  mostViewedArticles.map((article) => (
                    <div key={article._id} className="flex p-3 border-b border-gray-100 hover:bg-gray-50 transition duration-200">
                      <div className="w-24 h-16 flex-shrink-0 ml-3 bg-gray-200 rounded-md overflow-hidden relative">
                        <img 
                          src={article.featuredImage} 
                          alt={article.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/150/100";
                          }}
                        />
                      </div>
                      <div className="flex flex-1">
                        <div className="text-2xl font-bold text-[#F4AE3F] ml-2 flex items-start">#</div>
                        <div>
                          <p className="font-medium text-gray-800 text-sm leading-tight">{article.title}</p>
                          <span className="text-xs text-gray-500 mt-1 block">{article.publishDate ? new Date(article.publishDate).toLocaleString() : 'غير محدد'}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-3 text-gray-500">لا توجد مقالات لعرضها.</p>
                )}
              </div>

              {/* View All Button */}
              <div className="p-3 text-center">
                <button className="text-[#F4AE3F] hover:text-red-700 text-sm font-medium transition">
                  عرض المزيد ←
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDashboard;

