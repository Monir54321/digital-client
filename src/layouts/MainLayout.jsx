import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="max-w-[1600px] mx-auto">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default MainLayout;
