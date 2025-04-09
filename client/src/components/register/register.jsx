import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { UserPlus, User, Mail, Lock } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clapOpen, setClapOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setClapOpen(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signup",
        { full_name, email, password },
        { withCredentials: true }
      );
      
      const { user } = response.data;
      setUser(user); 
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "journalist") {
        navigate("/journalist");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Left Panel with Animated Film Elements (colleague's design) */}
      <div className="hidden md:flex md:w-1/2 bg-[#28696A] flex-col justify-center items-center p-8 relative">
        <div className="text-center">
          <div className="flex items-center">
            <img
              src="src/image-logoo-removebg-preview.png"
              alt="شعار الموقع"
              className="w-60 h-24 object-contain"
            />
          </div>            
          <div className="w-60 h-1 bg-gradient-to-r from-transparent via-[#F4AE3F] to-transparent mb-20 mt-6"></div>
          
          {/* Animated Film Clapperboard */}
          <div className="w-64 h-40 bg-[#213058] rounded-lg shadow-xl relative mx-auto mb-8 overflow-hidden">
            <div 
              className={`absolute top-0 left-0 w-full h-10 bg-black transition-transform duration-700 ease-in-out ${clapOpen ? 'translate-y-0' : 'translate-y-4'}`}
              style={{ transformOrigin: 'top' }}
            >
              <div className="flex justify-between px-4 h-full items-center">
                <div className="h-3 w-3 bg-[#F4AE3F] rounded-full"></div>
                <div className="h-3 w-3 bg-[#F4AE3F] rounded-full"></div>
                <div className="h-3 w-3 bg-[#F4AE3F] rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-center items-center h-full">
              <span className="text-[#F4AE3F] text-2xl font-bold">DOCUMENTARY</span>
            </div>
            
            {/* Film strip pattern */}
            <div className="absolute bottom-0 left-0 w-full h-8 flex">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex-1 border-r border-[#F4AE3F] h-full"></div>
              ))}
            </div>
          </div>
          
          <p className="text-white text-lg max-w-xs leading-relaxed">
            انضم إلينا واكتشف عالمًا من الوثائقيات والقصص الحقيقية المثيرة
          </p>
        </div>
        
        {/* Moving film strip at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-8 flex overflow-hidden">
          <div className="flex animate-marquee">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-16 h-full flex flex-col border-r border-[#F4AE3F]">
                <div className="h-1/2 border-b border-[#F4AE3F] flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#F4AE3F] rounded-full"></div>
                </div>
                <div className="h-1/2"></div>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee2">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-16 h-full flex flex-col border-r border-[#F4AE3F]">
                <div className="h-1/2 border-b border-[#F4AE3F] flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#F4AE3F] rounded-full"></div>
                </div>
                <div className="h-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form (with your functionality) */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F4AE3F] via-[#28696A] to-[#213058]"></div>
          <div className="absolute top-0 left-0 w-24 h-24 bg-[#28696A]/5 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#F4AE3F]/5 rounded-full translate-y-1/2 translate-x-1/2"></div>
          
          <div className="text-center mb-8 relative">
            <div className="w-16 h-16 bg-gradient-to-br from-[#F4AE3F] to-[#28696A] rounded-full flex items-center justify-center mx-auto">
              <UserPlus size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mt-4 text-[#28696A]">إنشاء حساب</h2>
            <p className="text-gray-600 mt-2">كن جزءًا من مجتمع الوثائقيات</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-center border-l-4 border-red-500 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <label className="block text-gray-700 text-sm font-medium mb-2 rtl:text-right transition-all duration-300 group-focus-within:text-[#F4AE3F]">
                الاسم الكامل
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg group-focus-within:border-[#F4AE3F] transition-all duration-300 overflow-hidden">
                <div className="bg-gray-100 p-3 flex items-center justify-center group-focus-within:bg-[#F4AE3F]/10 transition-all duration-300">
                  <User size={20} className="text-gray-500 group-focus-within:text-[#F4AE3F] transition-all duration-300" />
                </div>
                <input
                  type="text"
                  required
                  value={full_name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-3 px-3 outline-none text-right"
                  placeholder="أدخل اسمك الكامل"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-gray-700 text-sm font-medium mb-2 rtl:text-right transition-all duration-300 group-focus-within:text-[#F4AE3F]">
                البريد الإلكتروني
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg group-focus-within:border-[#F4AE3F] transition-all duration-300 overflow-hidden">
                <div className="bg-gray-100 p-3 flex items-center justify-center group-focus-within:bg-[#F4AE3F]/10 transition-all duration-300">
                  <Mail size={20} className="text-gray-500 group-focus-within:text-[#F4AE3F] transition-all duration-300" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-3 px-3 outline-none text-right"
                  placeholder="أدخل بريدك الإلكتروني"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-gray-700 text-sm font-medium mb-2 rtl:text-right transition-all duration-300 group-focus-within:text-[#F4AE3F]">
                كلمة المرور
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg group-focus-within:border-[#F4AE3F] transition-all duration-300 overflow-hidden">
                <div className="bg-gray-100 p-3 flex items-center justify-center group-focus-within:bg-[#F4AE3F]/10 transition-all duration-300">
                  <Lock size={20} className="text-gray-500 group-focus-within:text-[#F4AE3F] transition-all duration-300" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 px-3 outline-none text-right"
                  placeholder="أدخل كلمة المرور"
                  dir="rtl"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#F4AE3F] to-[#28696A] text-white font-medium rounded-lg hover:from-[#d99a2c] hover:to-[#1d4d4f] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute w-0 h-full bg-white/20 right-0 top-0 group-hover:w-full transition-all duration-700"></span>
              <span className="relative">
                {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
              </span>
            </button>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 flex-shrink text-gray-500">أو</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-0 bg-[#28696A]/10 group-hover:w-full transition-all duration-700"></span>
              <FcGoogle size={24} /> 
              <span className="relative">التسجيل عبر جوجل</span>
            </button>

            <p className="text-center text-gray-600 mt-4">
              هل لديك حساب بالفعل؟{" "}
              <Link
                to="/login"
                className="text-[#F4AE3F] font-semibold hover:text-[#d99a2c] transition-colors"
              >
                تسجيل الدخول
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;