import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import OverviewSection from "./OverviewSection";
import ContentSection from "./ContentSection";
import CommentsSection from "./CommentsSection";
import AnalyticsSection from "./AnalyticsSection";
import TrendingSection from "./TrendingSection";
import SettingsSection from "./SettingsSection";
import ReportsSection from "./ReportsSection";
import UsersSection from './UsersSection';
import VideosSection from './VideosSection';
import {
  Home,
  FileText,
  Edit,
  Users,
  MessageSquare,
  Flag,
  BarChart2,
  TrendingUp,
  Settings,
  Video,
  LogOut,
} from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [reports, setReports] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const navigate = useNavigate()
  const API_BASE_URL = "http://localhost:8000/admin";
  const LIMIT = 10;

  const fetchArticles = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/articles?page=${page}&limit=${LIMIT}&search=${search}`;
      console.log('Fetching articles from:', url);

      const response = await axios.get(url, {
        withCredentials: true,
      });

      console.log('API Response:', response.data);

      const { articles: fetchedArticles, totalArticles, currentPage, totalPages } = response.data;

      const formattedArticles = fetchedArticles.map(article => ({
        ...article,
        id: article._id,
        date: article.publishDate ? new Date(article.publishDate).toLocaleDateString('ar-EG') : 'غير محدد',
        author: article.author && typeof article.author === 'object'
          ? (article.author.full_name || article.author.username || 'غير معروف')
          : 'غير معروف',
        status: article.status === 'published' ? 'منشور' : article.status === 'pending' ? 'قيد الانتظار' : 'مرفوض'
      }));

      setArticles(formattedArticles);
      setTotalArticles(totalArticles);
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
      console.log('State updated:', { articles: formattedArticles, totalArticles, currentPage, totalPages });
    } catch (err) {
      setError("فشل في جلب المقالات من الخادم.");
      console.error('Fetch Articles Error:', err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdditionalData = async () => {
    try {
      const [commentsRes, journalistsRes, reportsRes, analyticsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/comments`, { withCredentials: true }),
        axios.get(`${API_BASE_URL}/users`, { withCredentials: true }),
        axios.get(`${API_BASE_URL}/reports`, { withCredentials: true }),
        axios.get(`${API_BASE_URL}/analytics`, { withCredentials: true }),
      ]);

      setComments(commentsRes.data);
      setJournalists(journalistsRes.data.filter(user => user.role === "journalist"));
      setReports(reportsRes.data);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      setError("فشل في جلب البيانات الإضافية.");
      console.error('Fetch Additional Data Error:', err.response ? err.response.data : err.message);
    }
  };

  
  useEffect(() => {
    fetchArticles(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

 
  useEffect(() => {
    fetchAdditionalData();
  }, []);

  const handleStatusUpdate = (articleId, newStatus, updatedArticle) => {
    setArticles(prevArticles =>
      prevArticles.map(article =>
        (article.id || article._id) === articleId
          ? {
              ...article,
              ...updatedArticle,
              status: updatedArticle.status === 'published' ? 'منشور' : updatedArticle.status === 'pending' ? 'قيد الانتظار' : 'مرفوض',
              date: updatedArticle.publishDate ? new Date(updatedArticle.publishDate).toLocaleDateString('ar-EG') : 'غير محدد',
              author: updatedArticle.author && typeof updatedArticle.author === 'object'
                ? (updatedArticle.author.full_name || updatedArticle.author.username || 'غير معروف')
                : 'غير معروف'
            }
          : article
      )
    );
  };
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/auth/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleArticleUpdate = (articleId, updatedArticle) => {
    setArticles(prevArticles =>
      prevArticles.map(article =>
        (article.id || article._id) === articleId
          ? {
              ...article,
              ...updatedArticle,
              status: updatedArticle.status === 'published' ? 'منشور' : updatedArticle.status === 'pending' ? 'قيد الانتظار' : 'مرفوض',
              date: updatedArticle.publishDate ? new Date(updatedArticle.publishDate).toLocaleDateString('ar-EG') : 'غير محدد',
              author: updatedArticle.author && typeof updatedArticle.author === 'object'
                ? (updatedArticle.author.full_name || updatedArticle.author.username || 'غير معروف')
                : 'غير معروف'
            }
          : article
      )
    );
  };

  const handleArticleDelete = (articleId) => {
    setArticles(prevArticles => prevArticles.filter(article => (article.id || article._id) !== articleId));
    setTotalArticles(prev => prev - 1);
    if (articles.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1); 
    }
  };

  const handlePageChange = (newPage) => {
    console.log('handlePageChange triggered:', { newPage, searchTerm });
    setCurrentPage(newPage); 
  };

  const handleSearch = (term) => {
    console.log('Search term updated:', term);
    setSearchTerm(term);
    setCurrentPage(1); // إعادة تعيين الصفحة إلى 1 عند البحث
  };

  const adminProfile = {
    name: "محمد علي",
    email: "mohamed.admin@example.com",
    role: "مدير لوحة التحكم",
    language: "العربية",
    timezone: "GMT+2 (القاهرة)",
    twoFactorEnabled: true,
    notificationsEnabled: true,
    avatar: "https://example.com/admin-avatar.jpg",
    joinDate: "01 يناير 2023",
    lastLogin: "14 مارس 2025، 09:00"
  };

  const navItems = [
    { id: "overview", label: "نظرة عامة على اللوحة", icon: <Home size={20} /> },
    { id: "content", label: "إدارة المحتوى", icon: <FileText size={20} /> },
    { id: "users", label: "إدارة المستخدمين", icon: <Users size={20} /> },
    { id: "comments", label: "مراقبة التعليقات", icon: <MessageSquare size={20} /> },
    { id: "reports", label: "لشكاوى والبلاغات", icon: <Flag size={20} /> },
    { id: "videos", label: "ادارة الفيديوهات", icon: <Video size={20} /> },
    { id: "analytics", label: "تحليلات الموقع", icon: <BarChart2 size={20} /> },
    { id: "trending", label: "المحتوى الرائج", icon: <TrendingUp size={20} /> },
    { id: "settings", label: "الإعدادات", icon: <Settings size={20} /> },
    {
      id: "logout",
      label: "تسجيل الخروج",
      icon: <LogOut size={20} />,
      onClick: () => {toast.success("تم تسجيل الخروج بنجاح!", { autoClose: 2000 }),handleLogout()}
    },
  ];

  const renderContent = () => {
    if (loading) return <div className="text-center p-6">جارٍ التحميل...</div>;
    if (error) return <div className="text-center p-6 text-red-600">{error}</div>;

    switch (activeTab) {
      case "overview": return <OverviewSection />;
      case "content":
        return (
          <ContentSection 
            articles={articles} 
            totalArticles={totalArticles}
            currentPage={currentPage}
            totalPages={totalPages}
            onStatusUpdate={handleStatusUpdate} 
            onArticleUpdate={handleArticleUpdate} 
            onArticleDelete={handleArticleDelete}
            onPageChange={handlePageChange}
            onSearch={handleSearch}
          />
        );
      case "comments": return <CommentsSection />;
      case "reports": return <ReportsSection  />;
      case "videos": return <VideosSection />;
      case "users": return <UsersSection />;
      case "analytics": return <AnalyticsSection analytics={analytics} />;
      case "trending": return <TrendingSection />;
      case "settings": return <SettingsSection userProfile={adminProfile} />;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl">
      <Sidebar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">
        <Header activeTab={activeTab} navItems={navItems} />
        {renderContent()}
        <ToastContainer position="top-right" autoClose={3000} rtl={true} />
      </div>
    </div>
  );
};

export default Admin;