import React, { useEffect, useState } from 'react';
import { Button, CardMedia, Stack, ToggleButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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
  deleteFilteredData, resetFilterParams,
  setFilterParams,
} from '../../redux/slices/filterSlice';
import { setIsApplyClicked } from '../../redux/slices/scrollAnchorSlice';
import { resetSearch } from '../../redux/slices/searchSlice';
import useAlert from '../../customHooks/useAlert';
import CustomAlert from '../Alert/Alert';

const Filter = ({ filters, setFilters, resetFiltersLocalState }) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.filter.loading);
  const nothingFound = useSelector((state) => state.filter.nothingFound);
  const { alert, handleCloseAlert } = useAlert();

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
  const [filterAlert, setFilterAlert] = useState(false);
  useEffect(() => {
    if (nothingFound) {
      setFilterAlert(true);
      setTimeout(() => {
        setFilterAlert(false);
      }, 4000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nothingFound]);

  const handleChangeDishes = (dish) => {
    setFilters((prev) => ({
      ...prev,
      filterCategories: prev.filterCategories.includes(dish)
        ? prev.filterCategories.filter((category) => category !== dish)
        : [...prev.filterCategories, dish],
    }));
  };

  const handleApplyFilter = () => {
    setFilterAlert(true);
    setTimeout(() => {
      setFilterAlert(false);
    }, 5000);
    dispatch(setFilterParams({
      ...filters,
      startPage: 1,
    }));
    dispatch(setIsApplyClicked(true));
    dispatch(resetSearch());
  };

  const handleResetFilter = () => {
    dispatch(deleteFilteredData());
    dispatch(resetFilterParams('withoutSort'));
    resetFiltersLocalState();
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
              selected={filters.filterCategories.includes('pizza')}
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
              selected={filters.filterCategories.includes('burgers')}
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
              selected={filters.filterCategories.includes('sushi')}
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
              selected={filters.filterCategories.includes('salads')}
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
              selected={filters.filterCategories.includes('pasta')}
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
              selected={filters.filterCategories.includes('sandwiches')}
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
              selected={filters.filterCategories.includes('bbqMeat')}
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
              selected={filters.filterCategories.includes('drink')}
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
              selected={filters.isTrending}
              onChange={() => {
                setFilters((prev) => ({
                  ...prev,
                  isTrending: !prev.isTrending,
                }));
              }}
            >
              Trending
            </ToggleButton>
            <ToggleButton
              sx={stylesSortBtn}
              value="isHealthy"
              selected={filters.isHealthy}
              onChange={() => {
                setFilters((prev) => ({
                  ...prev,
                  isHealthy: !prev.isHealthy,
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
              selected={filters.isSupreme}
              onChange={() => {
                setFilters((prev) => ({
                  ...prev,
                  isSupreme: !prev.isSupreme,
                }));
              }}
            >
              Supreme
            </ToggleButton>
            <ToggleButton
              sx={stylesSortBtn}
              value="mostPopular"
              selected={filters.rating === 5}
              onChange={() => {
                setFilters((prev) => ({
                  ...prev,
                  rating: prev.rating === 5 ? null : 5,
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
            value={[filters.minPrice, filters.maxPrice]}
            step={1}
            marks={marks}
            valueLabelDisplay="on"
            onChange={(event, newValue) => {
              setFilters((prev) => ({
                ...prev,
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

      {nothingFound && filterAlert && (
        <CustomAlert type="info" handleCloseAlert={handleCloseAlert} content="Nothing found!" />
      )}

    </Stack>
  );
};

Filter.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func,
  resetFiltersLocalState: PropTypes.func,
};

Filter.defaultProps = {
  filters: {},
  setFilters: () => {},
  resetFiltersLocalState: () => {},
};

export default Filter;
