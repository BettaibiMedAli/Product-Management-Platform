import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct, fetchProductById, fetchProducts } from "../api/Product";

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    is_favorite: false,
  });
  const [originalProduct, setOriginalProduct] = useState(null);
  const [errors, setErrors] = useState({});
  const { productId } = useParams();
  const navigate = useNavigate();

  // Fetch product details when the component mounts or when the productId changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const selectedProduct = await fetchProductById(productId);
        if (selectedProduct) {
          setProduct(selectedProduct);
          setOriginalProduct(selectedProduct);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProductDetails();
  }, [productId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate form inputs
  const validate = async () => {
    const newErrors = {};
    if (!product.name) newErrors.name = "Name is required.";
    if (!product.description) newErrors.description = "Description is required.";
    if (product.price <= 0) newErrors.price = "Price must be greater than zero.";
    if (!product.category) newErrors.category = "Category is required.";

    // Check if the product name exists for another product
    const products = await fetchProducts({});
    const nameExists = products.some(
      (p) => p.id !== parseInt(productId) && p.name.toLowerCase() === product.name.toLowerCase()
    );
    if (nameExists) newErrors.name = "Product name already exists.";

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check if the product details have changed
    if (JSON.stringify(product) === JSON.stringify(originalProduct)) {
      alert("Nothing to update!");
      return;
    }

    try {
      await updateProduct(productId, product);
      alert("Product updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-edit-bg bg-cover bg-center flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-xl p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-black">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
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
              value={product.description}
              onChange={handleChange}
              placeholder="Product Description"
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
              value={product.price}
              onChange={handleChange}
              placeholder="Product Price"
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
              value={product.category}
              onChange={handleChange}
              placeholder="Product Category"
              className={`w-full border px-4 py-2 rounded-lg ${errors.category && 'border-red-500'}`}
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          {/* Favorite Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_favorite"
              checked={product.is_favorite}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span className="ml-2 text-black">Favorite</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
