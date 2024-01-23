import { Box, Typography, Container, Stack, Autocomplete, TextField, InputAdornment, Button } from '@mui/material';
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

  const itemsFromSearch = useSelector((state) => state.search.search, shallowEqual);
  const allPartnersNames = useSelector((state) => state.partners.allPartnersNames, shallowEqual);
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  /* Варіант коду з пошуком через сервер
 const handleSearchFetch = (value) => {
    if (value === '') {
      dispatch(setSearch([]));
    } else {
      const fetchData = {
        url: '/partners/search',
        body: {
          query: inputSearchValue,
        },
      };
      dispatch(fetchSearchedProductsOrPartners(fetchData));
      navigate('');
    }
  };

   const handleInputChange = async (event, newInputValue, reason) => {
    dispatch(setInputSearchValue(newInputValue));
    if (reason === 'clear') {
      handleSearchFetch(newInputValue);
    }
  };

    const handleSearch = (newInputValue) => {
    dispatch(setInputSearchValue(newInputValue));
    handleSearchFetch(newInputValue);
  };

  */
  // Варіант коду з фільтрацією на стороні клієнта
  const handleInputChange = async (event, newInputValue, reason) => {
    dispatch(setInputSearchValue(newInputValue));
    if (reason === 'clear') {
      dispatch(setSearch([]));
    }
  };

  const handleSearch = (newInputValue) => {
    const filteredItem = partners.filter(({ name }) => {
      return inputSearchValue === name || name.includes(inputSearchValue);
    });
    dispatch(setSearch(filteredItem));
  };

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
                renderInput={(params) => (
                  <TextField
                    sx={{
                      ...stylesBorder,
                      '& .MuiInputBase-input[type="search"]::-webkit-search-cancel-button': {
                        display: 'none',
                      },
                    }}
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
              onClick={handleSearch}
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
