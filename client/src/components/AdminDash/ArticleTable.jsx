import React from 'react';
import ArticleRow from './ArticleRow';

const ArticleTable = ({ articles, onStatusUpdate, onArticleUpdate, onArticleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-3 text-sm font-semibold">العنوان</th>
            <th className="p-3 text-sm font-semibold">المؤلف</th>
            <th className="p-3 text-sm font-semibold">الحالة</th>
            <th className="p-3 text-sm font-semibold">التاريخ</th>
            <th className="p-3 text-sm font-semibold">المشاهدات</th>
            <th className="p-3 text-sm font-semibold">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <ArticleRow 
              key={article.id || article._id} 
              article={article} 
              onStatusUpdate={onStatusUpdate}
              onArticleUpdate={onArticleUpdate}
              onArticleDelete={onArticleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;