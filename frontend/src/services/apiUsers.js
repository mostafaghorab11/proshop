import axios from '../../node_modules/axios/dist/esm/axios';
import { USERS_URL } from '../constants';

export const getAllUsersApi = async () => {
  const { data, error } = await axios.get(`${USERS_URL}`);
  if (error) throw new Error(error.message);
  return data;
};

export const getUserByIdApi = async (id) => {
  const { data, error } = await axios.get(`${USERS_URL}/${id}`);
  if (error) throw new Error(error.message);
  return data;
};

export const updateUserApi = async (user) => {
  console.log(user);
  const { data, error } = await axios.put(`${USERS_URL}/${user._id}`, user);
  if (error) throw new Error(error.message);
  return data;
};

export const deleteUserApi = async (id) => {
  const { data, error } = await axios.delete(`${USERS_URL}/${id}`);
  if (error) throw new Error(error.message);
  return data;
};
