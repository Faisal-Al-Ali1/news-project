
import React from 'react';

const DigiboostLandingPage = () => {
  return (
    <div className="font-sans text-right" dir="rtl">
      {/* Navbar - Sticky */}
      <nav className="bg-gray-900 text-white p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold ml-2">Digiboost</span>
              <div className="bg-teal-400 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="ml-8 border-b-2 border-teal-400">الرئيسية</a>
            <a href="#" className="ml-8 hover:text-teal-400">الخدمات</a>
            <a href="#" className="ml-8 hover:text-teal-400">المشاريع</a>
            <a href="#" className="hover:text-teal-400">من نحن</a>
          </div>
          <div className="flex space-x-reverse space-x-4">
            <button className="border border-white hover:bg-white hover:text-gray-900 text-white px-4 py-2 rounded-md">دعنا نتحدث</button>
            <button className="bg-teal-400 hover:bg-teal-500 text-white px-4 py-2 rounded-md">ابدأ الآن</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-500 text-white py-16">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 px-4">
          <div className="order-1 md:order-1">
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-2">
                نحن <span className="text-teal-400">مبدعون</span>
              </h1>
              <h2 className="text-5xl font-bold">وكالة رقمية</h2>
              <div className="mt-4">
                <p className="text-sm">تأسست عام</p>
                <p className="text-3xl font-bold">2011</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex flex-row-reverse space-x-reverse space-x-10 mt-16">
              <div>
                <p className="text-2xl font-bold">12 <span className="text-teal-400">+</span></p>
                <p className="text-xs">سنوات من<br />الخبرة</p>
              </div>
              <div>
                <p className="text-2xl font-bold">83K <span className="text-teal-400">+</span></p>
                <p className="text-xs">مشروع<br />مكتمل</p>
              </div>
              <div>
                <p className="text-2xl font-bold">4.2K <span className="text-teal-400">+</span></p>
                <p className="text-xs">شركة<br />تثق بنا</p>
              </div>
            </div>
          </div>
          
          <div className="order-2 md:order-2">
            <p className="mb-4">نحن وكالة إبداعية تقدم العديد من الخدمات التي تركز على الجودة والابتكار لأعمالك</p>
            
            {/* Video Section */}
            <div className="relative mt-8 rounded-lg overflow-hidden">
            <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
              <div className="   ">
                <div className="bg-teal-400 rounded-full p-4 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="relative text-center text-white z-10 px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          اكتشف العوالم المخفية
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          استكشف ثقافات غير معروفة، وقبائل غامضة، وتقاليد فريدة من نوعها حول
          العالم.
        </p>

        {/* زر الاستكشاف */}
        <a
          href="#explore"
          className="mt-6 inline-block bg-yellow-500 text-black px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-400 transition duration-300"
        >
          استكشف الآن
        </a>
      </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12">
            <img src="/api/placeholder/120/40" alt="Spotify" className="h-8 opacity-50" />
            <img src="/api/placeholder/120/40" alt="Microsoft" className="h-8 opacity-50" />
            <img src="/api/placeholder/120/40" alt="Google" className="h-8 opacity-50" />
            <img src="/api/placeholder/120/40" alt="YouTube" className="h-8 opacity-50" />
            <img src="/api/placeholder/120/40" alt="Discord" className="h-8 opacity-50" />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="order-2 md:order-1">
              <p className="text-sm text-gray-600 uppercase">من نحن</p>
              <h2 className="text-4xl font-bold mt-2 mb-4">
                لماذا يجب عليك اختيار <span className="text-teal-400">Digiboost</span>
              </h2>
              <p className="text-gray-600 mb-8">
                نحن وكالة رقمية متخصصة في تصميم الويب، تحسين محركات البحث، وإدارة وسائل التواصل الاجتماعي. يعمل فريقنا ذو الخبرة بشكل وثيق مع العملاء لتقديم حلول مخصصة تلبي احتياجاتهم الخاصة.
              </p>
              <button className="text-teal-400 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                اعرف المزيد
              </button>
            </div>
            <div className="order-1 md:order-2">
              <img src="/api/placeholder/500/400" alt="فريق العمل" className="rounded-lg w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigiboostLandingPage;