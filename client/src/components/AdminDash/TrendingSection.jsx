import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TrendingSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_BASE_URL = 'http://localhost:8000/admin';

  const fetchTrendingArticles = async (pageNum = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/articles`, {
        withCredentials: true,
        params: {
          page: pageNum,
          limit: 10,
          search: '',
        },
      });

      const { articles: fetchedArticles, totalPages: fetchedTotalPages } = response.data;

      const formattedArticles = fetchedArticles.map(article => ({
        id: article._id,
        title: article.title,
        views: article.views || 0,
        comments: article.likes ? article.likes.length : 0,
        featured: article.featured || false,
      }));

      // ترتيب حسب المشاهدات تنازليًا
      const trendingArticles = formattedArticles.sort((a, b) => b.views - a.views);
      setArticles(trendingArticles);
      setTotalPages(fetchedTotalPages);
    } catch (err) {
      setError('فشل في جلب المقالات الرائجة: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureToggle = async (articleId) => {
    try {
      const article = articles.find(a => a.id === articleId);
      const newFeaturedStatus = !article.featured;

      const response = await axios.put(
        `${API_BASE_URL}/articles/${articleId}`,
        { featured: newFeaturedStatus },
        { withCredentials: true }
      );

      setArticles(prevArticles =>
        prevArticles.map(article =>
          article.id === articleId ? { ...article, featured: response.data.featured } : article
        )
      );
      toast.success(`تم ${newFeaturedStatus ? 'تمييز' : 'إلغاء تمييز'} المقال بنجاح!`);
    } catch (error) {
      toast.error('فشل في تحديث حالة التمييز: ' + (error.response?.data?.message || error.message));
      console.error('Feature Toggle Error:', error);
    }
  };

  const handleViewArticle = (articleId) => {
    // هنا يمكنك إضافة منطق لعرض المقال (مثل فتح نافذة أو توجيه إلى صفحة)
    console.log(`عرض المقال: ${articleId}`);
    window.open(`/article/${articleId}`, '_blank'); // مثال لفتح رابط
  };

  const loadMoreArticles = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
      fetchTrendingArticles(page + 1);
    }
  };

  useEffect(() => {
    fetchTrendingArticles();
  }, []);

  if (loading) {
    return <div className="text-center p-6">جارٍ التحميل...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">إدارة المحتوى الرائج</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => fetchTrendingArticles(1)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            تحديث القائمة
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-right">
              <th className="p-3 text-sm font-semibold">المعرف</th>
              <th className="p-3 text-sm font-semibold">عنوان المقال</th>
              <th className="p-3 text-sm font-semibold">المشاهدات</th>
              <th className="p-3 text-sm font-semibold">التعليقات</th>
              <th className="p-3 text-sm font-semibold">مميز</th>
              <th className="p-3 text-sm font-semibold">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  لا توجد مقالات متاحة حاليًا
                </td>
              </tr>
            ) : (
              articles.map((article, index) => (
                <tr key={article.id} className="border-b">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{article.title}</td>
                  <td className="p-3">{article.views.toLocaleString()}</td>
                  <td className="p-3">{article.comments}</td>
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={article.featured}
                      onChange={() => handleFeatureToggle(article.id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewArticle(article.id)}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        عرض
                      </button>
                      <button
                        onClick={() => handleFeatureToggle(article.id)}
                        className={`px-2 py-1 rounded text-xs ${
                          article.featured
                        }`}
                      >
                
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={loadMoreArticles}
            disabled={page >= totalPages}
            className={`px-4 py-2 rounded text-white ${
              page >= totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'
            }`}
          >
            تحميل المزيد
          </button>
        </div>
      )}
    </div>
  );
};

export default TrendingSection;