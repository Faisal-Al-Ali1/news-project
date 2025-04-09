import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, Upload, Image, Tag, CheckCircle, AlertCircle } from "lucide-react";

const EditArticleModal = ({ isOpen, onClose, article, onArticleUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    featuredImage: null,
    media: [],
    categoryIds: [],
    tags: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  
  useEffect(() => {
    if (isOpen && article) {
      setFormData({
        title: article.title,
        content: article.content,
        featuredImage: null,
        media: [],
        categoryIds: article.categoryIds.map((category) => category._id),
        tags: article.tags.join(","),
      });
      
      
      if (article.featuredImage) {
        setPreviewImage(article.featuredImage);
      } else {
        setPreviewImage(null);
      }
    }
  }, [isOpen, article]);

  
  useEffect(() => {
    if (isOpen) {
      axios
        .get("http://localhost:8000/api/journalist/categories", { withCredentials: true })
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          setError("Failed to fetch categories. Please try again later.");
        });
    }
  }, [isOpen]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        featuredImage: file,
      }));
      
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      media: files,
    }));
  };

  
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      categoryIds: [selectedCategoryId],
    }));
  };

  
  const handleTagsChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("categoryIds", formData.categoryIds[0]);

      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      tagsArray.forEach((tag) => {
        formDataToSend.append("tags", tag);
      });

      if (formData.featuredImage) {
        formDataToSend.append("featuredImage", formData.featuredImage);
      }

      if (formData.media.length > 0) {
        formData.media.forEach((file) => {
          formDataToSend.append("media", file);
        });
      }

      const response = await axios.put(
        `http://localhost:8000/api/journalist/articles/${article._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      
      setSuccess("تم تحديث المقال بنجاح");
      setTimeout(() => {
        onArticleUpdated(response.data);
        onClose();
      }, 1000);
    } catch (error) {
      console.error("Error updating article:", error);
      setError("فشل في تحديث المقال. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* Blurred background overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30" onClick={onClose}></div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-2xl relative z-10 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">تعديل المقال</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center">
            <CheckCircle size={18} className="mr-2" />
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">العنوان</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
              required
              dir="rtl"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">المحتوى</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200"
              rows="6"
              required
              dir="rtl"
            />
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">الصورة الرئيسية</label>
            <div className="flex flex-col gap-3">
              <label className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                <input
                  type="file"
                  name="featuredImage"
                  onChange={handleFeaturedImageChange}
                  className="hidden"
                  accept="image/*"
                />
                <div className="flex flex-col items-center">
                  <Image size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">اختر صورة أو اسحبها وأفلتها هنا</span>
                </div>
              </label>
              
              {/* Image Preview */}
              {previewImage && (
                <div className="relative mt-2 w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img 
                    src={previewImage instanceof File ? URL.createObjectURL(previewImage) : previewImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, featuredImage: null }));
                      setPreviewImage(null);
                    }}
                    className="absolute top-1 right-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md"
                  >
                    <X size={14} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Media Files */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">الوسائط</label>
            <label className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
              <input
                type="file"
                name="media"
                onChange={handleMediaChange}
                className="hidden"
                accept="image/*"
                multiple
              />
              <div className="flex flex-col items-center">
                <Upload size={24} className="text-gray-500 dark:text-gray-400 mb-2" />
                <span className="text-sm text-gray-500 dark:text-gray-400">اختر ملفات متعددة أو اسحبها وأفلتها هنا</span>
                {formData.media.length > 0 && (
                  <span className="mt-2 text-xs text-indigo-600 dark:text-indigo-400">
                    تم اختيار {formData.media.length} ملف
                  </span>
                )}
              </div>
            </label>
          </div>

          {/* Categories Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">التصنيفات</label>
            <div className="relative">
              <select
                value={formData.categoryIds[0] || ""}
                onChange={handleCategoryChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 appearance-none pr-8"
                required
                dir="rtl"
              >
                <option value="" disabled>اختر تصنيفًا</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">الوسوم</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 p-2">
              <Tag size={18} className="text-gray-500 dark:text-gray-400 ml-2" />
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="flex-1 p-1 bg-transparent border-none focus:ring-0 outline-none text-gray-900 dark:text-white"
                placeholder="أدخل الوسوم مفصولة بفاصلة"
                dir="rtl"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">أدخل الوسوم مفصولة بفاصلة (مثال: سياسة، رياضة، فن)</p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus"
              >
               {loading ? "جاري التحديث..." : "تحديث"}
             </button>
           </div>
         </form>
       </div>
     </div>
   );
 };

 export default EditArticleModal;