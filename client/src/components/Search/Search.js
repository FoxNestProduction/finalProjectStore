/* eslint-disable max-len */
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import { stylesSearch, stylesBtn, stylesWrap, stylesBorder } from './style';
import {
  setSearch,
  setKey,
  setInputSearchValue,
  fetchSearchedProductsOrPartners, resetSearch,
} from '../../redux/slices/searchSlice';
import { setScrollAnchor } from '../../redux/slices/scrollAnchorSlice';
import { resetFilterParams, deleteFilteredData } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);
  const partners = useSelector((state) => state.partners.partners);
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const filterParams = useSelector((state) => state.filter.filterParams);
  // const products = [
  //   'pizza',
  //   'salads',
  // ];
  // const partners = [
  //   'bob',
  //   'ben',
  // ];
  const [alignment, setAlignment] = useState('food');
  const labelForTextField = `Search  ${alignment}`;

  const handleChangeButton = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      dispatch(resetSearch());
    }
  };

  const handleInputChange = async (event, newInputValue) => {
    dispatch(setInputSearchValue(newInputValue));
    if (newInputValue.length === 0) {
      dispatch(setSearch([]));
    }
    if (newInputValue.length !== 0) {
      const fetchData = {
        url: alignment === 'food' ? '/products/search' : '/partners/search',
        body: {
          query: newInputValue,
        },
      };
      try {
        dispatch(fetchSearchedProductsOrPartners(fetchData));
        dispatch(setKey(alignment));
        dispatch(deleteFilteredData());
        dispatch(resetFilterParams());
        navigate('');
      } catch (err) {
        console.error(`Error getting ${newInputValue}: `, err);
      }
    }
  };

  const topProductsAnchor = useRef();
  useEffect(() => {
    dispatch(setScrollAnchor(topProductsAnchor.current));
  }, [dispatch]);

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
          // options={alignment === 'food' ? products : partners}
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

      <ToggleButtonGroup value={alignment} exclusive onChange={handleChangeButton} aria-label="Platform" ref={topProductsAnchor}>
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
