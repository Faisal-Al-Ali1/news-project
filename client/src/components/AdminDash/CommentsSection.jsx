import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:8000/admin";

  // جلب التعليقات من الخادم
  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/comments`, { withCredentials: true });
      const formattedComments = response.data.map((comment) => ({
        ...comment,
        id: comment._id, 
        author:
          comment.author && typeof comment.author === "object"
            ? comment.author.full_name || comment.author.username || "غير معروف"
            : "غير معروف",
        articleTitle:
          comment.article && typeof comment.article === "object"
            ? comment.article.title || "غير محدد"
            : "غير مرتبط بمقال",
        videoTitle:
          comment.video && typeof comment.video === "object"
            ? comment.video.title || "غير محدد"
            : "غير مرتبط بفيديو",
        status:
          comment.status === "visible"
            ? "مرئي"
            : comment.status === "hidden"
            ? "مخفي"
            : "مُبلغ عنه",
        date: comment.createdAt
          ? new Date(comment.createdAt).toLocaleDateString("ar-EG")
          : "غير محدد",
      }));
      setComments(formattedComments);
    } catch (err) {
      setError("فشل في جلب التعليقات. يرجى المحاولة لاحقًا.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // تحديث حالة التعليق
  const handleStatusChange = async (commentId, newStatus) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/comments/${commentId}/status`,
        {
          status: newStatus === "مرئي" ? "visible" : newStatus === "مخفي" ? "hidden" : "reported",
        },
        { withCredentials: true }
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, status: newStatus }
            : comment
        )
      );
      toast.success("تم تحديث حالة التعليق بنجاح!");
    } catch (error) {
      toast.error(
        "فشل في تحديث حالة التعليق: " +
          (error.response?.data?.error || error.message)
      );
      console.error("Update Status Error:", error.response || error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  if (loading) {
    return <div className="text-center p-6">جارٍ التحميل...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">مراقبة التعليقات</h2>
      {comments.length === 0 ? (
        <p className="text-gray-500">لا توجد تعليقات متاحة حاليًا.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3">المعرف</th>
                <th className="p-3">المحتوى</th>
                <th className="p-3">المؤلف</th>
                <th className="p-3">مرتبط بـ</th>
                <th className="p-3">الحالة</th>
                <th className="p-3">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
                <tr key={comment.id} className="border-b">
                  <td className="p-3">{index + 1}</td> {/* عرض رقم تسلسلي بدلاً من comment.id */}
                  <td className="p-3">{comment.content.substring(0, 50)}...</td>
                  <td className="p-3">{comment.author}</td>
                  <td className="p-3">
                    {comment.articleTitle !== "غير مرتبط بمقال"
                      ? comment.articleTitle
                      : comment.videoTitle}
                  </td>
                  <td className="p-3">
                    <select
                      value={comment.status}
                      onChange={(e) => handleStatusChange(comment.id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="مرئي">مرئي</option>
                      <option value="مخفي">مخفي</option>
                    </select>
                  </td>
                  <td className="p-3">{comment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;