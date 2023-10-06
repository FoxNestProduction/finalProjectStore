import * as React from 'react';
import { useState, useEffect } from 'react';
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
  // const [nameFromSearch, setNameFromSearch] = useState('');
  const [value, setValue] = React.useState(products[0]);
  const [inputValue, setInputValue] = React.useState('');

  // useEffect(() => {
  //   dispatch(setSearch([]));
  // });

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setInputValue('');
      // setNameFromSearch('');
    }
  };
  const labelForTextField = `Search  ${alignment}`;

  const filteredProductsOrRestaurants = (name) => {
    return (
    // nameFromSearch.length !== 0 && (alignment === 'food' ? products : partners).filter((el) => {
      inputValue.length !== 0 && (alignment === 'food' ? products : partners).filter((el) => {
        return el.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
      })
    );
  };

  // const handleChangeNameFromSearch = (event, newValue) => {
  //   if (newValue !== null) {
  //     setNameFromSearch(newValue);
  //     // dispatch(setSearch(filteredProductsOrRestaurants(nameFromSearch)));
  //     dispatch(setSearch(filteredProductsOrRestaurants(inputValue)));
  //   } else {
  //     dispatch(setSearch(filteredProductsOrRestaurants([])));
  //   }
  // };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    console.log(newInputValue);
    if (newInputValue.length === 0) {
      setValue('');
    }
    if (newInputValue.length !== 0) {
      dispatch(setSearch(filteredProductsOrRestaurants(newInputValue)));
    }
  };

  // console.log(nameFromSearch);
  // console.log(filteredProductsOrRestaurants(nameFromSearch));
  // console.log(filteredProductsOrRestaurants(inputValue));

  // dispatch(setSearch(filteredProductsOrRestaurants(nameFromSearch)));

  return (
    <Stack sx={stylesWrap}>
      <Stack spacing={2} sx={{ stylesSearch }}>
        {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div> */}
        <div>{`inputValue: '${inputValue}'`}</div>
        <Autocomplete
          // value=""
          blurOnSelect="true"
          // value={value}
          // clearOnBlur="true"
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          // onChange={handleChangeNameFromSearch}
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
