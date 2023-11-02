import React, { useEffect } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { stylesSortSelect } from '../ListItems/styles';
import { fetchFilteredProducts, setFilteredProducts, setFilterParams } from '../../redux/slices/filterSlice';
import { fetchSortedProducts, setProducts } from '../../redux/slices/productsSlice';
import getFilterQueryString from '../../utils/filter/getFilterQueryString';
import { instance } from '../../API/instance';

const Sorter = ({ type, itemsFrom }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const filterParams = useSelector((state) => state.filter.filterParams);

  const setSelectedValue = (sort) => {
    switch (sort) {
      case '+currentPrice': return 'Price UP';
      case '-currentPrice': return 'Price DOWN';
      case '+rating': return 'Rating UP';
      case '-rating': return 'Rating DOWN';
      default: return 'Default';
    }
  };

  // const [selectedValueSortBy, setSelectedValueSortBy] = React.useState(setInitialSelectedValue);

  let currencies;

  if (type === 'partners') {
    currencies = [
      {
        value: 'Rating UP',
        label: 'Rating UP',
      },
      {
        value: 'Rating DOWN',
        label: 'Rating DOWN',
      },
      {
        value: 'Default',
        label: 'Default',
      },
    ];
  } else {
    currencies = [
      {
        value: 'Price UP',
        label: 'Price UP',
      },
      {
        value: 'Price DOWN',
        label: 'Price DOWN',
      },
      {
        value: 'Rating UP',
        label: 'Rating UP',
      },
      {
        value: 'Rating DOWN',
        label: 'Rating DOWN',
      },
      {
        value: 'Default',
        label: 'Default',
      },
    ];
  }

  const handleSelectChangeSortBy = (event) => {
    // setSelectedValueSortBy(event.target.value);
    let currentSort = '';

    switch (event.target.value) {
      case 'Price UP':
        dispatch(setFilterParams({ sort: '+currentPrice' }));
        currentSort = '+currentPrice';
        break;

      case 'Price DOWN':
        dispatch(setFilterParams({ sort: '-currentPrice' }));
        currentSort = '-currentPrice';
        break;

      case 'Rating UP':
        dispatch(setFilterParams({ sort: '+rating' }));
        currentSort = '+rating';
        break;

      case 'Rating DOWN':
        dispatch(setFilterParams({ sort: '-rating' }));
        currentSort = '-rating';
        break;

      default:
        dispatch(setFilterParams({ sort: '' }));
        currentSort = '';
    }

    // dispatch(setFilterParams({ sort: currentSort }));

    if (itemsFrom === 'filter') {
      console.log('get filtered products from sorter1');
      const updatedFilterParams = { ...filterParams, sort: currentSort };
      const queryString = getFilterQueryString(updatedFilterParams);
      navigate(queryString);
      dispatch(fetchFilteredProducts(queryString));
    }
    if (itemsFrom === 'allDishes') {
      console.log('get filtered products from sorter2');
      const updatedFilterParams = { sort: currentSort };
      const queryString = getFilterQueryString(updatedFilterParams);
      navigate(queryString);
      dispatch(fetchSortedProducts(queryString));
    }
  };

  useEffect(() => {
    const str = location.search;
    console.log('str', str);

    if (!str && itemsFrom === 'filter') {
      const queryString = getFilterQueryString(filterParams);
      navigate(queryString);
    }
    if (!str && itemsFrom === 'allDishes') {
      const filterParamsAp = {
        sort: filterParams.sort,
      };
      const queryString = getFilterQueryString(filterParamsAp);
      navigate(queryString);
    }
    if (str && itemsFrom === 'filter') {
      dispatch(fetchFilteredProducts(str));
    }
    if (str && itemsFrom === 'allDishes') {
      dispatch(fetchSortedProducts(str));
    }
  }, []); // eslint-disable-line

  // useEffect(() => {
  //   if (itemsFrom === 'filter') {
  //     console.log('Sorter fetchFilteredProducts');
  //     const queryString = getFilterQueryString(filterParams);
  //     navigate(queryString);
  //     dispatch(fetchFilteredProducts(queryString));
  //   }
  //   if (itemsFrom === 'allDishes') {
  //     const filterParamsAp = {
  //       sort: filterParams.sort,
  //     };
  //     console.log('Sorter fetchSortedProducts');
  //     const queryString = getFilterQueryString(filterParamsAp);
  //     navigate(queryString);
  //     dispatch(fetchSortedProducts(queryString));
  //   }
  // }, [filterParams.sort, itemsFrom]); // eslint-disable-line

  // попередній варіант
  // useEffect(() => {
  //   if (itemsFrom === 'filter') {
  //     console.log('Sorter fetchFilteredProducts');
  //     const filterParamsAp = {
  //       isTrending: filterParams.isTrending,
  //       isHealthy: filterParams.isHealthy,
  //       isSupreme: filterParams.isSupreme,
  //       minPrice: filterParams.minPrice,
  //       maxPrice: filterParams.maxPrice,
  //       sort: filterParams.sort,
  //     };
  //
  //     if (filterParams.filterCategories.length !== 0) {
  //       filterParamsAp.filterCategories = filterParams.filterCategories.join(',');
  //     }
  //
  //     if (filterParams.rating !== 0) {
  //       filterParamsAp.rating = filterParams.rating;
  //     }
  //
  //     const filteredFilterParams = Object.fromEntries(
  //       Object.entries(filterParamsAp).filter(([key, value]) => {
  //         return value !== undefined && value !== false && value !== null && value !== '';
  //       }),
  //     );
  //
  //     const queryString = qs.stringify(
  //       filteredFilterParams,
  //       { arrayFormat: 'comma', encode: false },
  //     );
  //     navigate(`?${queryString}`);
  //     const newURL = `/products/filter?${queryString}`;
  //
  //     (async () => {
  //       try {
  //         const response = await instance.get(newURL);
  //         dispatch(setFilteredProducts(response.data.products));
  //       } catch (err) {
  //         console.error('Error getting top products: ', err);
  //       }
  //     })();
  //   }
  //   if (itemsFrom === 'allDishes') {
  //     const filterParamsAp = {
  //       sort: filterParams.sort,
  //     };
  //     console.log('Sorter fetchSortedProducts');
  //
  //     const filteredFilterParams = Object.fromEntries(
  //       Object.entries(filterParamsAp).filter(([key, value]) => {
  //         return !!value;
  //       }),
  //     );
  //
  //     const queryString = qs.stringify(
  //       filteredFilterParams,
  //       { arrayFormat: 'comma', encode: false },
  //     );
  //     navigate(`?${queryString}`);
  //     const newURL = `/products/filter?${queryString}`;
  //
  //     (async () => {
  //       try {
  //         const response = await instance.get(newURL);
  //         dispatch(setProducts(response.data.products));
  //       } catch (err) {
  //         console.error('Error getting top products: ', err);
  //       }
  //     })();
  //   }
  // }, [filterParams.sort, itemsFrom]); // eslint-disable-line

  return (
    <Box sx={{ width: '100%', height: '40px', mb: '40px', paddingRight: '30px', textAlign: 'end' }}>
      <TextField
        sx={stylesSortSelect}
        id="standard-select-currency"
        size="small"
        select
        label="Sort by"
        defaultValue=""
        variant="standard"
        value={setSelectedValue(filterParams.sort)}
        onChange={handleSelectChangeSortBy}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

Sorter.propTypes = {
  type: PropTypes.string,
  itemsFrom: PropTypes.string,
};

Sorter.defaultProps = {
  type: '',
  itemsFrom: '',
};

export default Sorter;
