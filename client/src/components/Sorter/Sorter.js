import React, { useEffect } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { stylesSortSelect } from '../ListItems/styles';
import { fetchFilteredProducts, setFilterParams } from '../../redux/slices/filterSlice';
import { fetchSortedProducts } from '../../redux/slices/productsSlice';
import getQueryStringFromFilterParams from '../../utils/filter/getQueryStringFromFilterParams';

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
    let currentSort = '';

    switch (event.target.value) {
      case 'Price UP':
        currentSort = '+currentPrice';
        break;

      case 'Price DOWN':
        currentSort = '-currentPrice';
        break;

      case 'Rating UP':
        currentSort = '+rating';
        break;

      case 'Rating DOWN':
        currentSort = '-rating';
        break;

      default:
        currentSort = '';
    }

    dispatch(setFilterParams({ sort: currentSort }));

    if (itemsFrom === 'filter') {
      console.log('fetchFilteredProducts in Sorter');
      const updatedFilterParams = { ...filterParams, sort: currentSort };
      const queryString = getQueryStringFromFilterParams(updatedFilterParams);
      navigate(queryString);
      dispatch(fetchFilteredProducts(queryString));
    }
    if (itemsFrom === 'allDishes') {
      console.log('fetchSortedProducts in Sorter');
      const updatedFilterParams = { sort: currentSort };
      const queryString = getQueryStringFromFilterParams(updatedFilterParams);
      navigate(queryString);
      dispatch(fetchSortedProducts(queryString));
    }
  };

  useEffect(() => {
    const str = location.search;
    console.log('str', str);

    if (!str && itemsFrom === 'filter') {
      const queryString = getQueryStringFromFilterParams(filterParams);
      navigate(queryString);
    }
    if (!str && itemsFrom === 'allDishes') {
      const filterParamsAp = {
        sort: filterParams.sort,
      };
      const queryString = getQueryStringFromFilterParams(filterParamsAp);
      navigate(queryString);
    }
  }, []); // eslint-disable-line

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
