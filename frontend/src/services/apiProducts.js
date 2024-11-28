import axios from '../../node_modules/axios/dist/esm/axios';
import { PRODUCTS_URL, UPLOAD_URL } from '../constants';

export const fetchProducts = async (page, limit, keyword) => {
  const { data, error } = await axios.get(`${PRODUCTS_URL}`, {
    params: { page, limit, keyword },
  });
  if (error) throw new Error(error.message);
  return data;
};

export const fetchProduct = async (productId) => {
  const { data, error } = await axios.get(`${PRODUCTS_URL}/${productId}`);
  if (error) throw new Error(error.message);

  return data;
};

export const createProductApi = async () => {
  const { data, error } = await axios.post(`${PRODUCTS_URL}`);
  if (error) throw new Error(error.message);
  return data;
};

// update product api
export const updateProductApi = async (product) => {
  const { data, error } = await axios.put(
    `${PRODUCTS_URL}/${product._id}`,
    product
  );
  if (error) throw new Error(error.message);
  return data;
};

// delete product api
export const deleteProductApi = async (productId) => {
  const { data, error } = await axios.delete(`${PRODUCTS_URL}/${productId}`);
  if (error) throw new Error(error.message);
  return data;
};

// upload image api
export const uploadImageApi = async (image) => {
  const { data, error } = await axios.post(`${UPLOAD_URL}`, image);
  if (error) throw new Error(error.message);

  // should return the image path
  return data;
};

// create review api
export const createReviewApi = async (productId, review) => {
  const { data, error } = await axios.post(
    `${PRODUCTS_URL}/${productId}/reviews`,
    review
  );
  if (error) throw new Error(error.message);
  return data;
};

// get top products api
export const getTopProductsApi = async () => {
  const { data, error } = await axios.get(`${PRODUCTS_URL}/top`);
  if (error) throw new Error(error.message);
  return data;
};
