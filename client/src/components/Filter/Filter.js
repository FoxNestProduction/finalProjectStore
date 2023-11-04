/* eslint-disable max-len */
import { Alert, Button, CardMedia, Stack, ToggleButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useSelector, useDispatch } from 'react-redux';
import {
  stylesWrap,
  stylesTitle,
  stylesWrapTitle,
  stylesSlider,
  stylesBtn,
  stylesBtnReset,
  stylesSortBtn,
  stylesCategoryIconsWrap,
  stylesCategoryItem,
  stylesToggleButton,
} from './styles';
import {
  fetchFilteredProducts, resetFilter,
  setFilteredProducts,
  setFilterParams,
  setNothingFound, setProductsQuantity,
} from '../../redux/slices/filterSlice';
import getFilterParamsFromURL from '../../utils/filter/getFilterParamsFromURL';
import getQueryStringFromFilterParams from '../../utils/filter/getQueryStringFromFilterParams';
import { fetchSortedProducts } from '../../redux/slices/productsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // const queryString = location.search;

  const anchor = useSelector((state) => state.scrollAnchor.scrollAnchor);
  const filterParams = useSelector((state) => state.filter.filterParams);
  const loading = useSelector((state) => state.filter.loading);
  const nothingFound = useSelector((state) => state.filter.nothingFound);

  useEffect(() => {
    const queryString = location.search;
    console.log('queryString', queryString);

    if (queryString) {
      console.log('useEffect in Filter');
      // navigate(queryString);
      const initialFilterParams = getFilterParamsFromURL(queryString);
      dispatch(setFilterParams(initialFilterParams));

      const filteredParams = Object.fromEntries(
        Object.entries(initialFilterParams).filter(([key, value]) => {
          return key === 'filterCategories'
            ? value.length !== 0
            : value === 0 || !!value;
        }),
      );
      if (filteredParams.minPrice === 0 && filteredParams.maxPrice === 30) {
        delete filteredParams.minPrice;
        delete filteredParams.maxPrice;
      }
      // console.log('filteredParams: ', filteredParams);

      if ((Object.keys(filteredParams).length === 3 && filteredParams.sort)
          || Object.keys(filteredParams).length === 2) {
        console.log('💧💧💧fetchSortedProducts in Filter UseEffect');
        dispatch(fetchSortedProducts(queryString));
      } else {
        console.log('💦💦💦fetchFilteredProducts in Filter UseEffect');
        dispatch(fetchFilteredProducts(queryString));
      }
    }
  }, []); // eslint-disable-line

  const handleChangeDishes = (dishes) => {
    dispatch(setFilterParams({
      filterCategories: filterParams.filterCategories.includes(`${dishes}`)
        ? filterParams.filterCategories.filter((category) => category !== `${dishes}`)
        : [...filterParams.filterCategories, `${dishes}`],
    }));
  };

  const marks = [
    {
      value: 0,
      label: '0$',
    },
    {
      value: 10,
      label: '10$',
    },
    {
      value: 20,
      label: '20$',
    },
    {
      value: 30,
      label: '30$',
    },
  ];

  const handleApplyFilter = async () => {
    const updatedFilterParams = {
      ...filterParams,
      startPage: 1,
    };
    dispatch(setFilterParams({
      startPage: 1,
    }));

    const queryString = getQueryStringFromFilterParams(updatedFilterParams);
    navigate(queryString);
    console.log('😈😈😈 fetchFilteredProducts by Apply');
    dispatch(fetchFilteredProducts(queryString));
    // if (anchor) {
    //   anchor.scrollIntoView({
    //     block: 'start',
    //   });
    // }
  };

  const handleResetFilter = () => {
    // navigate('');
    // dispatch(setFilteredProducts([]));
    // dispatch(setProductsQuantity(null));
    // dispatch(setNothingFound(false));
    dispatch(resetFilter());
    const resetFilterParams = {
      ...filterParams,
      filterCategories: [],
      isTrending: false,
      rating: null,
      isHealthy: false,
      isSupreme: false,
      minPrice: 0,
      maxPrice: 30,
      startPage: 1,
      // sort: '',
    };
    dispatch(setFilterParams(resetFilterParams));

    delete resetFilterParams.minPrice;
    delete resetFilterParams.maxPrice;

    const queryString = getQueryStringFromFilterParams(resetFilterParams);
    navigate(queryString);
    console.log('❌❌❌ fetchSortedProducts by Reset');
    dispatch(fetchSortedProducts(queryString));
  };

  return (
    <Stack component="section" sx={stylesWrap}>
      <Stack component="div">
        <Stack component="div" sx={stylesWrapTitle}>
          <Typography component="h3" sx={stylesTitle}>
            Category
          </Typography>
          <Button sx={stylesBtnReset} onClick={handleResetFilter}>
            Reset
          </Button>
        </Stack>

        <Stack component="div" sx={stylesCategoryIconsWrap}>
          <Stack
            component="div"
            direction="row"
            gap={{ mobile: '10px', tablet: '9px', desktop: '13px' }}
            justifyContent={{ mobile: 'space-between', tablet: 'space-around', lgTablet: 'space-between' }}
            sx={{ width: '100%' }}
          >

            <ToggleButton
              sx={stylesToggleButton}
              value="pizza"
              selected={filterParams.filterCategories.includes('pizza')}
              onChange={() => handleChangeDishes('pizza')}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/pizza.png" alt="pizza" />
                <Typography component="p">Pizza</Typography>
              </Stack>
            </ToggleButton>

            <ToggleButton
              sx={stylesToggleButton}
              value="burgers"
              selected={filterParams.filterCategories.includes('burgers')}
              onChange={() => handleChangeDishes('burgers')}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/burger.png" alt="burger" />
                <Typography component="p">Burgers</Typography>
              </Stack>
            </ToggleButton>

            <ToggleButton
              sx={stylesToggleButton}
              value="sushi"
              selected={filterParams.filterCategories.includes('sushi')}
              onChange={() => handleChangeDishes('sushi')}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/sushi.png" alt="sushi" />
                <Typography component="p">Sushi</Typography>
              </Stack>
            </ToggleButton>

            <ToggleButton
              sx={stylesToggleButton}
              value="salads"
              selected={filterParams.filterCategories.includes('salads')}
              onChange={() => handleChangeDishes('salads')}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/salad_2.png" alt="salads" />
                <Typography component="p">Salads</Typography>
              </Stack>
            </ToggleButton>
          </Stack>

          <Stack
            component="div"
            direction="row"
            gap={{ mobile: '10px', tablet: '9px', desktop: '13px' }}
            justifyContent={{ mobile: 'space-between', tablet: 'space-around', lgTablet: 'space-between' }}
            sx={{ width: '100%' }}
          >

            <ToggleButton
              sx={stylesToggleButton}
              value="pasta"
              selected={filterParams.filterCategories.includes('pasta')}
              onChange={() => handleChangeDishes('pasta')}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/pasta.png" alt="pasta" />
                <Typography component="p">Pasta</Typography>
              </Stack>
            </ToggleButton>

            <ToggleButton
              sx={stylesToggleButton}
              value="sandwiches"
              selected={filterParams.filterCategories.includes('sandwiches')}
              onChange={() => handleChangeDishes('sandwiches')}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/sandwich.png" alt="sandwich" />
                <Typography component="p">Sandwich</Typography>
              </Stack>
            </ToggleButton>

            <ToggleButton
              sx={stylesToggleButton}
              value="bbqMeat"
              selected={filterParams.filterCategories.includes('bbqMeat')}
              onChange={() => handleChangeDishes('bbqMeat')}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/bbqMeat.png" alt="bbq meat" />
                <Typography component="p">BBQ</Typography>
              </Stack>
            </ToggleButton>

            <ToggleButton
              sx={stylesToggleButton}
              value="drink"
              selected={filterParams.filterCategories.includes('drink')}
              onChange={() => handleChangeDishes('drink')}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/drink_2.png" alt="drink" />
                <Typography component="p">Drink</Typography>
              </Stack>
            </ToggleButton>

          </Stack>
        </Stack>
      </Stack>
      <Stack component="div" sx={{ mt: { mobile: '25px', tablet: '30px' } }}>

        <Typography component="h3" sx={stylesTitle}>
          Filter By
        </Typography>
        <Stack component="div" direction="column" spacing={0} alignItems="flex-start" sx={{ width: '100%' }}>
          <Stack component="div" direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <ToggleButton
              sx={stylesSortBtn}
              value="isTrending"
              selected={filterParams.isTrending}
              onChange={() => {
                dispatch(setFilterParams({
                  isTrending: !filterParams.isTrending,
                }));
              }}
            >
              Trending
            </ToggleButton>
            <ToggleButton
              sx={stylesSortBtn}
              value="isHealthy"
              selected={filterParams.isHealthy}
              onChange={() => {
                dispatch(setFilterParams({
                  isHealthy: !filterParams.isHealthy,
                }));
              }}
            >
              Healthy
            </ToggleButton>
          </Stack>

          <Stack component="div" direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <ToggleButton
              sx={stylesSortBtn}
              value="isSupreme"
              selected={filterParams.isSupreme}
              onChange={() => {
                dispatch(setFilterParams({
                  isSupreme: !filterParams.isSupreme,
                }));
              }}
            >
              Supreme
            </ToggleButton>
            <ToggleButton
              sx={stylesSortBtn}
              value="mostPopular"
              selected={filterParams.rating === 5}
              onChange={() => {
                dispatch(setFilterParams({
                  rating: filterParams.rating === 5 ? null : 5,
                }));
              }}
            >
              Most Popular
            </ToggleButton>
          </Stack>
        </Stack>
      </Stack>

      <Stack component="div" sx={{ mt: { mobile: '15px', tablet: '10px', desktop: '15px' } }}>
        <Typography component="h3" sx={stylesTitle}>
          Price
        </Typography>
        <Box component="div" sx={{ width: '100%', mt: { mobile: '15px', tablet: '10px', desktop: '15px' } }}>
          <Slider
            sx={stylesSlider}
            max={30}
            getAriaLabel={() => 'Always visible'}
            value={[filterParams.minPrice, filterParams.maxPrice]}
            step={1}
            marks={marks}
            valueLabelDisplay="on"
            onChange={(event, newValue) => {
              dispatch(setFilterParams({
                minPrice: newValue[0],
                maxPrice: newValue[1],
              }));
            }}
          />
        </Box>
      </Stack>
      <Button sx={stylesBtn} onClick={handleApplyFilter} disabled={loading}>
        Apply
      </Button>

      {/* Заглушка, переробити!!!!!!! */}
      {nothingFound && (
      <Alert
        sx={{
          position: 'absolute',
          top: '170px',
        }}
        severity="info"
        variant="filled"
      >
        Nothing found!
      </Alert>
      )}

    </Stack>
  );
};

export default Filter;
