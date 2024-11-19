import axios from '../../node_modules/axios/dist/esm/axios';
import { USERS_URL } from '../constants';

const login = async (credentials) => {
  const { email, password } = credentials;
  const { data } = await axios.post(`${USERS_URL}/login`, { email, password });
  return data;
};

const logout = async () => {
  const { data } = await axios.post(`${USERS_URL}/logout`);
  return data;
};

const register = async (credentials) => {
  const { name, email, password } = credentials;
  const { data } = await axios.post(`${USERS_URL}`, {
    name,
    email,
    password,
  });
  return data;
};

const getCurrentUser = async () => {
  const { data, error } = await axios.get(`${USERS_URL}/profile`);
  if (error) throw new Error(error.message);

  return data.user;
};

export { getCurrentUser, login, logout, register };
