import { useNavigate } from 'react-router';
import React, { memo, useEffect, useRef } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { debounce } from '@mui/material/utils';
import { Autocomplete, InputAdornment, Stack, TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import { useTranslation } from 'react-i18next';
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
import { resetFilterParams, deleteFilteredData } from '../../redux/slices/filterSlice';
import { fetchAllProductsNames } from '../../redux/slices/productsSlice';
import { fetchAllPartnersNames } from '../../redux/slices/partnersSlice';

const Search = ({ resetFiltersLocalState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    dispatch(fetchAllProductsNames());
    dispatch(fetchAllPartnersNames());
  }, [dispatch]); // eslint-disable-line

  const key = useSelector((state) => state.search.key);
  let labelKey = {};

  if (key === 'restaurant') {
    labelKey = {
      en: 'Restaurant',
      ua: 'Ресторану',
      pl: 'Restaurant',
    };
  } else {
    labelKey = {
      en: 'Food',
      ua: 'Страв',
      pl: 'Food',
    };
  }
  const allProductsNames = useSelector((state) => state.products.allProductsNames, shallowEqual);
  const allPartnersNames = useSelector((state) => state.partners.allPartnersNames, shallowEqual);
  const labelForTextField = `${t('search.label')}  ${labelKey[i18n.language]}`;

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
        dispatch(fetchSearchedProductsOrPartners(fetchData));
        dispatch(deleteFilteredData());
        dispatch(resetFilterParams());
        resetFiltersLocalState();
        navigate('');
      }
    }, 1000),
  );

  useEffect(() => {
    debounceSearch.current(inputSearchValue, key);
  }, [inputSearchValue, key]); // eslint-disable-line

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

      <ToggleButtonGroup value={key} exclusive onChange={handleChangeButton} aria-label="Platform">
        <ToggleButton value="food" sx={stylesBtn}>
          {t('search.food')}
        </ToggleButton>
        <ToggleButton value="restaurant" sx={stylesBtn}>
          {t('search.restaurant')}
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

export default memo(Search);
