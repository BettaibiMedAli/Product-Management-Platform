import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import { fetchProducts, updateFavoriteStatus } from "../api/Product";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filterParams, setFilterParams] = useState({ category: "", sort: "", searchQuery: "", skip: 0, limit: 10 });
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchProductsData = async () => {
    try {
      console.log("Fetching products with filterParams:", filterParams);
      const response = await fetchProducts(filterParams); // Pass filters to API
      setProducts(response);
      console.log("Products fetched:", response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [filterParams, showFavorites]);

  const handleSearch = (query) => {
    console.log("Search query:", query);
    setFilterParams((prev) => ({ ...prev, searchQuery: query }));
  };

  const handleFilter = () => {
    const category = prompt("Enter category to filter:");
    if (category) {
      setFilterParams((prev) => ({ ...prev, category }));
    }
  };

  const handleSort = (sort) => {
    console.log("Sort order:", sort);
    if (sort === "asc" || sort === "desc") {
      setFilterParams((prev) => ({ ...prev, sort }));
    }
  };

  const handleToggleFavorites = () => {
    setShowFavorites((prev) => !prev);
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

  // Filter products to show only favorites if showFavorites is true
  const displayedProducts = showFavorites ? products.filter((product) => product.is_favorite) : products;

  return (
    <div className="flex w-screen overflow-hidden h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header 
          onSearch={handleSearch} 
          onFilter={handleFilter} 
          onSort={handleSort} 
          onToggleFavorites={handleToggleFavorites} 
          showFavorites={showFavorites}
        />
        <main className="px-4 py-5 w-full flex-grow">
          <ProductList
            products={displayedProducts}
            onProductDeleted={handleProductDeleted}
            onFavorite={handleFavorite}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
