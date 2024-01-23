import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { stylesSearch, stylesWrap, stylesBorder } from './style';
import { setFilteredProduct, deleteFilteredProduct } from '../../../redux/slices/filterSlice';

const AdminSearch = ({ items, type }) => {
  const dispatch = useDispatch();
  const [localInputSearchValue, setLocalInputSearchValue] = useState('');

  let labelKey = {};

  if (type === 'restaurant') {
    labelKey = 'Restaurant';
  } else {
    labelKey = 'Food';
  }

  const labelForTextField = `Search  ${labelKey}`;

  const handleInputChange = (event, newInputValue) => {
    setLocalInputSearchValue(newInputValue);
    if (newInputValue.length !== 0) {
      dispatch(setFilteredProduct(newInputValue));
    } else {
      dispatch(deleteFilteredProduct());
    }
  };

  return (
    <Stack sx={stylesWrap}>
      <Stack spacing={2} sx={{ stylesSearch }}>
        <Autocomplete
          inputValue={localInputSearchValue}
          onInputChange={handleInputChange}
          freeSolo
          id="search"
          disableClearable
          options={items.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              sx={stylesBorder}
              {...params}
              label={labelForTextField}
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                type: 'search',
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Stack>
    </Stack>
  );
};

AdminSearch.propTypes = {
  type: PropTypes.string,
  items: PropTypes.array,
};

AdminSearch.defaultProps = {
  type: '',
  items: [],
};

export default memo(AdminSearch);
