import React from "react";

const Dashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <p>The product list will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
