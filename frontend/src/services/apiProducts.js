import axios from '../../node_modules/axios/dist/esm/axios';

export const fetchProducts = async () => {
  const { data, error } = await axios.get(`/api/products`);
  if (error) throw new Error(error.message);
  return data;
};

export const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/${productId}`);
  return data;
};
