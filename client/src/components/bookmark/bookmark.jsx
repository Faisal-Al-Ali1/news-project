import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BookmarkX, Loader2 } from "lucide-react";

const Bookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8000/user";

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/bookmarks`, { withCredentials: true });
      console.log("API Response:", response.data); // Debugging
      setBookmarks(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (err) {
      setError("فشل في جلب المقالات المحفوظة: " + (err.response?.data?.error || err.message));
      console.error("Fetch Bookmarks Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBookmark = async (articleId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/bookmarks/${articleId}`,
        {},
        { withCredentials: true } // Cookies will be sent automatically
      );
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark._id !== articleId)
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        "فشل في تحديث المفضلة: " + (error.response?.data?.error || error.message)
      );
      console.error("Toggle Bookmark Error:", error.response || error);
    }
  };

  useEffect(() => {
    console.log("Fetching bookmarks..."); // Debugging
    fetchBookmarks();
  }, []);

  useEffect(() => {
    console.log("Bookmarks state updated:", bookmarks); // Debugging
  }, [bookmarks]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] p-6">
        <div className="text-center">
          <Loader2 className="h-8 w-8 mx-auto animate-spin text-blue-500 mb-2" />
          <p className="text-gray-600">جارٍ التحميل...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 my-6 mx-4 text-center">
        <div className="text-red-600 mb-2 text-lg">❌ حدث خطأ</div>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md my-6 mx-4 overflow-hidden border border-gray-100 mt-14 mb-16">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">المقالات المحفوظة</h2>
        <p className="text-gray-600 mt-1">قائمة المقالات التي قمت بحفظها للقراءة لاحقًا</p>
      </div>

      <div className="p-6">
        {Array.isArray(bookmarks) && bookmarks.length === 0 ? (
          <div className="text-center py-12 px-4">
            <BookmarkX className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">لا توجد مقالات محفوظة حاليًا.</p>
            <p className="text-gray-400 mt-2">يمكنك حفظ المقالات المفضلة لديك للرجوع إليها لاحقًا</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-gray-700 font-semibold border-b">العنوان</th>
                  <th className="p-4 text-gray-700 font-semibold border-b">المؤلف</th>
                  <th className="p-4 text-gray-700 font-semibold border-b">الفئات</th>
                  <th className="p-4 text-gray-700 font-semibold border-b">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(bookmarks) &&
                  bookmarks.map((article, index) => (
                    <tr 
                      key={article._id} 
                      className={`hover:bg-blue-50 transition-colors duration-150 ${
                        index !== bookmarks.length - 1 ? "border-b border-gray-200" : ""
                      }`}
                    >
                      <td className="p-4 font-medium">{article.title}</td>
                      <td className="p-4 text-gray-700">
                        {article.author?.full_name || article.author?.username || "غير معروف"}
                      </td>
                      <td className="p-4">
                        {article.categoryIds?.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {article.categoryIds.map((cat, i) => (
                              <span 
                                key={i} 
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                              >
                                {cat.name || cat}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-500">غير محدد</span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleBookmark(article._id)}
                          className="bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 hover:text-red-700 transition-colors duration-150 flex items-center gap-2"
                        >
                          <BookmarkX className="h-4 w-4" />
                          <span>إزالة</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmark;