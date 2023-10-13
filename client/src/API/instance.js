import axios from 'axios';
import { useSelector } from 'react-redux';

const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
});

instance.interceptors.request.use((config) => {
  const token = useSelector((state) => state.authorization.token);
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      Authorization: token,
    };
  }
  return config;
});

export default instance;
