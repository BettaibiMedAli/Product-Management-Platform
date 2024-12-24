import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons

const ProductRow = ({ product, onEdit, onDelete, onFavorite }) => {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center">
        <span
          className={`mr-4 cursor-pointer ${
            product.is_favorite ? "text-yellow-500" : "text-gray-400"
          }`}
          onClick={() => onFavorite(product.id)}
        >
          ★
        </span>
        <div className="flex flex-col">
          <span>{product.name}</span>
          <span>Price: {product.price}</span>
          <span>Category: {product.category}</span>
          <span>Description: {product.description}</span>
        </div>
      </div>
      <div className="flex space-x-4">
        {/* Edit Icon with Tooltip */}
        <span
          className="text-green-500 cursor-pointer hover:text-green-700"
          onClick={() => onEdit(product.id)}
          title="Edit Product" // Tooltip added here
        >
          <FaEdit size={24} />
        </span>
        {/* Delete Icon with Tooltip */}
        <span
          className="text-red-500 cursor-pointer hover:text-red-700"
          onClick={() => onDelete(product.id)}
          title="Delete Product" // Tooltip added here
        >
          <FaTrash size={24} />
        </span>
      </div>
    </div>
  );
};

export default ProductRow;
