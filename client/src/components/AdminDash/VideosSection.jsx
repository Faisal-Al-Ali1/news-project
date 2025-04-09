import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const VideosSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newVideo, setNewVideo] = useState({
    title: '',
    videoUrl: '', // تغيير url إلى videoUrl
    categoryIds: [],
    description: '',
  });
  const [editingVideo, setEditingVideo] = useState(null);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/admin/videos',{withCredentials: true});
      setVideos(response.data.filter((video) => !video.isDeleted));
      setLoading(false);
    } catch (err) {
      setError('فشل في جلب الفيديوهات: ' + (err.response?.data?.error || err.message));
      setLoading(false);
      console.error('Fetch Videos Error:', err);
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/admin/videos' ,{withCredentials: true},newVideo,);
      setVideos((prevVideos) => [...prevVideos, response.data]);
      setNewVideo({ title: '', videoUrl: '', categoryIds: [], description: '' });
      toast.success('تم إضافة الفيديو بنجاح!');
    } catch (error) {
      console.error('Add Video Error:', error.response || error);
      toast.error('فشل في إضافة الفيديو: ' + (error.response?.data?.error || error.message));
    }
  };

 
  const handleUpdateVideo = async (videoId) => {
    try {
      const cleanedVideo = {
        title: editingVideo.title,
        videoUrl: editingVideo.videoUrl, // تغيير url إلى videoUrl
        categoryIds: editingVideo.categoryIds.map((cat) => (typeof cat === 'object' ? cat._id : cat)),
        description: editingVideo.description || '',
      };
      console.log('Data being sent for update:', cleanedVideo); // للتحقق
      const response = await axios.put(`http://localhost:8000/admin/videos/${videoId}`,{withCredentials: true}, cleanedVideo);
      setVideos((prevVideos) =>
        prevVideos.map((video) => (video._id === videoId ? response.data : video))
      );
      setEditingVideo(null);
      toast.success('تم تعديل الفيديو بنجاح!');
    } catch (error) {
      console.error('Update Video Error:', error.response || error);
      toast.error('فشل في تعديل الفيديو: ' + (error.response?.data?.error || error.message));
    }
  };

  
  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:8000/admin/videos/${videoId}`,{withCredentials: true});
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
      toast.success('تم حذف الفيديو بنجاح!');
    } catch (error) {
      toast.error('فشل في حذف الفيديو: ' + (error.response?.data?.error || error.message));
    }
  };

  
  useEffect(() => {
    fetchVideos();
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo((prev) => ({
      ...prev,
      [name]: name === 'categoryIds' ? value.split(',').map((id) => id.trim()) : value,
    }));
  };

  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingVideo((prev) => ({
      ...prev,
      [name]: name === 'categoryIds' ? value.split(',').map((id) => id.trim()) : value,
    }));
  };


  const startEditing = (video) => {
    setEditingVideo({ ...video });
  };

  if (loading) {
    return <div className="text-center p-6">جارٍ التحميل...</div>;
  }
  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">إدارة الفيديوهات</h3>

      {/* نموذج إضافة فيديو جديد */}
      <form onSubmit={handleAddVideo} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={newVideo.title}
            onChange={handleInputChange}
            placeholder="عنوان الفيديو"
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="url"
            name="videoUrl" // تغيير url إلى videoUrl
            value={newVideo.videoUrl}
            onChange={handleInputChange}
            placeholder="رابط الفيديو"
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="categoryIds"
            value={newVideo.categoryIds.join(',')}
            onChange={handleInputChange}
            placeholder="معرفات الفئات (مفصولة بفواصل، مثال: 123abc, 456def)"
            className="border rounded px-3 py-2"
          />
          <input
            type="text"
            name="description"
            value={newVideo.description}
            onChange={handleInputChange}
            placeholder="الوصف"
            className="border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          إضافة فيديو
        </button>
      </form>

      {/* جدول الفيديوهات */}
      {videos.length === 0 ? (
        <div className="text-center p-6">لا توجد فيديوهات متاحة حاليًا.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-right">
                <th className="p-3 text-sm font-semibold">العنوان</th>
                <th className="p-3 text-sm font-semibold">الرابط</th>
                <th className="p-3 text-sm font-semibold">الفئات</th>
                <th className="p-3 text-sm font-semibold">الوصف</th>
                <th className="p-3 text-sm font-semibold">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video._id} className="border-b">
                  {editingVideo && editingVideo._id === video._id ? (
                    <>
                      <td className="p-3">
                        <input
                          type="text"
                          name="title"
                          value={editingVideo.title}
                          onChange={handleEditInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="url"
                          name="videoUrl" // تغيير url إلى videoUrl
                          value={editingVideo.videoUrl}
                          onChange={handleEditInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          name="categoryIds"
                          value={
                            editingVideo.categoryIds
                              .map((cat) => (typeof cat === 'object' ? cat._id : cat))
                              .join(',')
                          }
                          onChange={handleEditInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          name="description"
                          value={editingVideo.description || ''}
                          onChange={handleEditInputChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => handleUpdateVideo(video._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          حفظ
                        </button>
                        <button
                          onClick={() => setEditingVideo(null)}
                          className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                          إلغاء
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3">{video.title || 'غير محدد'}</td>
                      <td className="p-3">
                        <a
                          href={video.videoUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          {video.videoUrl || 'غير محدد'}
                        </a>
                      </td>
                      <td className="p-3">
                        {video.categoryIds?.map((cat) => cat.name || cat).join(', ') || 'غير محدد'}
                      </td>
                      <td className="p-3">{video.description || 'غير محدد'}</td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => startEditing(video)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          حذف
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VideosSection;