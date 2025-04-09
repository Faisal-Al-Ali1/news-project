// import React from "react";

// const HeroSection = () => {
//   return (
//     <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
//       {/* خلفية الفيديو */}
//       <video
//         className="absolute top-0 left-0 w-full h-full object-cover"
//         autoPlay
//         loop
//         muted
//       >
//         <source src="/hero.mp4" type="video/mp4" />
//       </video>
// {/* طبقة شفافة مع تأثير الزجاج */}


//       {/* المحتوى */}
//       <div className="relative text-center text-white z-10 px-6 md:px-12">
//         <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
//           اكتشف العوالم المخفية
//         </h1>
//         <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
//           استكشف ثقافات غير معروفة، وقبائل غامضة، وتقاليد فريدة من نوعها حول
//           العالم.
//         </p>

//         {/* زر الاستكشاف */}
//         <a
//           href="#explore"
//           className="mt-6 inline-block bg-yellow-500 text-black px-6 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-400 transition duration-300"
//         >
//           استكشف الآن
//         </a>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen bg-[#213058] overflow-hidden">
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 "></div>
      
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('pexels-burak-karaduman-712806-1549326.jpg')] bg-center bg-cover opacity-70"></div>
      
      {/* Light rays effect */}
      <div className="absolute inset-0 bg-[url('/light-rays.png')] bg-no-repeat bg-center opacity-50 z-0"></div>
      
      {/* Content container */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-start justify-center text-right">
        {/* Logo/Channel name */}
        <div className="text-white font-bold text-xl mb-4 opacity-90">مَشْهَد  </div>
        
        {/* Ramadan badge */}
        <div className="bg-[#F4AE3F] text-white px-3 py-1 rounded-md text-sm font-bold mb-3">رمضان 2025</div>
        
        {/* Title */}
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">رحلة في قلب الواقع، تُلهم وتُغيّر
        </h1>
        
        {/* Culture/theme label */}
        <div className="text-white opacity-80 mb-2">ثقافة</div>
        
        {/* Description */}
        <p className="text-white opacity-90 max-w-lg text-lg leading-relaxed mb-8">
          تعرف على أبرز المساجد التاريخية في السعودية. برنامج يستكشف التاريخ 
          العريق والمعمار الفريد الذي يميز تلك المساجد في السعودية. ينتقل 
          البرنامج بين مختلف المدن لتوثيق هذه المعالم الدينية، مع تسليط الضوء 
          على دورها في تاريخ السعودية وحياة المجتمع الإسلامي.
        </p>
        
        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <button className="bg-[#F4AE3F] hover:bg-[#ffbc50] text-white px-6 py-3 rounded-md flex items-center gap-2 font-bold transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            شاهد الآن
          </button>
          
          <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-md flex items-center justify-center transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
          
          <button className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-md flex items-center justify-center transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;