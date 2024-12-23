import React from "react";
import { useNavigate } from "react-router-dom";
import ProductRow from "./ProductRow";
import { deleteProduct } from "../api/Product";

const ProductList = ({ products, onProductDeleted, onFavorite }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      alert("Product deleted successfully!");
      onProductDeleted(id);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <div>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onFavorite={onFavorite} // Pass onFavorite here
          />
        ))
      )}
    </div>
  );
};

export default ProductList;
