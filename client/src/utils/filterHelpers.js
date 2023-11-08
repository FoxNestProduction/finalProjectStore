import qs from 'qs';

// парсінг query параметрів зі строки і повернення об'єкту з параметрами
export const getParamsFromURL = (queryString) => {
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
    sort: queryParams.sort || '',
    startPage: Number(queryParams.startPage) || 1,
    perPage: Number(queryParams.perPage) || 10,
  };
};

// очищення об'єкту з параметрами від дефолтних значень
export const getParamsFilteredFromDefaultValues = (params) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => {
      return key === 'filterCategories'
        ? value.length !== 0
        : value === 0 || !!value;
    }),
  );

  if (filteredParams.minPrice === 0 && filteredParams.maxPrice === 30) {
    delete filteredParams.minPrice;
    delete filteredParams.maxPrice;
  }
  return filteredParams;
};

// перевірка параметрів на навність параметрів фільтрації
export const checkFiltersInParams = (params) => {
  // якщо параметрів 2 (perPage та startPage будуть завжди) або 3 і серед них є сортування -
  // поверни false так як параметрів фільтрації немає
  return !((Object.keys(params).length === 3 && params.sort)
      || Object.keys(params).length === 2);
};

export const getQueryStringFromParams = (params) => {
  return qs.stringify(
    params,
    { arrayFormat: 'comma', addQueryPrefix: true, encode: false },
  );
};
