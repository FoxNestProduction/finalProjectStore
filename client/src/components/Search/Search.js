import * as React from 'react';
import { useState } from 'react';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import { stylesSearch, stylesBtn, stylesWrap, stylesBorder } from './style';

const Search = () => {
  const [alignment, setAlignment] = useState('food');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  const labelForTextField = `Search  ${alignment}`;

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
  ];

  return (
    <Stack sx={stylesWrap}>
      <Stack spacing={2} sx={{ stylesSearch }}>
        <Autocomplete
          freeSolo
          id="search"
          disableClearable
          options={top100Films}
          renderInput={(params) => (
            <TextField
              sx={stylesBorder}
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
