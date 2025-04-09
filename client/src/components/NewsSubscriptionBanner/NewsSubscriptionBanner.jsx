// import React from "react";
// // import { Button } from "@/components/ui/button";
// // import { ArrowLeft } from "lucide-react";

// const NewsSubscriptionBanner = () => {
//   return (
//     <div className="bg-gray-700 text-white p-8 flex flex-col md:flex-row justify-between items-center rounded-xl">
//       <div className="text-center md:text-right">
//         <h2 className="text-2xl font-bold">احصل على أخبار مخصصة لك</h2>
//         <p className="text-sm mt-2">سجل مجانًا في أقل من دقيقة</p>
//       </div>
//       {/* <Button className="mt-4 md:mt-0 flex items-center gap-2 bg-white text-teal-800 hover:bg-gray-200 px-6 py-3 rounded-full shadow-lg">
//         <ArrowLeft size={20} /> سجل الآن
//       </Button> */}
//     </div>
//   );
// };

// export default NewsSubscriptionBanner;
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewsSubscriptionBanner = () => {
  const navigate = useNavigate();

  const handleVideoNavigation = () => {
    navigate('/videos');
  };

  return (
    <div className="bg-gradient-to-r from-[#28696A] via-[#213058] to-[#213058] text-white p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center rounded-lg shadow-md my-8">
      <div className="text-center md:text-right mb-4 md:mb-0">
        <h2 className="text-2xl font-bold">استمع الى البودكاسات المميز</h2>
        <p className="text-sm mt-2 text-gray-300">سجل في أقل من دقيقة</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          onClick={handleVideoNavigation}
          className="bg-[#F4AE3F] hover:bg-red-700 text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 font-bold transition duration-200 shadow-md"
        >
          <ArrowLeft size={18} />
          شاهد الفيديوهات
        </button>
        
        <button 
          className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-3 rounded-md flex items-center justify-center gap-2 font-bold transition duration-200 shadow-md"
        >
          سجل الآن
          
        </button>
      </div>
    </div>
  );
};

export default NewsSubscriptionBanner;