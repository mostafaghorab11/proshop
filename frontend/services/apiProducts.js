// import axios from '../../node_modules/axios/dist/esm/axios';
import axios from '../node_modules/axios/dist/esm/axios';

export const fetchProducts = async () => {
  const { data } = await axios.get(`/api/products`);
  return data;
};

export const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/${productId}`);
  return data;
};
