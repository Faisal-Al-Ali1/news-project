
import React, { useState, useEffect } from "react";
import axios from "axios";

function Sidebar() {
  const [filter, setFilter] = useState("today"); // الفلتر الافتراضي
  const [articles, setArticles] = useState([]); // تخزين المقالات
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ

  const API_BASE_URL = "http://localhost:8000/api"; // استبدل بالرابط الفعلي عند نشر الموقع

  // 🔄 جلب المقالات الأكثر قراءة حسب الفلتر (اليوم أو الأسبوع)
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/last?period=${filter}`);
        setArticles(response.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("حدث خطأ أثناء جلب البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [filter]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between">
        <h3 className="text-xl font-bold">الأكثر قراءة</h3>
        <div className="flex">
          <button 
            onClick={() => setFilter("today")} 
            className={`px-3 py-1 text-sm font-medium ${filter === "today" ? "bg-black text-white" : "border border-gray-300 text-gray-600"}`}
          >
            اليوم
          </button>
          <button 
            onClick={() => setFilter("week")} 
            className={`px-3 py-1 text-sm font-medium ml-2 ${filter === "week" ? "bg-black text-white" : "border border-gray-300 text-gray-600"}`}
          >
            الأسبوع
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-4 text-center text-gray-600">جارٍ تحميل المقالات...</div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">{error}</div>
      ) : (
        <div>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div key={article._id} className="flex p-4 border-b border-gray-100 hover:bg-gray-50">
                {article.featuredImage && (
                  <div className="w-24 h-24 flex-shrink-0 ml-4">
                    <img src={`http://localhost:8000/${article.featuredImage}`} alt={article.title} className="w-full h-full object-cover rounded" />
                  </div>
                )}
                <div className="flex flex-1">
                  {/* <div className="text-3xl font-bold text-teal- ml-3">{index + 1}</div> */}
                  <p className="font-medium text-gray-800">{article.title}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-600">لا توجد مقالات متاحة</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
