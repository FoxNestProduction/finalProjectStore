import qs from 'qs';

const getQueryStringFromFilterParams = (filterParams) => {
  const filteredFilterParams = Object.fromEntries(
    Object.entries(filterParams).filter(([key, value]) => {
      return key === 'filterCategories'
        ? value.length !== 0
        : value === 0 || !!value;
    }),
  );

  const queryString = qs.stringify(
    filteredFilterParams,
    { arrayFormat: 'comma', addQueryPrefix: true, encode: false },
  );
  return queryString;
};

export default getQueryStringFromFilterParams;
