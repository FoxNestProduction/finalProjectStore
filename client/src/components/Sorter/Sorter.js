import React from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { stylesSortSelect } from '../ListItems/styles';

const Sorter = ({ type, selectedValueSortBy, setSelectedValueSortBy }) => {
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
  };

  return (
    <Box sx={{ width: '100%', height: '40px', mb: '40px', paddingRight: '30px', textAlign: 'end' }}>
      <TextField
        sx={stylesSortSelect}
        id="standard-select-currency"
        size="small"
        select
        label="Sort by"
        defaultValue="Default"
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
  selectedValueSortBy: PropTypes.string,
  setSelectedValueSortBy: PropTypes.func,
};

Sorter.defaultProps = {
  type: '',
  selectedValueSortBy: '',
  setSelectedValueSortBy: () => {},
};

export default Sorter;
