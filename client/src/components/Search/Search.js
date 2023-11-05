import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { debounce } from '@mui/material/utils';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { stylesSearch, stylesBtn, stylesWrap, stylesBorder } from './style';
import {
  setSearch,
  setKey,
  setInputSearchValue,
  fetchSearchedProductsOrPartners,
  resetSearch,
} from '../../redux/slices/searchSlice';
import { setScrollAnchor } from '../../redux/slices/scrollAnchorSlice';
import { resetFilterParams, deleteFilteredData } from '../../redux/slices/filterSlice';
import { fetchAllProductsNames } from '../../redux/slices/productsSlice';
import { fetchAllPartnersNames } from '../../redux/slices/partnersSlice';

const Search = ({ resetFiltersLocalState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);

  useEffect(() => {
    dispatch(fetchAllProductsNames());
    dispatch(fetchAllPartnersNames());
  }, [dispatch]); // eslint-disable-line

  const key = useSelector((state) => state.search.key);
  const allProductsNames = useSelector((state) => state.products.allProductsNames);
  const allPartnersNames = useSelector((state) => state.partners.allPartnersNames);
  const labelForTextField = `Search  ${key}`;

  const handleChangeButton = (event, keyBtn) => {
    if (keyBtn !== null) {
      dispatch(setKey(keyBtn));
      dispatch(setInputSearchValue(''));
      dispatch(setSearch([]));
      dispatch(resetSearch());
    }
  };

  const handleInputChange = async (event, newInputValue) => {
    dispatch(setInputSearchValue(newInputValue));
  };
  const debounceSearch = useRef(
    debounce((inputValue, keyBtn) => {
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
          dispatch(deleteFilteredData());
          dispatch(resetFilterParams());
          resetFiltersLocalState();
          navigate('');
        } catch (err) {
          console.error(`Error getting ${inputValue}: `, err);
        }
      }
    }, 1000),
  );

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

Search.propTypes = {
  resetFiltersLocalState: PropTypes.func,
};

Search.defaultProps = {
  resetFiltersLocalState: () => {},
};

export default Search;
