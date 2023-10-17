import axios from 'axios';

let store;

export const injectStore = (_store) => {
  store = _store;
};

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});

instance.interceptors.request.use((config) => {
  if (store.getState().authorization && store.getState().authorization.token) {
    console.log('Validation is success');
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = store.getState().authorization.token;
  }
  return config;
}, (error) => {
  console.warn('Something went wrong in axios interceptors', `Request error: ${error}`);
  return Promise.reject(error);
});
