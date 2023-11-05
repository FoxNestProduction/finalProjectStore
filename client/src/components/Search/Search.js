/* eslint-disable max-len */
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// import debounce from 'lodash/debounce';
import { debounce } from '@mui/material/utils';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import { stylesSearch, stylesBtn, stylesWrap, stylesBorder } from './style';
import {
  setSearch,
  setKey,
  setInputSearchValue,
  fetchSearchedProductsOrPartners,
  resetSearch,
} from '../../redux/slices/searchSlice';
import { setScrollAnchor } from '../../redux/slices/scrollAnchorSlice';
import { setFilterParams, setFilteredProducts, setProductsQuantity, resetFilter } from '../../redux/slices/filterSlice';
import { getAllProductsNames } from '../../redux/slices/productsSlice';
import { getAllPartnersNames } from '../../redux/slices/partnersSlice';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const products = useSelector((state) => state.products.products);
  // const partners = useSelector((state) => state.partners.partners);
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const filterParams = useSelector((state) => state.filter.filterParams);
  useEffect(() => {
    dispatch(getAllProductsNames());
    dispatch(getAllPartnersNames());
  }, [dispatch]); // eslint-disable-line

  const key = useSelector((state) => state.search.key);
  const allProductsNames = useSelector((state) => state.products.allProductsNames);
  const allPartnersNames = useSelector((state) => state.partners.allPartnersNames);
  // const [alignment, setAlignment] = useState('food');
  const labelForTextField = `Search  ${key}`;

  const handleChangeButton = (event, keyBtn) => {
    if (keyBtn !== null) {
      // setAlignment(newAlignment);
      dispatch(setKey(keyBtn));
      dispatch(setInputSearchValue(''));
      dispatch(setSearch([]));
      dispatch(resetSearch());
    }
  };

  const handleInputChange = async (event, newInputValue) => {
    dispatch(setInputSearchValue(newInputValue));
    // if (newInputValue.length === 0) {
    //   dispatch(setSearch([]));
    // }
    // if (newInputValue.length !== 0) {
    //   const fetchData = {
    //     url: alignment === 'food' ? '/products/search' : '/partners/search',
    //     body: {
    //       query: newInputValue,
    //     },
    //   };
    //   try {
    //     dispatch(fetchSearchedProductsOrPartners(fetchData));
    //     dispatch(setKey(alignment));
    //     // dispatch(setFilteredProducts([]));
    //     // dispatch(setProductsQuantity(null));
    //     dispatch(resetFilter());
    //     dispatch(
    //       setFilterParams({
    //         ...filterParams,
    //         filterCategories: [],
    //         isTrending: false,
    //         rating: null,
    //         isHealthy: false,
    //         isSupreme: false,
    //         minPrice: 0,
    //         maxPrice: 30,
    //         sort: '',
    //       }),
    //     );
    //     navigate('');
    //   } catch (err) {
    //     console.error(`Error getting ${newInputValue}: `, err);
    //   }
    // }
  };
  const debounceSearch = useRef(debounce((inputValue, keyBtn) => {
    if (inputValue.length === 0) {
      dispatch(setSearch([]));
    } else {
      const fetchData = {
        url: keyBtn === 'food' ? '/products/search' : '/partners/search',
        body: {
          query: inputValue,
        },
      };
      try {
        dispatch(fetchSearchedProductsOrPartners(fetchData));
        dispatch(resetFilter());
        dispatch(
          setFilterParams({
            ...filterParams,
            filterCategories: [],
            isTrending: false,
            rating: null,
            isHealthy: false,
            isSupreme: false,
            minPrice: 0,
            maxPrice: 30,
            sort: '',
          }),
        );
        navigate('');
      } catch (err) {
        console.error(`Error getting ${inputValue}: `, err);
      }
    }
  }, 1000));

  useEffect(() => {
    debounceSearch.current(inputSearchValue, key);
  }, [inputSearchValue, key]); // eslint-disable-line

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
          options={key === 'food' ? allProductsNames : allPartnersNames}
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

      <ToggleButtonGroup value={key} exclusive onChange={handleChangeButton} aria-label="Platform" ref={topProductsAnchor}>
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
