/* eslint-disable max-len */
import { Alert, Button, CardMedia, Stack, ToggleButton, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import qs from 'qs';
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
import { fetchFilteredProducts, setFilteredProducts, setFilterParams } from '../../redux/slices/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const defaultSliderValue = useMemo(() => [0, 30], []);

  const anchor = useSelector((state) => state.scrollAnchor.scrollAnchor);
  const filterParams = useSelector((state) => state.filter.filterParams);
  const loading = useSelector((state) => state.filter.loading);

  const getFilterParamsFromURL = (queryString) => {
    const queryParams = qs.parse(queryString, { ignoreQueryPrefix: true });
    return {
      filterCategories: queryParams.filterCategories ? queryParams.filterCategories.split(',') : [],
      isTrending: queryParams.isTrending === 'true',
      rating: queryParams.rating ? Number(queryParams.rating) : null,
      isHealthy: queryParams.isHealthy === 'true',
      isSupreme: queryParams.isSupreme === 'true',
      minPrice: queryParams.minPrice ? parseInt(queryParams.minPrice, 10) : defaultSliderValue[0],
      maxPrice: queryParams.maxPrice ? parseInt(queryParams.maxPrice, 10) : defaultSliderValue[1],
      sort: queryParams.sort || '',
    };
  };

  useEffect(() => {
    // const initialFilterParams = getFilterParamsFromURL();

    // todo: pathname завжди = '/menu'!!!
    // if (window.location.pathname !== '/menu') {
    //   dispatch(setFilterParams(initialFilterParams)); // ніколи не спрацює
    // }
  }, []); // eslint-disable-line

  useEffect(() => {
    const queryString = location.search;
    // console.log('queryString', queryString);

    if (queryString) {
      navigate(queryString);
      const initialFilterParams = getFilterParamsFromURL(queryString);
      dispatch(setFilterParams(initialFilterParams));
      dispatch(fetchFilteredProducts(queryString));
    }
  }, []); // eslint-disable-line

  const handleChangeDishes = (dishes) => {
    // dispatch(
    //   setFilterParams({
    //     ...filterParams,
    //     filterCategories: Array.isArray(filterParams.filterCategories)
    //       ? filterParams.filterCategories.includes(`${dishes}`)
    //         ? filterParams.filterCategories.filter((category) => category !== `${dishes}`)
    //         : [...filterParams.filterCategories, `${dishes}`]
    //       : [`${dishes}`],
    //   }),
    // );

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
    // const filterParamsAp = {
    //   isTrending: filterParams.isTrending,
    //   isHealthy: filterParams.isHealthy,
    //   isSupreme: filterParams.isSupreme,
    //   minPrice: filterParams.minPrice,
    //   maxPrice: filterParams.maxPrice,
    //   sort: filterParams.sort,
    // };
    //
    // if (filterParams.filterCategories.length !== 0) {
    //   filterParamsAp.filterCategories = filterParams.filterCategories.join(',');
    // }
    //
    // if (filterParams.rating !== 0) {
    //   filterParamsAp.rating = filterParams.rating;
    // }

    // const filteredFilterParams2 = Object.fromEntries(
    //   Object.entries(filterParamsAp).filter(([key, value]) => {
    //     return value === 0 || !!value;
    //   }),
    // );

    const filteredFilterParams = Object.fromEntries(
      Object.entries(filterParams).filter(([key, value]) => {
        return key === 'filterCategories'
          ? value.length !== 0
          : value === 0 || !!value;
      }),
    );

    // const queryString = qs.stringify(filteredFilterParams, { arrayFormat: 'comma', encode: false });
    // navigate(`?${queryString}`);
    // const newURL = `/products/filter?${queryString}`;

    const queryString = qs.stringify(
      filteredFilterParams,
      { arrayFormat: 'comma', addQueryPrefix: true, encode: false },
    );
    navigate(queryString); // додала опцію для qs addQueryPrefix (додає ?)
    // const newURL = `/products/filter${queryString}`;

    dispatch(fetchFilteredProducts(queryString));
    // (async () => {
    //   try {
    //     const response = await instance.get(newURL);
    //     if (response.data.products.length === 0) {
    //       alert('Nothing found!');// eslint-disable-line // state.nothingFound (true/false);
    //       dispatch(setFilteredProducts([]));
    //     } else {
    //       dispatch(setFilteredProducts(response.data.products));
    //       dispatch(setSearch([]));
    //       dispatch(setInputSearchValue(''));
    //     }
    //   } catch (err) {
    //     console.error('Error getting top products: ', err);
    //   }
    // })();

    // if (anchor) {
    //   anchor.scrollIntoView({
    //     block: 'start',
    //   });
    // }
  };

  const handleResetFilter = () => {
    navigate('');
    dispatch(setFilteredProducts([]));
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
      }),
    );
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
            // value={valueSlider}
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
    </Stack>
  );
};

export default Filter;
