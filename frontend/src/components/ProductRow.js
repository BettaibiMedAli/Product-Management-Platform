import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductRow = ({ product, onEdit, onDelete, onFavorite }) => {

  return (
    <div className="flex items-center justify-between border-b py-4">
      {/* Left Section: Favorite and Product Details */}
      <div className="flex items-center">
        {/* Favorite Star */}
        <span
          className={`mr-4 cursor-pointer ${
            product.is_favorite ? "text-yellow-500" : "text-gray-400"
          }`}
          onClick={() => onFavorite(product.id)} // Toggle favorite status
        >
          ★
        </span>
        {/* Product Information */}
        <div className="flex flex-col">
          <span>{product.name}</span>
          <span>Price: {product.price}</span>
          <span>Category: {product.category}</span>
          <span>Description: {product.description}</span>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex space-x-4">
        {/* Edit Icon */}
        <span
          className="text-green-500 cursor-pointer hover:text-green-700"
          onClick={() => onEdit(product.id)}
          title="Edit Product" 
        >
          <FaEdit size={28} />
        </span>

        {/* Delete Icon */}
        <span
          className="text-red-500 cursor-pointer hover:text-red-700"
          onClick={() => onDelete(product.id)}
          title="Delete Product"
        >
          <FaTrash size={26} />
        </span>
      </div>
    </div>
  );
};

export default ProductRow;
