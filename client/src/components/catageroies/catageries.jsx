import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching categories from:', 'http://localhost:8000/api/categories');
      
      const response = await axios.get('http://localhost:8000/api/categories');
      console.log('API Response (Categories):', JSON.stringify(response.data, null, 2));

      if (response.data && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      } else {
        console.log('Unexpected response structure:', response.data);
        setCategories([]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err.message, err.response?.data || 'No response data');
      setError('فشل في تحميل الفئات. حاول مرة أخرى لاحقًا.');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Sample placeholder images (using placeholder in case category doesn't have an image)
  const placeholderImages = [
    "https://i.pinimg.com/474x/cf/cb/bf/cfcbbf69329a14987209887ed1def268.jpg",
    "https://i.pinimg.com/474x/0f/51/33/0f51332ebecf01ae443cb6642dd5b15b.jpg",
    "https://i.pinimg.com/736x/a2/fb/9f/a2fb9f5ba30a1cafa4a8ee33379c540b.jpg",
    "https://i.pinimg.com/474x/26/72/fc/2672fc53ada0e48c256a564fdce0dcff.jpg",
    "https://i.pinimg.com/474x/09/41/01/0941016d1a702381b2c1b2cc6246435c.jpg",
    "https://i.pinimg.com/474x/e8/e6/8d/e8e68d53a52f6a5231cba63da0c2f019.jpg"
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-4 border-t-[#28696A] border-[#213058] rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-[#213058]">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 max-w-md">
          <p className="text-center text-red-600 font-medium text-lg">{error}</p>
          <button 
            onClick={fetchCategories} 
            className="mt-4 w-full bg-[#28696A] text-white py-2 rounded-md hover:bg-[#213058] transition-colors duration-300"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-[#213058] mb-12 text-center relative">
          <span className="inline-block relative">
            الفئات
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#28696A] transform translate-y-2"></span>
          </span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <Link to={`/articles/${category._id}`} key={category._id} className="block transform transition-all duration-300 hover:scale-105">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={category.image || placeholderImages[index % placeholderImages.length]} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#213058]/80 to-transparent opacity-70"></div>
                  </div>
                  
                  <div className="p-6 relative">
                    <h2 className="text-2xl font-bold text-[#213058] mb-3 mt-2">{category.name}</h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {category.description || 'استكشف مجموعة متنوعة من المقالات في هذه الفئة'}
                    </p>
                    
                    <div className="flex justify-end">
                      <span className="inline-block py-2 px-4 bg-[#28696A]/10 text-[#28696A] rounded-lg text-sm font-medium transition-colors group-hover:bg-[#28696A] group-hover:text-white">
                        عرض المقالات
                        <span className="inline-block mr-1 transform group-hover:translate-x-1 transition-transform duration-300">←</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="bg-white rounded-xl p-8 shadow-md max-w-md mx-auto">
                <div className="w-16 h-16 bg-[#213058]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#213058]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg">لا توجد فئات متاحة حالياً</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;