import React, { useState } from 'react';
import ArticleTable from './ArticleTable';
import FilterBar from './FilterBar';

const ContentSection = ({ articles, totalArticles, currentPage, totalPages, onStatusUpdate, onArticleUpdate, onArticleDelete, onPageChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    onSearch(term); // تمرير قيمة البحث إلى المكون الأب
  };

  const handlePageChange = (newPage) => {
    console.log('Changing to page:', newPage); 
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
      console.log(onPageChange(newPage));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">إدارة المحتوى</h3>
        <FilterBar 
          searchPlaceholder="ابحث عن المقالات..." 
          onSearch={handleSearch} 
        />
      </div>
      <ArticleTable 
        articles={articles} 
        onStatusUpdate={onStatusUpdate} 
        onArticleUpdate={onArticleUpdate} 
        onArticleDelete={onArticleDelete} 
      />
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          عرض {articles.length} من {totalArticles} مقال
        </p>
        <div className="flex space-x-1">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            السابق
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded text-sm ${currentPage === page ? 'bg-blue-600 text-white' : ''}`}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;