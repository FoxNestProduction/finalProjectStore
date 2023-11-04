import { Button, CardMedia, Stack, ToggleButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
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
import { setFilter } from '../../redux/slices/filterSlice';
import { setSearch, setInputSearchValue } from '../../redux/slices/searchSlice';
import useAlert from '../../customHooks/useAlert';
import CustomAlert from '../Alert/Alert';

const Filter = () => {
  const dispatch = useDispatch();
  /* eslint-disable no-undef */
  const products = useSelector((state) => state.products.products);
  const [pizza, setPizza] = React.useState(sessionStorage.getItem('pizza') === 'true' || false);
  const [burgers, setBurgers] = React.useState(sessionStorage.getItem('burgers') === 'true' || false);
  const [sushi, setSushi] = React.useState(sessionStorage.getItem('sushi') === 'true' || false);
  const [salads, setSalads] = React.useState(sessionStorage.getItem('salads') === 'true' || false);
  const [pasta, setPasta] = React.useState(sessionStorage.getItem('pasta') === 'true' || false);
  const [sandwiches, setSandwiches] = React.useState(sessionStorage.getItem('sandwiches') === 'true' || false);
  const [bbqMeat, setBbqMeat] = React.useState(sessionStorage.getItem('bbqMeat') === 'true' || false);
  const [drink, setDrink] = React.useState(sessionStorage.getItem('drink') === 'true' || false);
  const [isTrending, setIsTrending] = React.useState(sessionStorage.getItem('isTrending') === 'true' || false);
  const [mostPopular, setMostPopular] = React.useState(sessionStorage.getItem('mostPopular') === 'true' || false);
  const [isHealthy, setIsHealthy] = React.useState(sessionStorage.getItem('isHealthy') === 'true' || false);
  const [isSupreme, setIsSupreme] = React.useState(sessionStorage.getItem('isSupreme') === 'true' || false);
  const defaultSliderValue = 15;
  const [valueSlider, setValueSlider] = React.useState(Number(sessionStorage.getItem('valueSlider')) || defaultSliderValue);

  const { alert, handleShowAlert, handleCloseAlert } = useAlert();

  const saveFilterToSessionStorage = () => {
    sessionStorage.setItem('pizza', pizza.toString());
    sessionStorage.setItem('burgers', burgers.toString());
    sessionStorage.setItem('sushi', sushi.toString());
    sessionStorage.setItem('salads', salads.toString());
    sessionStorage.setItem('pasta', pasta.toString());
    sessionStorage.setItem('sandwiches', sandwiches.toString());
    sessionStorage.setItem('bbqMeat', bbqMeat.toString());
    sessionStorage.setItem('drink', drink.toString());
    sessionStorage.setItem('isTrending', isTrending.toString());
    sessionStorage.setItem('mostPopular', mostPopular.toString());
    sessionStorage.setItem('isHealthy', isHealthy.toString());
    sessionStorage.setItem('isSupreme', isSupreme.toString());
    sessionStorage.setItem('valueSlider', valueSlider.toString());
  };

  useEffect(() => {
    saveFilterToSessionStorage(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pizza, burgers, sushi, salads, pasta, sandwiches, bbqMeat,
    drink, isTrending, mostPopular, isHealthy, isSupreme, valueSlider]);

  const anchor = useSelector((state) => state.scrollAnchor.scrollAnchor);

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

  const foodCategories = {
    burgers: `${burgers}`,
    pizza: `${pizza}`,
    sushi: `${sushi}`,
    salads: `${salads}`,
    pasta: `${pasta}`,
    sandwiches: `${sandwiches}`,
    bbqMeat: `${bbqMeat}`,
    drink: `${drink}`,
  };

  const filteredItemsByCatagory = products.filter((prod) => {
    const category = prod.filterCategories;
    const price = prod.currentPrice;
    return (Object.values(foodCategories).includes('true')
      ? (JSON.parse(foodCategories[category]) && price < valueSlider)
      : (price < valueSlider));
  });

  const filters = [
    { condition: mostPopular, filterFunc: (el) => el.rating > 4 },
    { condition: isTrending, filterFunc: (el) => el.isTrending },
    { condition: isHealthy, filterFunc: (el) => el.isHealthy },
    { condition: isSupreme, filterFunc: (el) => el.isSupreme },
  ];

  const filteredAndSortedItems = filters.reduce((items, filter) => {
    if (filter.condition) {
      return items.filter(filter.filterFunc);
    }
    return items;
  }, filteredItemsByCatagory);

  const handleApplyFilter = () => {
    if (filteredAndSortedItems.length === 0) {
      // eslint-disable-next-line no-undef,no-alert
      // alert('Nothing found :(');
      // console.log(e);
      handleShowAlert(true);
      dispatch(setFilter([]));
    } else {
      dispatch(setFilter(filteredAndSortedItems));
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
          <Button
            sx={stylesBtnReset}
            onClick={handleResetFilter}
          >
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

          {/* <ToggleButton
            sx={stylesToggleButton}
            value="vegan"
            selected={vegan}
            onChange={() => {
              setVegan(!vegan);
            }}
          >
            <Stack sx={stylesCategoryItem}>
              <CardMedia component="img" image="./img/vegan.png" alt="vegan" />
              <Typography>Vegan</Typography>
            </Stack>
          </ToggleButton> */}
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
            aria-label="Always visible"
            // defaultValue={15}
            // getAriaValueText={valuetext}
            value={valueSlider}
            step={1}
            marks={marks}
            valueLabelDisplay="on"
            onChange={(event, newValue) => setValueSlider(newValue)}
          />
        </Box>
      </Stack>
      <Button
        sx={stylesBtn}
        onClick={(e) => handleShowAlert(e)}
      >
        Apply
      </Button>
      { alert && <CustomAlert type="warning" handleCloseAlert={handleCloseAlert} content="Nothing found :(" /> }
    </Stack>
  );
};

export default Filter;
