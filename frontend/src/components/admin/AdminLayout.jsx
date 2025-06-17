import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#E7E7E8]">
      {/* Main Container */}
      <div className="h-full">
        <div className="flex h-full">
          {/* Sidebar - Fixed width, full height */}
          <div className="w-[280px] min-w-[280px] h-full sticky top-0">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 px-6 py-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
