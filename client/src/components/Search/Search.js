import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import { stylesSearch, stylesBtn, stylesWrap, stylesBorder } from './style';
import { setSearch, setKey, setInputSearchValue } from '../../redux/slices/searchSlice';
import { setFilter } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const partners = useSelector((state) => state.partners.partners);
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const [alignment, setAlignment] = useState('food');
  const labelForTextField = `Search  ${alignment}`;

  const handleChangeButton = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      dispatch(setInputSearchValue(''));
      dispatch(setSearch([]));
    }
  };

  const filteredProductsOrRestaurants = (name) => {
    return (alignment === 'food' ? products : partners).filter((el) => {
      return el.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    });
  };

  const handleInputChange = (event, newInputValue) => {
    dispatch(setInputSearchValue(newInputValue));
    if (newInputValue.length === 0) {
      dispatch(setSearch([]));
    }
    if (newInputValue.length !== 0) {
      dispatch(setSearch(filteredProductsOrRestaurants(newInputValue)));
      dispatch(setKey(alignment));
      dispatch(setFilter([]));
    }
  };

  return (
    <Stack sx={stylesWrap}>
      <Stack spacing={2} sx={{ stylesSearch }}>
        <Autocomplete
          inputValue={inputSearchValue}
          onInputChange={handleInputChange}
          freeSolo
          id="search"
          disableClearable
          options={alignment === 'food' ? products.map((option) => option.name) : partners.map((option) => option.name)}
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
      <ToggleButtonGroup value={alignment} exclusive onChange={handleChangeButton} aria-label="Platform">
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
