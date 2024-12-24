import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col w-32 border-r shadow-sm items-center px-2 py-7 bg-gray-800 text-white h-screen">
      <div
        className="mb-4 p-3 bg-blue-500 hover:bg-blue-700 rounded-full flex justify-center items-center cursor-pointer"
        onClick={() => navigate("/add-product")}
      >
        <FaPlus className="text-white" size={20} />
      </div>
      <div className="flex-grow"></div> {/* Spacer to push Logout to the bottom */}
      <div
        className="p-3 bg-red-500 hover:bg-red-700 rounded-full flex justify-center items-center cursor-pointer"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="text-white" size={20} />
      </div>
    </div>
  );
};

export default Sidebar;
