import React, { memo } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { stylesSortSelect } from '../ListItems/styles';
import { setFilterParams } from '../../redux/slices/filterSlice';

const Sorter = ({ type }) => {
  const dispatch = useDispatch();

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
    switch (event.target.value) {
      case 'Price UP':
        dispatch(setFilterParams({ sort: '+currentPrice' }));
        break;

      case 'Price DOWN':
        dispatch(setFilterParams({ sort: '-currentPrice' }));
        break;

      case 'Rating UP':
        dispatch(setFilterParams({ sort: '+rating' }));
        break;

      case 'Rating DOWN':
        dispatch(setFilterParams({ sort: '-rating' }));
        break;

      default:
        dispatch(setFilterParams({ sort: '' }));
    }

    dispatch(setFilterParams({
      startPage: 1,
    }));
  };

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
};

Sorter.defaultProps = {
  type: '',
};

export default memo(Sorter);
