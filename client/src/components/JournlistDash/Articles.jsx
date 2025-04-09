import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import AddArticleModal from "./AddArticleModal";
import EditArticleModal from "./EditArticleModal";
import {
  PlusCircle, Edit2, Trash2, Calendar, Clock, Tag,
  Folder, FileText, AlertCircle, CheckCircle, XCircle, Loader
} from "lucide-react";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  
  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const fetchArticles = async (page) => {
    try {
      const response = await axios.get("http://localhost:8000/api/journalist/articles", {
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
      console.error("Error fetching articles:", error);
      setError("فشل في تحميل المقالات. يرجى المحاولة مرة أخرى.");
      setLoading(false);
    }
  };

  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  
  const confirmSoftDelete = (articleId) => {
    setPendingDeleteId(articleId);

    // Find the article title
    const articleToDelete = articles.find(article => article._id === articleId);
    const articleTitle = articleToDelete ? articleToDelete.title : "هذا المقال";

    toast.warn(
      <div className="rtl:text-right">
        <p className="mb-2">هل أنت متأكد من حذف "{articleTitle.substring(0, 20)}..."؟</p>
        <div className="flex justify-between mt-2 rtl:flex-row-reverse">
          <button
            onClick={() => {
              handleSoftDelete(articleId); 
              toast.dismiss(); 
            }}
            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
          >
            نعم، حذف
          </button>
          <button
            onClick={() => {
              setPendingDeleteId(null); 
              toast.dismiss(); 
            }}
            className="bg-gray-200 text-gray-700 py-1 px-3 rounded-md hover:bg-gray-300"
          >
            إلغاء
          </button>
        </div>
      </div>,
      {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        closeButton: false,
        toastId: `delete-${articleId}` 
      }
    );
  };

  const handleSoftDelete = async (articleId) => {
    
    toast.dismiss(`delete-${articleId}`);
    setPendingDeleteId(null);

    try {
      await axios.put(
        `http://localhost:8000/api/journalist/articles/${articleId}/delete`,
        {},
        { withCredentials: true }
      );

      
      fetchArticles(currentPage);

      toast.success("تم حذف المقال بنجاح", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

    } catch (error) {
      console.error("Error soft deleting article:", error);
      toast.error("فشل في حذف المقال. يرجى المحاولة مرة أخرى.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleArticleAdded = (newArticle) => {
    
    fetchArticles(currentPage);

    
    toast.success("تم إضافة المقال بنجاح", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleArticleUpdated = (updatedArticle) => {
    
    fetchArticles(currentPage);

    toast.success("تم تحديث المقال بنجاح", {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  const handleEditClick = (article) => {
    setSelectedArticle(article);
    setIsEditModalOpen(true);
  };

  const translateStatusToArabic = (status) => {
    switch (status) {
      case "pending":
        return "قيد الانتظار";
      case "published":
        return "تم النشر";
      case "rejected":
        return "مرفوض";
      default:
        return status; 
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return { icon: <AlertCircle size={16} />, className: "bg-yellow-100 text-yellow-800" };
      case "published":
        return { icon: <CheckCircle size={16} />, className: "bg-green-100 text-green-800" };
      case "rejected":
        return { icon: <XCircle size={16} />, className: "bg-red-100 text-red-800" };
      default:
        return { icon: <FileText size={16} />, className: "bg-gray-100 text-gray-800" };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center space-y-2">
          <Loader className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-gray-600">جاري تحميل المقالات...</p>
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
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">المقالات</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-sm"
          >
            <PlusCircle size={18} />
            <span>إنشاء مقال جديد</span>
          </button>
        </div>

        {articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-500">لا توجد مقالات بعد</h3>
            <p className="text-gray-400 mt-1">انقر على "إنشاء مقال جديد" للبدء</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => {
                const statusStyle = getStatusStyles(article.status);

                return (
                  <div
                    key={article._id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="relative">
                    <img
                       src={article.featuredImage || "/placeholder-image.jpg"}
                       alt={article.title}
                       className="w-full h-52 object-cover"
                       onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrXDy4aPLecBtaa5IXN-SqKqMksNbzN2cqxyWsV1QhvGO7Eqdpdxh7Tk8hUnVZ00-boXg&usqp=CAU";
                      }}
                     />
                      <div className="absolute top-3 left-3">
                        <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusStyle.className}`}>
                          {statusStyle.icon}
                          <span>{translateStatusToArabic(article.status)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h2 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">{article.title}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{article.content}</p>

                      {/* Display Categories */}
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Folder size={16} className="ml-1 text-gray-400" />
                        <span className="font-medium ml-1">التصنيفات:</span>
                        <div className="truncate">
                          {article.categoryIds.map((category, index) => (
                            <span key={category._id}>
                              {category.name}
                              {index < article.categoryIds.length - 1 ? "، " : ""}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Display Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Tag size={16} className="ml-1 text-gray-400" />
                            <span className="font-medium">الوسوم:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {article.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 3 && (
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                +{article.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Dates */}
                      <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 mb-5">
                        <div className="flex items-center">
                          <Calendar size={14} className="ml-1 text-gray-400" />
                          <div>
                            <span className="block font-medium">تاريخ الإنشاء</span>
                            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="ml-1 text-gray-400" />
                          <div>
                            <span className="block font-medium">آخر تحديث</span>
                            <span>{new Date(article.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons - only for pending articles */}
                      {article.status === "pending" && (
                        <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => handleEditClick(article)}
                            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors duration-200"
                          >
                            <Edit2 size={16} />
                            <span>تعديل المقال</span>
                          </button>
                          <button
                            onClick={() => confirmSoftDelete(article._id)}
                            className={`flex items-center gap-1 text-red-500 hover:text-red-700 font-medium text-sm transition-colors duration-200 ${
                              pendingDeleteId === article._id ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={pendingDeleteId === article._id}
                          >
                            <Trash2 size={16} />
                            <span>حذف المقال</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
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
          </>
        )}
      </div>

      {/* Add Article Modal */}
      <AddArticleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onArticleAdded={handleArticleAdded}
      />

      {/* Edit Article Modal */}
      {selectedArticle && (
        <EditArticleModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          article={selectedArticle}
          onArticleUpdated={handleArticleUpdated}
        />
      )}

      {/* Toast Container */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}