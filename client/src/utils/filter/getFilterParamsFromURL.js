import qs from 'qs';

const getFilterParamsFromURL = (queryString) => {
  const queryParams = qs.parse(queryString, { ignoreQueryPrefix: true,
    decoder: (str, defaultDecoder) => {
      if (str.startsWith('+')) {
        return str;
      }
      return defaultDecoder(str);
    } });
  return {
    filterCategories: queryParams.filterCategories ? queryParams.filterCategories.split(',') : [],
    isTrending: queryParams.isTrending === 'true',
    rating: queryParams.rating ? Number(queryParams.rating) : null,
    isHealthy: queryParams.isHealthy === 'true',
    isSupreme: queryParams.isSupreme === 'true',
    minPrice: queryParams.minPrice ? parseInt(queryParams.minPrice, 10) : 0,
    maxPrice: queryParams.maxPrice ? parseInt(queryParams.maxPrice, 10) : 30,
    sort: queryParams.sort,
    startPage: Number(queryParams.startPage) || 1,
    perPage: Number(queryParams.perPage) || 10,
  };
};

export default getFilterParamsFromURL;
