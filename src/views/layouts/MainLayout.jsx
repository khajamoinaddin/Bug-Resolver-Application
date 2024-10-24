import React from "react";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex w-full h-full bg-gray-40 gap-4">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="w-full h-full max-h-screen overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
