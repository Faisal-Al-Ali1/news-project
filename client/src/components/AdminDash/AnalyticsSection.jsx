import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalyticsSection = () => {
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    avgTimeOnSite: '0:00',
    topCategories: [],
    userDemographics: { age: {}, location: {} },
    topArticles: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('آخر 7 أيام');

  const API_BASE_URL = 'http://localhost:8000/admin';

  const fetchAnalytics = async (range) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/analytics`,{withCredentials: true} ,{
        params: { timeRange: range },
      });
      const data = response.data;

      const formattedAnalytics = {
        totalViews: data.totalViews || 0,
        avgTimeOnSite: formatTime(data.avgTimeOnSite || 0),
        topCategories: data.topCategories || ['غير محدد', 'غير محدد', 'غير محدد'],
        userDemographics: {
          age: data.userDemographics?.age || {},
          location: data.userDemographics?.location || {},
        },
        topArticles: data.topArticles || [],
      };

      setAnalytics(formattedAnalytics);
    } catch (err) {
      console.error('Axios Error:', err.response?.data || err.message);
      setError('فشل في جلب بيانات التحليلات. يرجى المحاولة لاحقًا.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    fetchAnalytics(timeRange);
  }, [timeRange]);

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  if (loading) {
    return <div className="text-center p-6">جارٍ التحميل...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">تحليلات الموقع</h3>
        <div className="flex space-x-2">
          <select
            className="border rounded px-3 py-1 text-sm"
            value={timeRange}
            onChange={handleTimeRangeChange}
          >
            <option>آخر 7 أيام</option>
            <option>آخر 30 يومًا</option>
            <option>هذا العام</option>
            <option>كل الوقت</option>
          </select>
          <button className="bg-gray-100 px-3 py-1 rounded text-sm">تصدير البيانات</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">إجمالي مشاهدات الصفحات</p>
          <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
          <p className="text-green-500 text-sm">+8.5% من الفترة السابقة</p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">متوسط وقت الإقامة</p>
          <p className="text-2xl font-bold">{analytics.avgTimeOnSite}</p>
          <p className="text-green-500 text-sm">+0:42 من الفترة السابقة</p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">الفئة الأعلى أداءً</p>
          <p className="text-2xl font-bold">{analytics.topCategories[0]}</p>
          <p className="text-gray-500 text-sm">
            تليها: {analytics.topCategories[1]}, {analytics.topCategories[2]}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-medium mb-3">الديموغرافيا - العمر</h4>
          <div className="space-y-2">
            {Object.entries(analytics.userDemographics.age). longueur > 0 ? (
              Object.entries(analytics.userDemographics.age).map(([age, percentage]) => (
                <div key={age}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{age}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">لا توجد بيانات متاحة</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">الديموغرافيا - الموقع</h4>
          <div className="space-y-2">
            {Object.entries(analytics.userDemographics.location).length > 0 ? (
              Object.entries(analytics.userDemographics.location).map(([location, percentage]) => (
                <div key={location}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{location}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">لا توجد بيانات متاحة</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">الأكثر قراءة</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-right">
                <th className="p-3 text-sm font-semibold">عنوان المقال</th>
                <th className="p-3 text-sm font-semibold">المشاهدات</th>
                <th className="p-3 text-sm font-semibold">التعليقات</th>
                <th className="p-3 text-sm font-semibold">الوقت المتوسط</th>
                <th className="p-3 text-sm font-semibold">الفئة</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topArticles.length > 0 ? (
                analytics.topArticles.map((article, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{article.title}</td>
                    <td className="p-3">{article.views.toLocaleString()}</td>
                    <td className="p-3">{article.comments}</td>
                    <td className="p-3">{article.avgTime}</td>
                    <td className="p-3">{article.category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    لا توجد مقالات متاحة لهذه الفترة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;