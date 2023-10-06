export const fixedEncodeURIComponent = (str) => {
  return encodeURIComponent(str.toLowerCase()).replace(/%20/g, '-');
};

export const fixedDecodeURIComponent = (str) => {
  return decodeURIComponent(str.replace(/-/g, '%20'));
};
