/* eslint-disable no-undef */

export const setDataToSessionStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const getDataFromSessionStorage = (key) => {
  const data = sessionStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const removeDataFromSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};

export const updateSessionStorageValues = (key, value) => {
  const sessionStorageValues = getDataFromSessionStorage(key);
  if (sessionStorageValues) {
    setDataToSessionStorage(key, { ...sessionStorageValues, ...value });
  } else {
    setDataToSessionStorage(key, { ...value });
  }
};
