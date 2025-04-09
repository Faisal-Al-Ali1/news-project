import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Loader, AlertCircle, Clock, CheckCircle, XCircle, FileText
} from "lucide-react";

export default function Status() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const fetchArticles = async (page) => {
    try {
      const response = await axios.get("http://localhost:8000/api/journalist/status", {
        withCredentials: true,
        params: {
          page: page,
          limit: 6, 
        },
      });
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching article status:", error);
      setError("فشل في تحميل حالة المقالات. يرجى المحاولة مرة أخرى.");
      setLoading(false);
    }
  };

  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  
  const totalArticles = articles.length;
  const pendingCount = articles.filter(article =>
    article.status === "pending" ||
    article.status === "قيد الانتظار").length;
  const publishedCount = articles.filter(article =>
    article.status === "published" ||
    article.status === "تم النشر").length;
  const rejectedCount = articles.filter(article =>
    article.status === "rejected" ||
    article.status === "مرفوض").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-2">
          <Loader className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-gray-600">جاري تحميل حالة المقالات...</p>
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

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-center">حالة المقالات</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 space-x-reverse mb-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            <h3 className="text-gray-500 text-sm">إجمالي المقالات</h3>
          </div>
          <p className="text-3xl font-bold">{totalArticles}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 space-x-reverse mb-2">
            <FileText className="w-5 h-5 text-blue-500" />
            <h3 className="text-gray-500 text-sm">تم النشر</h3>
          </div>
          <p className="text-3xl font-bold">{publishedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 space-x-reverse mb-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <h3 className="text-gray-500 text-sm">قيد الانتظار</h3>
          </div>
          <p className="text-3xl font-bold">{pendingCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 space-x-reverse mb-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <h3 className="text-gray-500 text-sm">مرفوض</h3>
          </div>
          <p className="text-3xl font-bold">{rejectedCount}</p>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {articles.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">لا توجد مقالات لعرضها</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العنوان
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المعرف
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {articles.map((article) => (
                    <tr key={article._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 font-mono">{article._id.substring(0, 8)}...</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={article.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          السابق
        </button>
        <span className="px-4 py-2 mx-1">
          الصفحة {currentPage} من {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          التالي
        </button>
      </div>
    </div>
  );
}


function StatusBadge({ status }) {
  let bgColor, textColor, icon, displayText;

  
  if (status === "pending" || status === "قيد الانتظار") {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-800";
    icon = <Clock size={14} className="text-yellow-600" />;
    displayText = "قيد الانتظار";
  } else if (status === "published" || status === "تم النشر") {
    bgColor = "bg-blue-100";
    textColor = "text-blue-800";
    icon = <FileText size={14} className="text-blue-600" />;
    displayText = "تم النشر";
  } else if (status === "rejected" || status === "مرفوض") {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
    icon = <XCircle size={14} className="text-red-600" />;
    displayText = "مرفوض";
  } else {
    bgColor = "bg-gray-100";
    textColor = "text-gray-800";
    icon = <AlertCircle size={14} className="text-gray-600" />;
    displayText = status;
  }

  return (
    <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${bgColor} ${textColor} inline-flex`}>
      {icon}
      <span className="text-sm font-medium">{displayText}</span>
    </div>
  );
}