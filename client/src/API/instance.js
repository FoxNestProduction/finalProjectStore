import axios from 'axios';

let store;

export const injectStore = (_store) => {
  store = _store;
};

export const instance = axios.create({
  baseURL: 'http://localhost:4000/api',
});

instance.interceptors.request.use((config) => {
  if (store.getState().authorization && store.getState().authorization.token) {
    console.log('Validation is success');
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = store.getState().authorization.token;
  }
  return config;
});
