// components/CartoonSection.jsx
import React from 'react';

function CartoonSection() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xl font-bold">كاريكاتير</h3>
      </div>
      <div className="p-4">
        <img 
          src="/api/placeholder/800/500" 
          alt="Cartoon image" 
          className="w-full h-64 object-cover mb-4"
        />
        <h4 className="text-lg font-semibold mb-2">أخبار(سودان)؟</h4>
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <button className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            مشاركة
          </button>
          <span>الجمعة 14/03 - 22:00</span>
        </div>
      </div>
      <div className="flex p-4">
        <div className="w-1/4 h-1 bg-gray-300 rounded-full mr-2"></div>
        <div className="w-1/4 h-1 bg-gray-800 rounded-full mr-2"></div>
        <div className="w-1/4 h-1 bg-gray-300 rounded-full mr-2"></div>
        <div className="w-1/4 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}

export default CartoonSection;