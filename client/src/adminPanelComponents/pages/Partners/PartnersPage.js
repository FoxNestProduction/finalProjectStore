import { Box, Typography, Container, Stack, Autocomplete, TextField, InputAdornment, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
// import Filter from '../../../components/Filter/Filter';
// import SectionSwipperFilterSearch from '..
// /../../components/SectionSwipper&Filter&Search/SectionSwipper&Filter&Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { fetchAllPartnersNames } from '../../../redux/slices/partnersSlice';
import { stylesBorder, stylesSearch } from './styles';
// import ListItem from '../../../components/ListItems/ListItem';
// import RestaurantItem from '../../../components/RestaurantItem/RestaurantItem';
// import RestaurantCard from '../../../components/RestaurantCard/RestaurantCard';
import useGetAPI from '../../../customHooks/useGetAPI';
// import { fixedEncodeURIComponent } from '../../../utils/uriEncodeHelpers';
import PartnersCard from '../../PartnersCard/PartnersCard';
import { outlinedBtnStyles, containedBtnStyles } from '../../../muiTheme/buttonsStyles';

const PartnersPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPartnersNames());
  }, [dispatch]);
  const [partners, loading] = useGetAPI('/partners');

  console.log(partners);
  const itemsFromSearch = useSelector((state) => state.search.search, shallowEqual);
  const allPartnersNames = useSelector((state) => state.partners.allPartnersNames, shallowEqual);
  const inputSearchValue = useSelector((state) => state.search.inputSearchValue);
  console.log(allPartnersNames);
  console.log(itemsFromSearch);
  return (
    <Container
      sx={{
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            maxWidth: '1083px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            py: '40px',
          }}
        >
          <Box sx={{
            display: 'flex',
            width: '100%',
            gap: '24px',
            mb: '34px',
          }}
          >
            <Stack
              sx={stylesSearch}
            >
              <Autocomplete
                // inputValue={inputSearchValue}
                options={allPartnersNames}
                onInputChange={() => { }}
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
                width: '188px',
                height: '60px',
                borderRadius: '18px',
                padding: '12px 16px',
                marginRight: '5px',
                fontSize: {
                  tablet: '1.1em',
                  desktop: '1.3em',
                },
                '@media (min-width: 1212px )': {
                  fontSize: '1.5em',
                },
              }}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              endIcon={<AddBoxOutlinedIcon />}
              sx={{
                ...outlinedBtnStyles,
                height: '60px',
                width: '248px',
                padding: '12px 5px',
                fontSize: {
                  tablet: '1em',
                  desktop: '1.12em',
                },
                '@media (min-width: 1212px )': {
                  fontSize: '1.5em',
                },
              }}
            >
              Add Partners
            </Button>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: {
                mobile: '48px',
              },
            }}
          >
            Partners
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '40px',
            mb: '100px',
          }}
        >
          {partners !== null && partners.length !== 0 && partners.map(
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
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default PartnersPage;
