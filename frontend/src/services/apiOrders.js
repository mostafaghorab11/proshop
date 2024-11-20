import axios from '../../node_modules/axios/dist/esm/axios';
import { ORDERS_URL } from '../constants';

export const getAllOrders = async () => {
  const { data, error } = await axios.get(ORDERS_URL);
  if (error) throw new Error(error.message);
  return data;
};

export const getMyOrders = async () => {
  const { data, error } = await axios.get(`${ORDERS_URL}/myorders`);
  if (error) throw new Error(error.message);
  return data;
};

export const createOrder = async (order) => {
  const { data, error } = await axios.post(ORDERS_URL, order);
  if (error) throw new Error(error.message);
  return data;
};

export const getOrder = async (orderId) => {
  const { data, error } = await axios.get(`${ORDERS_URL}/${orderId}`);
  if (error) throw new Error(error.message);
  return data;
};

export const updateOrderAsPaid = async (orderId) => {
  const { data, error } = await axios.put(`${ORDERS_URL}/${orderId}/pay`);
  if (error) throw new Error(error.message);
  return data;
};