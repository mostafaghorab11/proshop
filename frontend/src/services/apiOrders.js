import axios from '../../node_modules/axios/dist/esm/axios';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const getMyOrders = async () => {
  const { data, error } = await axios.get(`${ORDERS_URL}/myorders`);
  if (error) throw new Error(error.message);
  return data;
};

export const getAllOrdersAdmin = async () => {
  const { data, error } = await axios.get(`${ORDERS_URL}`);
  if (error) throw new Error(error.message);
  return data;
};

export const createOrder = async (order) => {
  const { data, error } = await axios.post(ORDERS_URL, order);
  if (error) throw new Error(error.message);
  return data;
};

export const getOrderById = async (orderId) => {
  const { data, error } = await axios.get(`${ORDERS_URL}/${orderId}`);
  if (error) throw new Error(error.message);
  return data;
};

export const updateOrderAsPaid = async ({ orderId, details }) => {
  const { data, error } = await axios.put(
    `${ORDERS_URL}/${orderId}/pay`,
    details
  );
  if (error) throw new Error(error.message);
  return data;
};

export const updateOrderAsDelivered = async (orderId) => {
  const { data, error } = await axios.put(
    `${ORDERS_URL}/${orderId}/deliver`
  );
  if (error) throw new Error(error.message);
  return data;
};

export const getPayPalClientId = async () => {
  const { data, error } = await axios.get(`${PAYPAL_URL}`);
  if (error) throw new Error(error.message);
  return data;
};
