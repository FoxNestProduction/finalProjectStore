import { Box, Typography, Container, Stack, Autocomplete, TextField, InputAdornment, Button, debounce } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { fetchAllPartnersNames } from '../../../redux/slices/partnersSlice';
import {
  stylesBorder,
  stylesSearch,
  container,
  allContentWrapper,
  searchButtonsTitleWrapper,
  searchAndButtonsWrapper,
  searchBtn,
  addPartnersBtn,
  title,
  cardContainer,
} from './styles';
import useGetAPI from '../../../customHooks/useGetAPI';
import PartnersCard from '../../PartnersCard/PartnersCard';
import { outlinedBtnStyles, containedBtnStyles } from '../../../muiTheme/buttonsStyles';
import { setInputSearchValue, setSearch, fetchSearchedProductsOrPartners } from '../../../redux/slices/searchSlice';

const PartnersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllPartnersNames());
  }, [dispatch]);
  const [partners, loading] = useGetAPI('/partners');

  const handleAddNewPartners = () => {
    navigate('/admin-panel/partners/new-partner');
  };

  console.log(partners);
  const itemsFromSearch = useSelector((state) => state.search.search, shallowEqual);
  const allPartnersNames = useSelector((state) => state.partners.allPartnersNames, shallowEqual);
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  console.log(inputSearchValue);
  console.log(itemsFromSearch);

  const handleInputChange = async (event, newInputValue) => {
    dispatch(setInputSearchValue(newInputValue));
  };

  const debounceSearch = useRef(
    debounce((inputValue) => {
      if (inputValue.length === 0) {
        dispatch(setSearch([]));
      } else {
        const fetchData = {
          url: '/partners/search',
          body: {
            query: inputValue,
          },
        };
        dispatch(fetchSearchedProductsOrPartners(fetchData));
        // dispatch(deleteFilteredData());
        // dispatch(resetFilterParams());
        // resetFiltersLocalState();
        navigate('');
      }
    }, 1000),
  );

  useEffect(() => {
    debounceSearch.current(inputSearchValue);
  }, [inputSearchValue]); // eslint-disable-line

  return (
    <Container
      sx={container}
    >
      <Box
        sx={allContentWrapper}
      >
        <Box
          sx={searchButtonsTitleWrapper}
        >
          <Box
            sx={searchAndButtonsWrapper}
          >
            <Stack
              sx={stylesSearch}
            >
              <Autocomplete
                inputValue={inputSearchValue}
                options={allPartnersNames}
                onInputChange={handleInputChange}
                id="search-partners"
                freeSolo
                blurOnSelect
                clearOnBlur
                renderInput={(params) => (
                  <TextField
                    sx={stylesBorder}
                    {...params}
                    label="Search Partners"
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
            <Button
              variant="contained"
              sx={{
                ...containedBtnStyles,
                ...searchBtn,
              }}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              endIcon={<AddBoxOutlinedIcon />}
              onClick={handleAddNewPartners}
              sx={{
                ...outlinedBtnStyles,
                ...addPartnersBtn,
              }}
            >
              Add Partners
            </Button>
          </Box>

          <Typography
            variant="h1"
            sx={title}
          >
            Partners
          </Typography>
        </Box>
        <Box
          sx={cardContainer}
        >
          {
          itemsFromSearch.length !== 0
            ? (itemsFromSearch.map(({ imageUrl, enabled, _id, name, customId }) => (
              <Link
                key={_id}
                to={`/admin-panel/partners/${customId}`}
              >
                <PartnersCard
                  title={name}
                  enabled={enabled}
                  url={imageUrl}
                />
              </Link>
            )))
            : (partners !== null && partners.length !== 0 && partners.map(
              ({ imageUrl, enabled, _id, name, customId }) => (
                <Link
                  key={_id}
                  to={`/admin-panel/partners/${customId}`}
                >
                  <PartnersCard
                    title={name}
                    enabled={enabled}
                    url={imageUrl}
                  />
                </Link>
              ),
            ))
          }
        </Box>
      </Box>
    </Container>
  );
};

export default PartnersPage;
