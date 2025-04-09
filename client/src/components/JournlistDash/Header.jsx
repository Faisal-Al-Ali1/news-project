import React from "react";
import { FaBars, FaBell } from "react-icons/fa";

export default function Header({ toggleSidebar }) {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6" dir="rtl">
      {/* Left Section (Hamburger Menu for Mobile) */}
      <div className="flex items-center">
        {/* Hamburger Menu (Mobile Only) */}
        <button
          className="sm:hidden text-[#E3007E] hover:text-[#C4006A] transition-colors"
          onClick={toggleSidebar}
          aria-label="فتح القائمة الجانبية"
        >
          <FaBars className="w-5 h-5" />
        </button>
      </div>

      {/* Right Section (Notifications and Profile) */}
      <div className="flex items-center space-x-3 sm:space-x-5">
        {/* Notification Bell */}
        <button className="relative text-gray-500 hover:text-indigo-600 transition-colors">
          <FaBell className="w-5 h-5" />
          {/* Notification Indicator */}
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Profile Picture */}
        <img
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-indigo-500/30 hover:border-indigo-500 transition-colors cursor-pointer"
          src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
          alt="صورة المدير"
        />
      </div>
    </header>
  );
}