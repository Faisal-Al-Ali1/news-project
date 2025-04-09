import React from 'react';
import { Bell } from 'lucide-react';

const Header = ({ activeTab, navItems }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">
        {navItems.find((item) => item.id === activeTab)?.label}
      </h2>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <Bell size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default Header;