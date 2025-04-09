import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'; 
import axios from "axios";
import { 
  User, 
  LogOut, 
  Menu, 
  X, 
  ChevronLeft,
  Home,
  Info,
  MessageSquare,
  Grid,
  Headphones
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, loading } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/auth/logout", {}, { 
        withCredentials: true 
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("فشل في تسجيل الخروج:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-[#28696A] via-[#213058] to-[#213058] h-20 fixed top-0 left-0 right-0 z-50">
        {/* Loading placeholder */}
      </div>
    );
  }

  return (
    <div dir="rtl" className="relative">
      {/* Main Navbar */}
      <nav className="bg-gradient-to-r from-[#28696A] via-[#213058] to-[#213058] text-white py-3 px-4 md:px-6 flex items-center justify-between shadow-lg fixed top-0 left-0 right-0 z-50">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/src/image-logoo-removebg-preview.png"
              alt="شعار الموقع"
              className="w-36 md:w-48 h-14 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-1 space-x-reverse text-sm font-semibold">
          <li>
            <Link className="hover:text-[#F4AE3F] px-3 py-2 rounded-lg hover:bg-white/10 transition-all flex items-center" to="/">
              <Home size={18} className="ml-1" />
              <span>الرئيسية</span>
            </Link>
          </li>
          <li>
            <Link className="hover:text-[#F4AE3F] px-3 py-2 rounded-lg hover:bg-white/10 transition-all flex items-center" to="/about">
              <Info size={18} className="ml-1" />
              <span>من نحن</span>
            </Link>
          </li>
          <li>
            <Link className="hover:text-[#F4AE3F] px-3 py-2 rounded-lg hover:bg-white/10 transition-all flex items-center" to="/contact">
              <MessageSquare size={18} className="ml-1" />
              <span>تواصل معنا</span>
            </Link>
          </li>
          <li>
            <Link className="hover:text-[#F4AE3F] px-3 py-2 rounded-lg hover:bg-white/10 transition-all flex items-center" to="/categories">
              <Grid size={18} className="ml-1" />
              <span>التصنيفات</span>
            </Link>
          </li>
          <li>
            <Link className="hover:text-[#F4AE3F] px-3 py-2 rounded-lg hover:bg-white/10 transition-all flex items-center" to="/videos">
              <Headphones size={18} className="ml-1" />
              <span>بودكاست</span>
            </Link>
          </li>
        </ul>

        {/* Right Side Elements */}
        <div className="flex items-center space-x-2 space-x-reverse">
          {user ? (
            <div className="flex items-center space-x-2 space-x-reverse">
              <Link
                to="/profile"
                className="relative group ml-3"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 backdrop-blur-md border-2 border-[#F4AE3F] flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-[#F4AE3F]/30 group-hover:scale-105">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="User Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="text-white/90" size={22} />
                  )}
                </div>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F4AE3F]/20 to-[#F4AE3F]/0 animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center bg-gradient-to-r from-[#F0E6D7] to-[#F0E6D7] hover:from-[#F4AE3F] hover:to-[#F4AE3F] text-[#213058] hover:text-white px-3 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <LogOut className="ml-1" size={18} />
                <span className="hidden md:block text-sm font-medium">تسجيل الخروج</span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2 space-x-reverse">
              <Link
                to="/login"
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-2 ml-3 rounded-lg hover:bg-[#F4AE3F] hover:border-[#F4AE3F] transition-all duration-300 shadow-md font-medium text-sm"
              >
                تسجيل دخول
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-[#F4AE3F] to-[#F0E6D7] text-[#213058] px-4 py-2 rounded-lg hover:from-[#F4AE3F] hover:to-[#F4AE3F] hover:text-white transition-all duration-300 shadow-md font-medium text-sm"
              >
                إنشاء حساب
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none bg-white/10 backdrop-blur-md hover:bg-[#F4AE3F] p-2 rounded-lg text-white transition-all duration-300 border border-white/20"
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isOpen ? (
              <X className="w-5 h-5 mr" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#213058]/95 to-[#28696A]/95 backdrop-blur-md text-white p-4 space-y-2 shadow-lg fixed top-20 right-0 left-0 z-40 animate-fadeIn rounded-b-lg border-t border-white/10">
          <Link
            to="/"
            className="flex items-center justify-between text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              <Home size={18} className="ml-2" />
              <span>الرئيسية</span>
            </div>
            <ChevronLeft size={18} />
          </Link>
          <Link
            to="/about"
            className="flex items-center justify-between text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              <Info size={18} className="ml-2" />
              <span>من نحن</span>
            </div>
            <ChevronLeft size={18} />
          </Link>
          <Link
            to="/contact"
            className="flex items-center justify-between text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              <MessageSquare size={18} className="ml-2" />
              <span>تواصل معنا</span>
            </div>
            <ChevronLeft size={18} />
          </Link>
          <Link
            to="/categories"
            className="flex items-center justify-between text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              <Grid size={18} className="ml-2" />
              <span>التصنيفات</span>
            </div>
            <ChevronLeft size={18} />
          </Link>
          <Link
            to="/videos"
            className="flex items-center justify-between text-sm font-medium hover:bg-[#F4AE3F] p-3 rounded-lg transition-all"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center">
              <Headphones size={18} className="ml-2" />
              <span>بودكاست</span>
            </div>
            <ChevronLeft size={18} />
          </Link>

          {/* Auth Links */}
          {user ? (
            <div className="space-y-2 mt-3 border-t border-white/10 pt-3">
              <Link
                to="/profile"
                className="flex items-center justify-between text-sm hover:bg-[#F4AE3F] p-3 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <div className="bg-white/10 p-2 rounded-full mr-2">
                    <User className="w-4 h-4" />
                  </div>
                  <span>البروفايل</span>
                </div>
                <ChevronLeft size={18} />
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between text-sm hover:bg-[#F4AE3F] p-3 rounded-lg transition-all"
              >
                <div className="flex items-center">
                  <div className="bg-white/10 p-2 rounded-full mr-2">
                    <LogOut className="w-4 h-4 ml" />
                  </div>
                  <span>تسجيل الخروج</span>
                </div>
                <ChevronLeft size={18} />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mt-3 border-t border-white/10 pt-3">
              <Link
                to="/login"
                className="text-center text-sm bg-white/10 backdrop-blur-md text-white py-2.5 rounded-lg hover:bg-[#F4AE3F] transition-all font-medium border border-white/20"
                onClick={() => setIsOpen(false)}
              >
                تسجيل دخول
              </Link>
              <Link
                to="/register"
                className="text-center text-sm bg-gradient-to-r from-[#F4AE3F] to-[#F0E6D7] text-[#213058] py-2.5 rounded-lg hover:from-[#F4AE3F] hover:to-[#F4AE3F] hover:text-white transition-all font-medium"
                onClick={() => setIsOpen(false)}
              >
                إنشاء حساب
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="pt-20"></div>
    </div>
  );
};

export default Navbar;