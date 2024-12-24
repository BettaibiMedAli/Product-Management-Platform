import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/Product";

const AddProduct = () => {

  // state for form data 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    is_favorite: false,
  });

  // state for validation errors
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  // validation logic
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (formData.price <= 0) newErrors.price = "Price must be greater than zero.";
    if (!formData.category) newErrors.category = "Category is required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      await createProduct(formData);
      alert("Product added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="min-h-screen bg-add-bg bg-cover bg-center flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-xl p-8 shadow-lg rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-black">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-lg ${errors.name && 'border-red-500'}`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-black">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-lg ${errors.description && 'border-red-500'}`}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-black">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-lg ${errors.price && 'border-red-500'}`}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          {/* Category Input */}
          <div>
            <label className="block text-black">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-lg ${errors.category && 'border-red-500'}`}
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* Favorite Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_favorite"
              checked={formData.is_favorite}
              onChange={(e) => setFormData({ ...formData, is_favorite: e.target.checked })}
              className="form-checkbox"
            />
            <span className="ml-2 text-black">Favorite</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
