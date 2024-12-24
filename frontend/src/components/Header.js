import React, { useState, useMemo } from "react";
import { debounce } from "../utils/debounce";

const Header = ({ onSearch, onFilter, onSort, onToggleFavorites, showFavorites }) => {

  // Local state to manage the search query
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  // debounced version of the onSearch function to minimize re-renders
  const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

  
  // Handles changes in the search input field
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    debouncedSearch(query.trim());
  };

  return (
    <header className="h-14 border-b p-4 flex items-center bg-white justify-between">
      {/* Left Section: App Title */}
      <div className="flex items-center">
        <h1
          className="cursor-pointer text-xl font-bold text-blue-500"
          onClick={() => (window.location.href = "/")} // Pressing on Title Redirect to the homepage
        >
          Product Management Platform
        </h1>
      </div>

      {/* Center Section: Search and Filter */}
      <div className="flex items-center space-x-4 mx-auto">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="border px-4 py-2 rounded w-64"
            value={localSearchQuery}
            onChange={handleSearchChange}
          />
          {/* Manual trigger for search */}
          <button
            className="absolute right-2 top-2"
            onClick={() => onSearch(localSearchQuery.trim())}
          >
            🔍
          </button>
        </div>

        {/* Filter Button */}
        <button
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          onClick={onFilter}
        >
          Filter
        </button>
      </div>

      {/* Right Section: Favorites and Sort Options */}
      <div className="flex items-center space-x-4">
        {/* Toggle Favorites Button */}
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 min-w-[160px]"
          onClick={onToggleFavorites}
        >
          {showFavorites ? "Show All" : "Show Favorites"} {/* Dynamic button text */}
        </button>

        {/* Sort Dropdown */}
        <select
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          onChange={(e) => onSort(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
