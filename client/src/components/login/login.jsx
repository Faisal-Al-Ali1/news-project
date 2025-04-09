import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { UserCircle, Mail, Lock } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cameraPosition, setCameraPosition] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setCameraPosition((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signin",
        { email, password },
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

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-hidden">
      {/* Left Panel with Animated Film Elements (colleague's design) */}
      <div className="hidden md:flex md:w-1/2 bg-[#213058] flex-col justify-center items-center p-8 relative">
        {/* Film Strip */}
        <div className="absolute top-0 left-0 w-full h-16 flex overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="h-full w-16 border-r border-[#F4AE3F] flex flex-col"
            >
              <div className="h-1/3 border-b border-[#F4AE3F]"></div>
              <div className="h-1/3 border-b border-[#F4AE3F]"></div>
              <div className="h-1/3"></div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-16 flex overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="h-full w-16 border-r border-[#F4AE3F] flex flex-col"
            >
              <div className="h-1/3 border-b border-[#F4AE3F]"></div>
              <div className="h-1/3 border-b border-[#F4AE3F]"></div>
              <div className="h-1/3"></div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="mb-6 relative">
            <div className="absolute w-4 h-4 bg-[#28696A]"></div>
          </div>
          <div className="flex items-center">
            <img
              src="src/image-logoo-removebg-preview.png"
              alt="شعار الموقع"
              className="w-60 h-24 object-contain"
            />
          </div>    
          <div className="w-60 h-1 bg-gradient-to-r from-transparent via-[#F4AE3F] to-transparent mb-20 mt-5"></div>
          <p className="text-white text-2xl max-w-xs leading-relaxed">
            منصة وثائقية تقدم محتوى إبداعي وأخبار حصرية
          </p>
          
          {/* Animated Film Frames */}
          <div className="mt-12 relative">
            <div className="grid grid-cols-3 gap-2 transform rotate-6">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-video bg-[#28696A] rounded overflow-hidden border-2 border-[#F4AE3F] shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-3"
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.8,
                  }}
                >
                  <div className="h-1/4 bg-black/30"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form (with your functionality) */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#213058] via-[#28696A] to-[#F4AE3F]"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#F4AE3F]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#28696A]/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="text-center mb-8 relative">
            <div className="w-16 h-16 bg-gradient-to-br from-[#213058] to-[#28696A] rounded-full flex items-center justify-center mx-auto">
              <UserCircle size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mt-4 text-[#213058]">تسجيل الدخول</h2>
            <p className="text-gray-600 mt-2">مرحبًا بك في عالم الوثائقيات</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-center border-l-4 border-red-500 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <label className="block text-gray-700 text-sm font-medium mb-2 rtl:text-right transition-all duration-300 group-focus-within:text-[#28696A]">
                البريد الإلكتروني
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg group-focus-within:border-[#28696A] transition-all duration-300 overflow-hidden">
                <div className="bg-gray-100 p-3 flex items-center justify-center group-focus-within:bg-[#28696A]/10 transition-all duration-300">
                  <Mail size={20} className="text-gray-500 group-focus-within:text-[#28696A] transition-all duration-300" />
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
              <label className="block text-gray-700 text-sm font-medium mb-2 rtl:text-right transition-all duration-300 group-focus-within:text-[#28696A]">
                كلمة المرور
              </label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg group-focus-within:border-[#28696A] transition-all duration-300 overflow-hidden">
                <div className="bg-gray-100 p-3 flex items-center justify-center group-focus-within:bg-[#28696A]/10 transition-all duration-300">
                  <Lock size={20} className="text-gray-500 group-focus-within:text-[#28696A] transition-all duration-300" />
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

            <div className="flex justify-end">
              <a href="#" className="text-sm text-[#28696A] hover:text-[#18464a] transition-colors">
                نسيت كلمة المرور؟
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[#213058] to-[#28696A] text-white font-medium rounded-lg hover:from-[#18223f] hover:to-[#1d4d4f] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="absolute w-0 h-full bg-white/20 left-0 top-0 group-hover:w-full transition-all duration-700"></span>
              <span className="relative">
                {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </span>
            </button>

            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 flex-shrink text-gray-500">أو</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-0 bg-[#F4AE3F]/10 group-hover:w-full transition-all duration-700"></span>
              <FcGoogle size={24} /> 
              <span className="relative">تسجيل الدخول عبر جوجل</span>
            </button>

            <p className="text-center text-gray-600 mt-4">
              ليس لديك حساب؟{" "}
              <Link
                to="/register"
                className="text-[#28696A] font-semibold hover:text-[#1a4b4c] transition-colors"
              >
                إنشاء حساب
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;