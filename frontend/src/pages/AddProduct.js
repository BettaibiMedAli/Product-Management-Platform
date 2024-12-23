import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/Product";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    is_favorite: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(formData);
    alert("Product added successfully!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="block border p-2 mb-4"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="block border p-2 mb-4"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="block border p-2 mb-4"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="block border p-2 mb-4"
      />
      <label className="block mb-4">
        <input
          type="checkbox"
          name="is_favorite"
          checked={formData.is_favorite}
          onChange={(e) =>
            setFormData({ ...formData, is_favorite: e.target.checked })
          }
        />
        Favorite
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
