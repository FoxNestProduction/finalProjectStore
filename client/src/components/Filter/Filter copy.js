import { Alert, Button, CardMedia, Stack, ToggleButton, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useSelector, useDispatch } from 'react-redux';
import { instance } from '../../API/instance';
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
import { setFilter } from '../../redux/slices/filterSlice';
import { setSearch, setInputSearchValue } from '../../redux/slices/searchSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* eslint-disable no-undef */
  const [filteredItems, setFilteredItems] = React.useState([]);
  const [pizza, setPizza] = React.useState(false);
  const [burgers, setBurgers] = React.useState(false);
  const [sushi, setSushi] = React.useState(false);
  const [salads, setSalads] = React.useState(false);
  const [pasta, setPasta] = React.useState(false);
  const [sandwiches, setSandwiches] = React.useState(false);
  const [bbqMeat, setBbqMeat] = React.useState(false);
  const [drink, setDrink] = React.useState(false);
  const [isTrending, setIsTrending] = React.useState(false);
  const [mostPopular, setMostPopular] = React.useState(false);
  const [isHealthy, setIsHealthy] = React.useState(false);
  const [isSupreme, setIsSupreme] = React.useState(false);
  const defaultSliderValue = useMemo(() => [5, 25], []);
  const [valueSlider, setValueSlider] = React.useState(defaultSliderValue);
  const anchor = useSelector((state) => state.scrollAnchor.scrollAnchor);
  // 1111111111111111111111111111111111111111111111111111111111111111111111111
  useEffect(() => {
    const queryParams = qs.parse(window.location.search, { ignoreQueryPrefix: true });
    setPizza(queryParams.filterCategories?.split(',').includes('pizza') || false);
    setBurgers(queryParams.filterCategories?.split(',').includes('burgers') || false);
    setSushi(queryParams.filterCategories?.split(',').includes('sushi') || false);
    setSalads(queryParams.filterCategories?.split(',').includes('salads') || false);
    setPasta(queryParams.filterCategories?.split(',').includes('pasta') || false);
    setSandwiches(queryParams.filterCategories?.split(',').includes('sandwiches') || false);
    setBbqMeat(queryParams.filterCategories?.split(',').includes('bbqMeat') || false);
    setDrink(queryParams.filterCategories?.split(',').includes('drink') || false);
    setIsTrending(queryParams.isTrending === 'true' || false);
    setMostPopular(queryParams.rating === '5' || false);
    setIsHealthy(queryParams.isHealthy === 'true' || false);
    setIsSupreme(queryParams.isSupreme === 'true' || false);
    setValueSlider([
      // eslint-disable-next-line radix
      parseInt(queryParams.minPrice) || defaultSliderValue[0],
      // eslint-disable-next-line radix
      parseInt(queryParams.maxPrice) || defaultSliderValue[1],
    ]);
    // eslint-disable-next-line
  }, []);

  /* eslint-disable object-shorthand */

  const updateURL = () => {
    const filterCategories = [
      burgers ? 'burgers' : '',
      pizza ? 'pizza' : '',
      sushi ? 'sushi' : '',
      salads ? 'salads' : '',
      pasta ? 'pasta' : '',
      sandwiches ? 'sandwiches' : '',
      bbqMeat ? 'bbqMeat' : '',
      drink ? 'drink' : '',
    ]
      .filter((category) => category)
      .join(',');

    let queryString = '?';

    if (filterCategories) {
      queryString += `filterCategories=${filterCategories}&`;
    }

    if (isTrending) {
      queryString += `isTrending=${isTrending}&`;
    }

    if (mostPopular) {
      queryString += 'rating=5&';
    }

    if (isHealthy) {
      queryString += `isHealthy=${isHealthy}&`;
    }

    if (isSupreme) {
      queryString += `isSupreme=${isSupreme}&`;
    }
    if (valueSlider[0] !== 5 || valueSlider[1] !== 25) {
      queryString += `minPrice=${valueSlider[0]}&maxPrice=${valueSlider[1]}&`;
    }

    const newURL = `/products/filter${queryString}`;
    window.history.pushState(null, '', navigate(`${queryString}`));
    navigate(`${queryString}`);
    // console.log(newURL);
    return newURL;
  };
  /* eslint-enable object-shorthand */

  useEffect(() => {
    (async () => {
      try {
        const response = await instance.get(updateURL());
        setFilteredItems(response.data.products);
      } catch (err) {
        console.error('Error getting top products: ', err);
      }
    })();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [
    burgers,
    pizza,
    sushi,
    salads,
    pasta,
    sandwiches,
    bbqMeat,
    drink,
    isTrending,
    mostPopular,
    isHealthy,
    isSupreme,
    valueSlider,
  ]);

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

  const handleApplyFilter = () => {
    if (filteredItems.length === 0) {
      dispatch(setFilter([]));
      // eslint-disable-next-line no-undef,no-alert
      // alert('Nothing found :(');
        <Alert severity="warning">`Nothing found!</Alert>;
    } else {
      dispatch(setFilter(filteredItems));
      dispatch(setSearch([]));
      dispatch(setInputSearchValue(''));
    }

    if (anchor) {
      // eslint-disable-next-line react/prop-types
      anchor.scrollIntoView({
        block: 'start',
      });
    }
  };

  const handleResetFilter = () => {
    dispatch(setFilter([]));
    setPizza(false);
    setBurgers(false);
    setSushi(false);
    setSalads(false);
    setPasta(false);
    setSandwiches(false);
    setBbqMeat(false);
    setDrink(false);
    setIsTrending(false);
    setMostPopular(false);
    setIsHealthy(false);
    setIsSupreme(false);
    setValueSlider(defaultSliderValue);
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
              selected={pizza}
              onChange={() => {
                setPizza(!pizza);
              }}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/pizza.png" alt="pizza" />
                <Typography component="p">Pizza</Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton
              sx={stylesToggleButton}
              value="burgers"
              selected={burgers}
              onChange={() => {
                setBurgers(!burgers);
              }}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/burger.png" alt="burger" />
                <Typography component="p">Burgers</Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton
              sx={stylesToggleButton}
              value="sushi"
              selected={sushi}
              onChange={() => {
                setSushi(!sushi);
              }}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/sushi.png" alt="sushi" />
                <Typography component="p">Sushi</Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton
              sx={stylesToggleButton}
              value="salads"
              selected={salads}
              onChange={() => {
                setSalads(!salads);
              }}
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
              selected={pasta}
              onChange={() => {
                setPasta(!pasta);
              }}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/pasta.png" alt="pasta" />
                <Typography component="p">Pasta</Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton
              sx={stylesToggleButton}
              value="sandwich"
              selected={sandwiches}
              onChange={() => {
                setSandwiches(!sandwiches);
              }}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/sandwich.png" alt="sandwich" />
                <Typography component="p">Sandwich</Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton
              sx={stylesToggleButton}
              value="bbqMeat"
              selected={bbqMeat}
              onChange={() => {
                setBbqMeat(!bbqMeat);
              }}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/bbqMeat.png" alt="bbq meat" />
                <Typography component="p">BBQ</Typography>
              </Stack>
            </ToggleButton>
            <ToggleButton
              sx={stylesToggleButton}
              value="drink"
              selected={drink}
              onChange={() => {
                setDrink(!drink);
              }}
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
          Sort By
        </Typography>
        <Stack component="div" direction="column" spacing={0} alignItems="flex-start" sx={{ width: '100%' }}>
          <Stack component="div" direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <ToggleButton
              sx={stylesSortBtn}
              value="isTrending"
              selected={isTrending}
              onChange={() => {
                setIsTrending(!isTrending);
              }}
            >
              Trending
            </ToggleButton>
            <ToggleButton
              sx={stylesSortBtn}
              value="isHealthy"
              selected={isHealthy}
              onChange={() => {
                setIsHealthy(!isHealthy);
              }}
            >
              Healthy
            </ToggleButton>
          </Stack>

          <Stack component="div" direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <ToggleButton
              sx={stylesSortBtn}
              value="isSupreme"
              selected={isSupreme}
              onChange={() => {
                setIsSupreme(!isSupreme);
              }}
            >
              Supreme
            </ToggleButton>
            <ToggleButton
              sx={stylesSortBtn}
              value="mostPopular"
              selected={mostPopular}
              onChange={() => {
                setMostPopular(!mostPopular);
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
            value={valueSlider}
            step={1}
            marks={marks}
            valueLabelDisplay="on"
            onChange={(event, newValue) => setValueSlider(newValue)}
          />
        </Box>
      </Stack>
      <Button sx={stylesBtn} onClick={handleApplyFilter}>
        Apply
      </Button>
    </Stack>
  );
};

export default Filter;
