
import React, { useState, useEffect } from 'react';

const StatisticsSection = () => {
  const [statistics, setStatistics] = useState({
    articleCount: 0,
    cultureCount: 0,
    documentaryCount: 0,
    newUsers: 0,
    userCount: 0,
    videoCount: 0,
    totalVideoViews: 7,
    totalVideoLikes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب الإحصائيات من الخادم
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/statistics');
        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        setError('حدث خطأ أثناء جلب الإحصائيات.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* إحصائية 1 - المقالات */}
          <div className="relative overflow-hidden bg-white border border-[#28696A] rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-28 h-28 bg-[#28696A] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#28696A]/10 text-[#28696A] group-hover:bg-[#28696A] group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-5xl font-bold text-[#213058] mb-3 group-hover:scale-110 transition-transform duration-300">{loading ? '...' : statistics.articleCount}</h3>
                <div className="h-0.5 w-12 bg-[#F4AE3F] mx-auto mb-3"></div>
                <p className="text-[#28696A] font-medium text-lg">مقال منشور</p>
              </div>
            </div>
          </div>

          {/* إحصائية 2 - الفيديوهات */}
          <div className="relative overflow-hidden bg-white border border-[#28696A] rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-28 h-28 bg-[#28696A] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#28696A]/10 text-[#28696A] group-hover:bg-[#28696A] group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-5xl font-bold text-[#213058] mb-3 group-hover:scale-110 transition-transform duration-300">{loading ? '...' : statistics.videoCount}</h3>
                <div className="h-0.5 w-12 bg-[#F4AE3F] mx-auto mb-3"></div>
                <p className="text-[#28696A] font-medium text-lg">عدد الفيديوهات</p>
              </div>
            </div>
          </div>

          {/* إحصائية 3 - المشاهدات */}
          <div className="relative overflow-hidden bg-white border border-[#28696A] rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-28 h-28 bg-[#28696A] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#28696A]/10 text-[#28696A] group-hover:bg-[#28696A] group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-5xl font-bold text-[#213058] mb-3 group-hover:scale-110 transition-transform duration-300">{loading ? '...' : statistics.totalVideoViews}</h3>
                <div className="h-0.5 w-12 bg-[#F4AE3F] mx-auto mb-3"></div>
                <p className="text-[#28696A] font-medium text-lg">إجمالي المشاهدات</p>
              </div>
            </div>
          </div>

          {/* إحصائية 4 - الإعجابات */}
          <div className="relative overflow-hidden bg-white border border-[#28696A] rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl group">
            <div className="absolute top-0 left-0 w-28 h-28 bg-[#28696A] opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[#28696A]/10 text-[#28696A] group-hover:bg-[#28696A] group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
              <div className="relative">
                <h3 className="text-5xl font-bold text-[#213058] mb-3 group-hover:scale-110 transition-transform duration-300">7</h3>
                <div className="h-0.5 w-12 bg-[#F4AE3F] mx-auto mb-3"></div>
                <p className="text-[#28696A] font-medium text-lg">إجمالي الإعجابات</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
