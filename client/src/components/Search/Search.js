import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import { instance } from '../../API/instance';
import { stylesSearch, stylesBtn, stylesWrap, stylesBorder } from './style';
import { setSearch, setKey, setInputSearchValue } from '../../redux/slices/searchSlice';
import { setScrollAnchor } from '../../redux/slices/scrollAnchorSlice';
import { setFilterParams, setFilteredProducts } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);
  const partners = useSelector((state) => state.partners.partners);
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const filterParams = useSelector((state) => state.filter.filterParams);

  const [alignment, setAlignment] = useState('food');
  const labelForTextField = `Search  ${alignment}`;

  const handleChangeButton = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      dispatch(setInputSearchValue(''));
      dispatch(setSearch([]));
    }
  };

  const handleInputChange = (event, newInputValue) => {
    dispatch(setInputSearchValue(newInputValue));
    if (newInputValue.length === 0) {
      dispatch(setSearch([]));
    }
    if (newInputValue.length !== 0) {
      (async () => {
        try {
          const response = await instance.post((alignment === 'food' ? '/products/search' : '/partners/search'), { query: `${newInputValue}` });
          dispatch(setSearch(response.data));
          dispatch(setKey(alignment));
          dispatch(setFilteredProducts([]));
          dispatch(
            setFilterParams({
              ...filterParams,
              filterCategories: [],
              isTrending: false,
              rating: 0,
              isHealthy: false,
              isSupreme: false,
              minPrice: 0,
              maxPrice: 30,
              sort: '',
            }),
          );
          navigate('');
        } catch (err) {
          console.error('Error getting pizza: ', err);
        }
      })();
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
