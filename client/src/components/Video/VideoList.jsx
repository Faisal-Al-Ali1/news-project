import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/videos');
        setVideos(response.data);
      } catch (err) {
        console.error('Error fetching videos:', err); // طباعة الخطأ بالتفصيل
        setError('فشل في تحميل مقاطع الفيديو');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">مقاطع الفيديو الوثائقية</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Link to={`/video/${video._id}`} key={video._id}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <iframe
                src={video.embedUrl} // تأكد من أن embedUrl يحتوي على الرابط القابل للتضمين
                className="w-full h-64 object-cover"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{video.title}</h2>
                <p className="text-gray-600">{video.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoList;