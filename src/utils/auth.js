import jwt from 'jsonwebtoken';
import { getItem, setItem, removeItem } from './storage';

const getAuthToken = () => {
  return getItem('til_auth');
};

const setAuthToken = token => {
  setItem('til_auth', token);
};

const removeAuthToken = () => {
  removeItem('til_auth');
};

const decodeAuthToken = token => {
  return jwt.decode(token);
};

export { getAuthToken, setAuthToken, removeAuthToken, decodeAuthToken };
