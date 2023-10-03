import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import { stylesSearch, stylesBtn, stylesWrap } from './style';

const Search = () => {
  const [nameFromSearch, setNameFromSearch] = useState('');

  const products = useSelector((state) => state.products.products);
  const partners = useSelector((state) => state.partners.partners);
  const [alignment, setAlignment] = React.useState('food');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setNameFromSearch(' ');
  };
  const handleChangeNameFromSearch = (event, newValue) => {
    // console.log(newValue.length);
    if (newValue === null) {
      setNameFromSearch('');
    }
    setNameFromSearch(newValue);
  };

  console.log(nameFromSearch);
  const labelForTextField = `Search  ${alignment}`;
  return (
    <Stack sx={stylesWrap}>
      <Stack spacing={2} sx={{ stylesSearch }}>
        <Autocomplete
          sx={{
            '.MuiOutlinedInput-root': {
              '&:hover, &:focus': {
                borderRadius: 50,
                borderColor: 'red',
              },
            },
          }}
          onChange={handleChangeNameFromSearch}
          freeSolo
          id="search"
          disableClearable
          options={alignment === 'food' ? products.map((option) => option.name) : partners.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              // sx={{
              //   '.MuiOutlinedInput-root': {
              //     '&:hover, &:focus': {
              //       borderRadius: 50,
              //       borderColor: 'red',
              //     },
              //   },
              // }}
              {...params}
              label={labelForTextField}
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
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="food" sx={stylesBtn}>Food</ToggleButton>
        <ToggleButton value="resturent" sx={stylesBtn}>Resturent</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

export default Search;
