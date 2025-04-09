import React from "react";

const Sidebar = ({ navItems, activeTab, setActiveTab }) => {
  const handleClick = (item) => {
    if (item.onClick) {
      item.onClick();
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <div className="w-64 bg-[#213058] shadow-lg h-full">
      <ul className="p-4 space-y-2">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`p-3 cursor-pointer rounded-md transition-all duration-200 ${
              activeTab === item.id 
                ? "bg-white bg-opacity-20 text-black font-medium" 
                : "text-gray-300 hover:bg-white hover:bg-opacity-10"
            }`}
            onClick={() => handleClick(item)}
          >
            <div className="flex items-center">
              {item.icon && <div className="mr-3">{item.icon}</div>}
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;