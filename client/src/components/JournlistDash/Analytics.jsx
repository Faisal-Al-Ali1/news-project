import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, CartesianGrid } from "recharts";
import { 
  Loader, AlertCircle, BarChart2, PieChart as PieChartIcon, 
  TrendingUp, Eye, ThumbsUp, FileText, Award, Info
} from "lucide-react";

export default function Analytics() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    axios.get("http://localhost:8000/api/journalist/analytics", { withCredentials: true })
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching analytics:", error);
        setError("فشل في تحميل البيانات التحليلية. يرجى المحاولة مرة أخرى.");
        setLoading(false);
      });
  }, []);

  const prepareChartData = () => {
    if (!articles.length) return { chartData: [], viewDistribution: [], topArticles: [] };

    const chartData = articles.map(article => ({
      name: article.title.length > 20 ? article.title.substring(0, 20) + "..." : article.title,
      views: article.views,
      likes: article.likes?.length || 0,
      engagement: calculateEngagement(article),
      id: article.id
    }));

    const viewDistribution = articles.map(article => ({
      name: article.title.length > 15 ? article.title.substring(0, 15) + "..." : article.title,
      value: article.views
    }));

    const topArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

    return { chartData, viewDistribution, topArticles };
  };

  function calculateEngagement(article) {
    if (!article.views) return 0;
    return Math.round(((article.likes?.length || 0) / article.views) * 100);
  }

  const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
  const totalLikes = articles.reduce((sum, article) => sum + (article.likes?.length || 0), 0);
  const totalArticles = articles.length;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-2">
          <Loader className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-gray-600">جاري تحميل البيانات التحليلية...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center space-x-2 space-x-reverse">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  const { chartData, viewDistribution, topArticles } = prepareChartData();

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-center">تحليلات المقالات</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 space-x-reverse mb-2">
            <Eye className="w-5 h-5 text-indigo-500" />
            <h3 className="text-gray-500 text-sm">إجمالي المشاهدات</h3>
          </div>
          <p className="text-3xl font-bold">{totalViews}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 space-x-reverse mb-2">
            <ThumbsUp className="w-5 h-5 text-indigo-500" />
            <h3 className="text-gray-500 text-sm">إجمالي الإعجابات</h3>
          </div>
          <p className="text-3xl font-bold">{totalLikes}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 space-x-reverse mb-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            <h3 className="text-gray-500 text-sm">عدد المقالات</h3>
          </div>
          <p className="text-3xl font-bold">{totalArticles}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b">
          <nav className="flex">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`py-3 px-4 flex items-center gap-2 ${activeTab === "overview" ? "border-b-2 border-indigo-500 text-indigo-500" : "text-gray-500"}`}
            >
              <BarChart2 size={16} />
              <span>نظرة عامة</span>
            </button>
            <button 
              onClick={() => setActiveTab("articles")}
              className={`py-3 px-4 flex items-center gap-2 ${activeTab === "articles" ? "border-b-2 border-indigo-500 text-indigo-500" : "text-gray-500"}`}
            >
              <Award size={16} />
              <span>أداء المقالات</span>
            </button>
            <button 
              onClick={() => setActiveTab("engagement")}
              className={`py-3 px-4 flex items-center gap-2 ${activeTab === "engagement" ? "border-b-2 border-indigo-500 text-indigo-500" : "text-gray-500"}`}
            >
              <TrendingUp size={16} />
              <span>معدل التفاعل</span>
            </button>
          </nav>
        </div>
        
        <div className="p-4">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <BarChart2 size={18} className="text-indigo-500" />
                <span>نظرة عامة على الأداء</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                    <PieChartIcon size={16} className="text-indigo-500" />
                    <span>توزيع المشاهدات</span>
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={viewDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {viewDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-md font-medium mb-2 flex items-center gap-2">
                    <BarChart2 size={16} className="text-indigo-500" />
                    <span>المشاهدات والإعجابات</span>
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="views" fill="#8884d8" name="المشاهدات" />
                      <Bar dataKey="likes" fill="#82ca9d" name="الإعجابات" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "articles" && (
            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Award size={18} className="text-indigo-500" />
                <span>أفضل المقالات أداءً</span>
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        العنوان
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        المشاهدات
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الإعجابات
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        معدل التفاعل
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topArticles.map((article) => (
                      <tr key={article.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-gray-900">{article.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">{article.views}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-900">{article.likes?.length || 0}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className={`text-sm px-2 py-1 rounded-full text-center inline-block w-16 ${
                            calculateEngagement(article) > 10 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {calculateEngagement(article)}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === "engagement" && (
            <div>
              <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-indigo-500" />
                <span>معدل التفاعل</span>
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="engagement" stroke="#ff7300" name="معدل التفاعل (%)" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <Info size={16} className="text-blue-800" />
                  <span>نصائح لتحسين معدل التفاعل</span>
                </h3>
                <ul className="list-disc list-inside text-sm text-blue-700">
                  <li>استخدم عناوين جذابة ومثيرة للاهتمام</li>
                  <li>أضف صوراً ومقاطع فيديو عالية الجودة</li>
                  <li>قم بنشر المحتوى في أوقات الذروة</li>
                  <li>ناقش المواضيع الشائعة والمهمة</li>
                  <li>اطلب من القراء التفاعل من خلال الإعجابات والتعليقات</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

