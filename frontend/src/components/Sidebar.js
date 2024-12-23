import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col w-20 border-r shadow-sm items-center px-1 py-7 bg-gray-800 text-white">
      <button
        className="mb-4 p-2 rounded bg-blue-500 hover:bg-blue-700 w-full text-sm"
        onClick={() => navigate("/add-product")}
      >
        Add
      </button>
      <button
        className="p-2 rounded bg-red-500 hover:bg-red-700 w-full text-sm"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
