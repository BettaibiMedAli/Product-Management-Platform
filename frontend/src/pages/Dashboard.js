import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import { fetchProducts, updateFavoriteStatus } from "../api/Product";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filterParams, setFilterParams] = useState({ category: "", sort: "", searchQuery: "" });
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [showFavorites, setShowFavorites] = useState(false);
  const PRODUCTS_PER_PAGE = 5; // Number of products per page

  const fetchProductsData = async () => {
    try {
      const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;
      const response = await fetchProducts({
        ...filterParams,
        skip: showFavorites ? 0 : skip, // Reset skip if showing favorites
        limit: showFavorites ? undefined : PRODUCTS_PER_PAGE, // Fetch all favorites
      });
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [filterParams, currentPage, showFavorites]);

  const handleSearch = (query) => {
    setFilterParams((prev) => ({ ...prev, searchQuery: query }));
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleFilter = () => {
    const category = prompt("Enter category to filter:");
    if (category) {
      setFilterParams((prev) => ({ ...prev, category }));
      setCurrentPage(1); // Reset to page 1 on filter
    }
  };

  const handleSort = (sort) => {
    if (sort === "asc" || sort === "desc") {
      setFilterParams((prev) => ({ ...prev, sort }));
      setCurrentPage(1); // Reset to page 1 on sort
    }
  };

  const handleToggleFavorites = () => {
    setShowFavorites((prev) => !prev);
    setCurrentPage(1); // Reset to page 1 when toggling favorites
  };

  const handleProductDeleted = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleFavorite = async (id) => {
    try {
      const product = products.find((p) => p.id === id);
      const updatedProduct = await updateFavoriteStatus(id, !product.is_favorite);
      setProducts(products.map((p) => (p.id === id ? updatedProduct : p)));
    } catch (error) {
      console.error("Error updating favorite status:", error);
      alert("Failed to update favorite status.");
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const displayedProducts = showFavorites
    ? products.filter((product) => product.is_favorite) // Show all favorites
    : products;

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          onToggleFavorites={handleToggleFavorites}
          showFavorites={showFavorites}
        />
        <main className="flex-grow px-4 py-5 relative">
          <ProductList
            products={displayedProducts}
            onProductDeleted={handleProductDeleted}
            onFavorite={handleFavorite}
          />
          <div className="pagination-controls absolute bottom-0 left-0 w-full bg-white p-4 flex justify-between border-t">
            <button
              onClick={prevPage}
              disabled={currentPage === 1 || showFavorites}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={products.length < PRODUCTS_PER_PAGE || showFavorites}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
