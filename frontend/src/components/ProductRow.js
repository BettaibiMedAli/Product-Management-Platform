import React from "react";

const ProductRow = ({ product, onEdit, onDelete, onFavorite }) => {
  return (
    <div className="flex items-center justify-between border-b py-2">
      <div className="flex items-center">
        <span
          className={`mr-4 cursor-pointer ${product.is_favorite ? "text-yellow-500" : "text-gray-400"}`}
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
      <div className="flex space-x-2">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => onEdit(product.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductRow;
