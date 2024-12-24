import axios from "axios";

const API_URL = "http://localhost:8000/products/";

export const fetchProducts = async ({ category, sort, searchQuery, skip = 0, limit = 10 }) => {
  console.log("Fetching products with params:", { category, sort, searchQuery });
  const response = await axios.get(API_URL, { 
    params: { category, sort, search: searchQuery, skip, limit }, 
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }); 
  console.log("Fetched products response:", response.data); 
  return response.data; };

export const fetchProductById = async (id) => {
  console.log("Token:", localStorage.getItem("token"));
  const response = await axios.get(`${API_URL}${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(API_URL, product, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const updateProduct = async (id, product) => {
  console.log("Token:", localStorage.getItem("token"));
  const response = await axios.put(`${API_URL}${id}`, product, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const updateFavoriteStatus = async (id, is_favorite) => {
  const response = await axios.put(`${API_URL}${id}/favorite`, { is_favorite }, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
