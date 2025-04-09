import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#28696A] to-[#213058] text-white py-16 rtl">
      <div className="container mx-auto px-6">
        
        {/* مقدمة قصيرة عن الموقع */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">استكشف العالم من خلال الوثائقيات </h2>
          <p className="max-w-2xl text-lg opacity-90 leading-relaxed">
              أخبار وثائقية في مختلف المجالات، متاحة في أي وقت ومن أي مكان. انضم إلينا واكتشف المعرفة بشكل جديد!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* روابط سريعة */}
          <div className="flex flex-col">
            <h3 className="font-bold text-xl mb-6">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-[#F4AE3F] transition-all duration-300">الرئيسية</Link></li>
              <li><Link to="/about" className="hover:text-[#F4AE3F] transition-all duration-300">من نحن</Link></li>
              <li><Link to="/categories" className="hover:text-[#F4AE3F] transition-all duration-300">التصنيفات</Link></li>
              <li><Link to="/subscriptions" className="hover:text-[#F4AE3F] transition-all duration-300">خطط الاشتراك</Link></li>
              <li><Link to="/contact" className="hover:text-[#F4AE3F] transition-all duration-300">تواصل معنا</Link></li>
              <li><Link to="/faq" className="hover:text-[#F4AE3F] transition-all duration-300">الأسئلة الشائعة</Link></li>
            </ul>
          </div>
          
          {/* حساب المستخدم */}
          <div className="flex flex-col">
            <h3 className="font-bold text-xl mb-6">حسابك</h3>
            <ul className="space-y-3">
              <li><Link to="/signin" className="hover:text-[#F4AE3F] transition-all duration-300">تسجيل الدخول</Link></li>
              <li><Link to="/signup" className="hover:text-[#F4AE3F] transition-all duration-300">إنشاء حساب</Link></li>
              <li><Link to="/profile" className="hover:text-[#F4AE3F] transition-all duration-300">ملفك الشخصي</Link></li>
              <li><Link to="/watchlist" className="hover:text-[#F4AE3F] transition-all duration-300">قائمة المشاهدة</Link></li>
              <li><Link to="/payment" className="hover:text-[#F4AE3F] transition-all duration-300">إدارة الاشتراك</Link></li>
              <li><Link to="/settings" className="hover:text-[#F4AE3F] transition-all duration-300">إعدادات الحساب</Link></li>
            </ul>
          </div>
          
          {/* معلومات الاتصال */}
          <div className="flex flex-col">
            <h3 className="font-bold text-xl mb-6">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3"><FontAwesomeIcon icon={faMapMarkerAlt} /> الأردن - عمان</li>
              <li className="flex items-center gap-3"><FontAwesomeIcon icon={faPhone} /> +962 4 123 4567</li>
              <li className="flex items-center gap-3"><FontAwesomeIcon icon={faEnvelope} /> support@docuhub.com</li>
              <li className="flex items-center gap-3"><FontAwesomeIcon icon={faClock} /> 24/7 دعم فني</li>
            </ul>
          </div>
          
          {/* وسائل التواصل */}
          <div className="flex flex-col">
            <h3 className="font-bold text-xl mb-6">تابعنا</h3>
            <p className="mb-4">ابقَ على اطلاع بآخر الوثائقيات والإصدارات الجديدة.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#F4AE3F]"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
              <a href="#" className="hover:text-[#F4AE3F]"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
              <a href="#" className="hover:text-[#F4AE3F]"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
              <a href="#" className="hover:text-[#F4AE3F]"><FontAwesomeIcon icon={faYoutube} size="2x" /></a>
              <a href="#" className="hover:text-[#F4AE3F]"><FontAwesomeIcon icon={faTiktok} size="2x" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* حقوق النشر */}
      <div className="mt-12 pt-6 border-t border-white border-opacity-20 text-center">
        <p>&copy; {new Date().getFullYear()} DocuHub - جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
};

export default Footer;