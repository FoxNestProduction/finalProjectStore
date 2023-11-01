import React, { useEffect } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stylesSortSelect } from '../ListItems/styles';
import { setFilteredProducts, setFilterParams } from '../../redux/slices/filterSlice';
import { instance } from '../../API/instance';
import { setProducts } from '../../redux/slices/productsSlice';

const Sorter = ({ type, itemsFrom }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterParams = useSelector((state) => state.filter.filterParams);

  const [selectedValueSortBy, setSelectedValueSortBy] = React.useState('Default');

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
    setSelectedValueSortBy(event.target.value);

    switch (event.target.value) {
      case 'Price UP':
        dispatch(
          setFilterParams({
            ...filterParams,
            sort: '+currentPrice',
          }),
        );
        break;

      case 'Price DOWN':
        dispatch(
          setFilterParams({
            ...filterParams,
            sort: '-currentPrice',
          }),
        );
        break;

      case 'Rating UP':
        dispatch(
          setFilterParams({
            ...filterParams,
            sort: '+rating',
          }),
        );
        break;

      case 'Rating DOWN':
        dispatch(
          setFilterParams({
            ...filterParams,
            sort: '-rating',
          }),
        );
        break;

      default:
        dispatch(
          setFilterParams({
            ...filterParams,
            sort: '',
          }),
        );
    }
  };

  useEffect(() => {
    if (itemsFrom === 'filter') {
      const filterParamsAp = {
        isTrending: filterParams.isTrending,
        isHealthy: filterParams.isHealthy,
        isSupreme: filterParams.isSupreme,
        minPrice: filterParams.minPrice,
        maxPrice: filterParams.maxPrice,
        sort: filterParams.sort,
      };

      if (filterParams.filterCategories.length !== 0) {
        filterParamsAp.filterCategories = filterParams.filterCategories.join(',');
      }

      if (filterParams.rating !== 0) {
        filterParamsAp.rating = filterParams.rating;
      }

      const filteredFilterParams = Object.fromEntries(
        Object.entries(filterParamsAp).filter(([key, value]) => {
          return value !== undefined && value !== false && value !== null && value !== '';
        }),
      );

      const queryString = qs.stringify(filteredFilterParams, { arrayFormat: 'comma', encode: false });
      navigate(`?${queryString}`);
      const newURL = `/products/filter?${queryString}`;

      (async () => {
        try {
          const response = await instance.get(newURL);
          dispatch(setFilteredProducts(response.data.products));
        } catch (err) {
          console.error('Error getting top products: ', err);
        }
      })();
    }

    if (itemsFrom === 'allDishes') {
      const filterParamsAp = {
        sort: filterParams.sort,
      };

      const filteredFilterParams = Object.fromEntries(
        Object.entries(filterParamsAp).filter(([key, value]) => {
          return !!value;
        }),
      );

      const queryString = qs.stringify(filteredFilterParams, { arrayFormat: 'comma', encode: false });
      navigate(`?${queryString}`);
      const newURL = `/products/filter?${queryString}`;

      (async () => {
        try {
          const response = await instance.get(newURL);
          dispatch(setProducts(response.data.products));
        } catch (err) {
          console.error('Error getting top products: ', err);
        }
      })();
    }
  }, [selectedValueSortBy, filterParams.sort, itemsFrom]); // eslint-disable-line

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
        value={selectedValueSortBy}
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
