import React, { useState, useMemo } from "react";
import { debounce } from "../utils/debounce";

const Header = ({ onSearch, onFilter, onSort, onToggleFavorites, showFavorites }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  // Create a debounced version of the onSearch function
  const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    debouncedSearch(query.trim());
  };

  return (
    <header className="h-14 border-b p-4 flex items-center bg-white justify-between">
      <div className="flex items-center space-x-4">
        <h1
          className="cursor-pointer text-xl font-bold text-blue-500"
          onClick={() => window.location.href = '/'}
        >
          Product Management Platform
        </h1>
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
        <select
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          onChange={(e) => onSort(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={onToggleFavorites}
        >
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>
    </header>
  );
};

export default Header;
