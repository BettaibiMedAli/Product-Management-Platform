import React, { useState } from "react";

const Header = ({ onSearch, onFilter, onSort }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    onSearch(query.trim());
  };

  return (
    <header className="h-14 border-b p-4 flex items-center bg-white justify-between">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded w-full"
          value={localSearchQuery}
          onChange={handleSearchChange}
        />
        <button className="absolute right-2 top-2" onClick={() => onSearch(localSearchQuery.trim())}>
          🔍
        </button>
      </div>
      <button
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        onClick={onFilter}
      >
        Filter
      </button>
      <button
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 ml-2"
        onClick={onSort}
      >
        Sort
      </button>
    </header>
  );
};

export default Header;
