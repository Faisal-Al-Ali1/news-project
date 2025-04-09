// components/ArabicNewsLayout/ArabicNewsLayout.jsx
import React from 'react';
import MainFeature from '../MainFeature/MainFeature';
import Sidebar from '../sidebar/saidbar';
import CartoonSection from '../CartoonSection/CartoonSection';

function ArabicNewsLayout() {
  return (
    <div className=" mt-10 font-sans" dir="rtl">
    
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
        <div className=" border-gray-300 pb-4 mb-8">
           <h2 className="text-2xl font-bold text-gray-900"></h2>
         </div>
          <div className="w-full lg:w-3/4 ">
            <MainFeature />
            </div>
          <div className="w-full lg:w-1/4">
            <Sidebar />
          </div>
          </div>

      </div>
    </div>
  );
}

export default ArabicNewsLayout;