import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Bookmark from "../bookmark/bookmark";
import { User, Mail, Calendar, Bookmark as BookmarkIcon, ChevronRight, Loader2 } from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/auth/profile', {
          withCredentials: true
        });
        
        if (response.data.user) {
          setUser({
            name: response.data.user.full_name,
            email: response.data.user.email,
            createdAt: response.data.user.createdAt,
            bookmarks: response.data.user.bookmarks || []
          });
        }
      } catch (err) {
        setError("فشل في تحميل بيانات الملف الشخصي. يرجى المحاولة مرة أخرى لاحقًا.");
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 max-w-md w-full">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-teal-600" />
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 max-w-md w-full bg-white rounded-xl shadow-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <span className="text-red-500 text-2xl font-bold">!</span>
          </div>
          <p className="text-gray-700 mb-6 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
          >
            حاول مرة أخرى
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('ar-EG', options);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-teal-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-indigo-800 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="w-96 h-96 bg-white/10 rounded-full absolute -top-20 -left-20"></div>
              <div className="w-64 h-64 bg-white/10 rounded-full absolute -bottom-10 -right-10"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
                <User className="text-white w-12 h-12" />
              </div>
              <h1 className="text-3xl font-bold text-white">الملف الشخصي</h1>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Name Field */}
            <div className="flex items-center space-x-reverse space-x-4 mb-6 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition">
              <div className="flex-shrink-0 bg-teal-100 p-3 rounded-xl text-teal-700 ml-2">
                <User size={24} />
              </div>
              <div className="flex-grow">
                <p className="text-sm text-gray-500">الاسم الكامل</p>
                <p className="font-medium text-gray-800 text-xl">{user.name}</p>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center space-x-reverse space-x-4 mb-6 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition">
              <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-xl text-indigo-700 ml-2">
                <Mail size={24} />
              </div>
              <div className="flex-grow">
                <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                <p className="font-medium text-gray-800 text-lg">{user.email}</p>
              </div>
            </div>

            {/* Join Date Field */}
            <div className="flex items-center space-x-reverse space-x-4 mb-6 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition">
              <div className="flex-shrink-0 bg-amber-100 p-3 rounded-xl text-amber-700 ml-2">
                <Calendar size={24} />
              </div>
              <div className="flex-grow">
                <p className="text-sm text-gray-500">تاريخ الانضمام</p>
                <p className="font-medium text-gray-800 text-lg">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>

            {/* Bookmarks Section */}
            <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="flex items-center space-x-reverse space-x-2 text-indigo-800 mb-4">
                <BookmarkIcon size={24} className="text-teal-600 ml-2" />
                <h3 className="font-bold text-xl">العناصر المحفوظة</h3>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <Bookmark bookmarks={user.bookmarks} />
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center bg-white py-2 px-4 rounded-full shadow-md text-teal-700 hover:bg-teal-50 transition"
          >
            <span className="ml-2">العودة إلى الرئيسية</span>
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;