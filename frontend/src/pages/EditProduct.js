import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct, fetchProductById } from "../api/Product";

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    is_favorite: false
  });
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const selectedProduct = await fetchProductById(productId);
        if (selectedProduct) setProduct(selectedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        if (error.response) {
          console.error("Error Response:", error.response);
        } else if (error.request) {
          console.error("Error Request:", error.request);
        } else {
          console.error("General Error:", error.message);
        }
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: type === 'checkbox' ? checked : e.target.value  }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(productId, product);
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
      />
      <input
        type="text"
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Product Description"
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Product Price"
      />
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Product Category"
      />
      <input 
        type="checkbox" 
        name="is_favorite" 
        checked={product.is_favorite} 
        onChange={handleChange} 
      />Is Favourite?
      <button type="submit">Update Product</button>
    </form>
  );
};

export default EditProduct;
