import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Articles = () => {
  const { categoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // حالة لتتبع الصفحة الحالية
  const [totalPages, setTotalPages] = useState(1); // حالة لتتبع إجمالي الصفحات

  const fetchArticles = async (pageNum) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/articles?category=${categoryId}&page=${pageNum}&limit=8`);
      console.log('Articles Response:', response.data);
      if (response.data && Array.isArray(response.data.data)) {
        setArticles(response.data.data);
        setTotalPages(response.data.pagination.pages); // تحديث إجمالي الصفحات من الـ Backend
      } else {
        setArticles([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('فشل في تحميل المقالات.');
      setArticles([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(page); // جلب المقالات بناءً على الصفحة الحالية
  }, [categoryId, page]); // إعادة الجلب عند تغيير الفئة أو الصفحة

  // دالة للانتقال إلى الصفحة السابقة
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // دالة للانتقال إلى الصفحة التالية
  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  // Function to get image or placeholder
  const getImageUrl = (article) => {
    if (article.featuredImage) {
      return article.featuredImage;
    }
    return "/api/placeholder/400/250"; // Placeholder image if no featured image
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="p-6 rounded-lg shadow-md border-b-4 border-[#28696A]">
          <div className="text-[#213058] text-xl font-semibold flex items-center">
            <div className="mr-3 animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#28696A]"></div>
            جاري التحميل...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="p-6 rounded-lg shadow-md border-b-4 border-[#F4AE3F]">
          <div className="text-[#213058] text-xl font-semibold flex items-center">
            <svg className="w-6 h-6 text-[#F4AE3F] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="container mx-auto">
        <div className="flex justify-center mb-10">
          <div className="relative inline-block">
            <h1 className="text-4xl font-bold text-[#28696A] text-center pt-6">مقالات مختارة</h1>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-[#F4AE3F] rounded-full"></div>
          </div>
        </div>
        
        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <div 
                  key={article._id} 
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="relative overflow-hidden h-52">
                    <img 
                      src={getImageUrl(article)} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#213058] to-transparent opacity-50"></div>
                    <div className="absolute top-4 left-4 bg-[#F4AE3F] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {article.categoryIds && article.categoryIds[0] && (
                        typeof article.categoryIds[0] === 'object' ? article.categoryIds[0].name : article.categoryIds[0]
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white border-b-4 border-[#28696A]">
                    <h2 className="text-2xl font-semibold text-[#213058] mb-3 group-hover:text-[#28696A] transition-colors duration-300">{article.title}</h2>
                    
                    {article.content && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {typeof article.content === 'string' 
                          ? article.content.substring(0, 150) + (article.content.length > 150 ? '...' : '')
                          : ''}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-100">
                      {article.author && (
                        <p className="text-gray-600 text-sm flex items-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F0E6D7] mr-2 text-[#28696A]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                          </span>
                          <span>{typeof article.author === 'object' && article.author.full_name ? article.author.full_name : 'غير معروف'}</span>
                        </p>
                      )}
                      
                      {article.publishDate && (
                        <p className="text-gray-600 text-sm flex items-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#F0E6D7] mr-2 text-[#28696A]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </span>
                          <span>{new Date(article.publishDate).toLocaleDateString('ar-EG')}</span>
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <a 
                        href={`/article/${article._id}`} 
                        className="inline-block px-6 py-3 bg-[#28696A] text-white rounded-lg hover:bg-[#213058] transition-colors duration-300 text-center w-full font-medium"
                      >
                        اقرأ المزيد
                        <svg className="w-4 h-4 inline-block mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* إضافة أزرار الترقيم */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className={`px-4 py-2 rounded-full font-medium ${
                  page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#28696A] text-white hover:bg-[#213058]'
                }`}
              >
                السابق
              </button>
              <span className="text-[#213058] font-medium">
                صفحة {page} من {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-full font-medium ${
                  page === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#28696A] text-white hover:bg-[#213058]'
                }`}
              >
                التالي
              </button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center border-b-4 border-[#F4AE3F]">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-[#F0E6D7] mb-4 text-[#213058]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p className="text-[#213058] text-xl font-semibold">لا توجد مقالات متاحة في هذه الفئة</p>
            <p className="text-gray-500 mt-2">يرجى تحديد فئة أخرى أو العودة لاحقاً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;