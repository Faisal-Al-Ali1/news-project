import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Articles from "./Articles";
import Analytics from "./Analytics";
import Status from "./Status";
import Profile from "./Profile";

export default function JournalistDash() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen relative" dir="rtl">
      {/* Mobile Sidebar Toggle */}
      <button
        className="sm:hidden fixed bottom-4 right-4 z-50 p-3 bg-[#1E293B] text-white rounded-full shadow-lg" // Changed left-4 to right-4 for RTL
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <FaBars className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Content Area */}
        <main className="p-4 sm:p-6 overflow-y-auto space-y-6 sm:space-y-8">
          <Routes>
            <Route path="/" element={<Articles />} /> 
            <Route path="/analytics" element={<Analytics />} /> 
            <Route path="/status" element={<Status />} /> 
            <Route path="/profile" element={<Profile />} /> 
          </Routes>
        </main>
      </div>
    </div>
  );
}