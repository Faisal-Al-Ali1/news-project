import React, { useState } from 'react';
import { Edit, Trash, Check, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify'; 

const ActionButtons = ({ status, articleId, article, onStatusUpdate, onArticleUpdate, onArticleDelete }) => {
  const API_BASE_URL = "http://localhost:8000/admin";
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: article.title,
    content: article.content,
  });

  const updateStatus = async (newStatus) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/articles/${articleId}/status`, { status: newStatus },{withCredentials: true});
      const updatedArticle = response.data;
      toast.success(`تم تحديث الحالة إلى: ${newStatus === 'published' ? 'منشور' : 'مرفوض'}`, { autoClose: 2000 });
      if (onStatusUpdate) {
        onStatusUpdate(articleId, newStatus, updatedArticle);
      }
    } catch (err) {
      toast.error('فشل في تحديث الحالة', { autoClose: 2000 });
      console.error(err.response?.data || err.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/articles/${articleId}`,editData ,{withCredentials: true});
      const updatedArticle = response.data;
      toast.success('تم تعديل المقال بنجاح', { autoClose: 2000 });
      if (onArticleUpdate) {
        onArticleUpdate(articleId, updatedArticle);
      }
      setIsEditing(false);
    } catch (err) {
      toast.error('فشل في تعديل المقال', { autoClose: 2000 });
      console.error(err.response?.data || err.message);
    }
  };

  const deleteArticle = async () => {
    if (window.confirm('هل أنت متأكد من حذف هذا المقال؟')) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/articles/${articleId}`,{withCredentials: true});
        toast.success('تم حذف المقال بنجاح', { autoClose: 2000 });
        if (onArticleDelete) {
          onArticleDelete(articleId);
        }
      } catch (err) {
        toast.error('فشل في حذف المقال', { autoClose: 2000 });
        console.error(err.response?.data || err.message);
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <button 
        className="p-1 text-blue-600 hover:text-blue-800" 
        title="تعديل"
        onClick={() => setIsEditing(true)}
      >
        <Edit size={18} />
      </button>
      <button 
        className="p-1 text-red-600 hover:text-red-800" 
        title="حذف"
        onClick={deleteArticle}
      >
        <Trash size={18} />
      </button>
      {status !== 'منشور' && (
        <button
          className="p-1 text-green-600 hover:text-green-800"
          title="نشر"
          onClick={() => updateStatus('published')}
        >
          <Check size={18} />
        </button>
      )}
      {status !== 'مرفوض' && (
        <button
          className="p-1 text-yellow-600 hover:text-yellow-800"
          title="رفض"
          onClick={() => updateStatus('rejected')}
        >
          <X size={18} />
        </button>
      )}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">تعديل المقال</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">العنوان</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">المحتوى</label>
                <textarea
                  value={editData.content}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows="4"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;