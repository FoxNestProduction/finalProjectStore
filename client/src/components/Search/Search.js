import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import { stylesSearch, stylesBtn, stylesWrap, stylesBorder } from './style';
import { setSearch } from '../../redux/slices/searchSlice';

const Search = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const partners = useSelector((state) => state.partners.partners);
  const [alignment, setAlignment] = useState('food');
  const [inputValue, setInputValue] = React.useState('');
  const labelForTextField = `Search  ${alignment}`;

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setInputValue('');
    }
  };

  const filteredProductsOrRestaurants = (name) => {
    return (alignment === 'food' ? products : partners).filter((el) => {
      return el.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue.length === 0) {
      dispatch(setSearch([]));
    }
    if (newInputValue.length !== 0) {
      dispatch(setSearch(filteredProductsOrRestaurants(newInputValue)));
    }
  };

  return (
    <Stack sx={stylesWrap}>
      <Stack spacing={2} sx={{ stylesSearch }}>
        <div>{`inputValue: '${inputValue}'`}</div>
        <Autocomplete
          inputValue={inputValue}
          onInputChange={handleInputChange}
          freeSolo
          id="search"
          disableClearable
          options={alignment === 'food' ? products.map((option) => option.name) : partners.map((option) => option.name)} // eslint-disable-line
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
      <ToggleButtonGroup value={alignment} exclusive onChange={handleChange} aria-label="Platform">
        <ToggleButton value="food" sx={stylesBtn}>
          Food
        </ToggleButton>
        <ToggleButton value="restaurant" sx={stylesBtn}>
          Restaurant
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default Search;
