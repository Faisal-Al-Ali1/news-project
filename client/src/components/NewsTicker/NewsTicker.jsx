
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Play, Pause, Mic } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // استيراد Link

const API_BASE_URL = "http://localhost:8000/api"; // رابط الـ API
const LATEST_ARTICLES_ENDPOINT = `${API_BASE_URL}/last`;
const RADIO_API_ENDPOINT = `${API_BASE_URL}/radios`;

export default function NewsTicker() {
  const [news, setNews] = useState([]); // الأخبار العاجلة
  const [isPlaying, setIsPlaying] = useState(false);
  const [radioUrl, setRadioUrl] = useState("https://montecarlodoualiya128k.ice.infomaniak.ch/mc-doualiya.mp3"); // رابط البث المباشر الصحيح
  const audioRef = useRef(null); // مرجع لكائن الصوت
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔄 تحميل الأخبار عند فتح الصفحة
  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await axios.get(LATEST_ARTICLES_ENDPOINT);
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching latest articles:", error);
        setError("حدث خطأ أثناء جلب المقالات");
        setLoading(false);
      }
    };

    fetchLatestArticles();
  }, []);

  // 🔄 تغيير الأخبار كل 2 ثانية
  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [news]);

  // 🔄 جلب رابط الراديو عند تحميل الصفحة
  useEffect(() => {
    const fetchRadioStream = async () => {
      try {
        const response = await axios.get(RADIO_API_ENDPOINT);
        if (response.data.length > 0) {
          setRadioUrl(response.data[0].streamUrl);
        }
      } catch (error) {
        console.error("Error fetching radio stream:", error);
      }
    };

    fetchRadioStream();
  }, []);

  // ✅ تشغيل وإيقاف الراديو
  const handlePlayPause = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(radioUrl);
      audioRef.current.crossOrigin = "anonymous";
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.error("Audio play error:", error));
    }

    setIsPlaying(!isPlaying);
  };

  // ✅ تنظيف الصوت عند تفكيك المكون
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-between w-full bg-gradient-to-r from-[#213058] via-[#213058] to-[#28696A] nbg-from-[#28696A] via-[#213058] to-[#213058]backdrop-blur-sm text-white py-3 px-4 text-sm border-b border-gray-700/60 shadow-md">
      {/* شريط الأخبار */}
      <div className="flex items-center">
        <span className="text-[#F4AE3F] font-bold ml-3">آخر الأخبار</span>
        <span className="text-gray-400 mx-2">|</span>

        {loading ? (
          <p className="text-gray-400">جارٍ تحميل الأخبار...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : news.length > 0 ? (
          <motion.div
            key={currentNewsIndex}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`/news/${news[currentNewsIndex]._id}`} className="text-white hover:text-[#c8a163] transition">
              {news[currentNewsIndex].title}
            </Link>
          </motion.div>
        ) : (
          <p className="text-gray-400">لا توجد أخبار متاحة</p>
        )}
      </div>

      {/* مشغل الراديو */}
      <div className="flex items-center text-gray-300">
        <Mic size={16} className="ml-2 text-[#F4AE3F]" />
        <p className="ml-2 font-semibold">استمع إلى "إيجاز" اليوم</p>
        <span className="mx-2 text-gray-400">بث مباشر</span>
        <button 
          className="p-2 bg-gray-800 text-white rounded-full hover:bg-red-600 transition flex items-center justify-center w-8 h-8"
          onClick={handlePlayPause}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>
    </div>
  );
}
