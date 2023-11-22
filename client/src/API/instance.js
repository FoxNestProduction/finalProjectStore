import axios from 'axios';

let store;

export const injectStore = (_store) => {
  store = _store;
};

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  if (store.getState().authorization && store.getState().authorization.token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = store.getState().authorization.token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
