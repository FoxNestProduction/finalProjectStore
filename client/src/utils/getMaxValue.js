const getMaxValue = (obj) => {
  const values = Object.values(obj);
  return Math.max(...values);
};

export default getMaxValue;
