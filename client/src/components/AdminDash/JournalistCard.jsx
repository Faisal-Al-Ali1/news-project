import React from 'react';

const JournalistCard = ({ name, specialty, articles, joined }) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{specialty}</p>
        </div>
      </div>
      <div className="text-sm mb-2">
        <p>المقالات: {articles}</p>
        <p>انضم: {joined}</p>
      </div>
      <div className="flex justify-end space-x-2">
        <button className="text-blue-600 text-sm">عرض الملف الشخصي</button>
        <button className="text-red-600 text-sm">تعليق</button>
      </div>
    </div>
  );
};

export default JournalistCard;