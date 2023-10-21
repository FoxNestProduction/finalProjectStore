import { Button, CardMedia, Container, MenuItem, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useSelector, useDispatch } from 'react-redux';
import {
  stylesWrap,
  stylesTitle,
  stylesSlider,
  stylesBtn,
  stylesSortBtn,
  stylesCategoryIconsWrap,
  stylesCategoryItem,
  stylesToggleButton,
} from './styles';
import { setFilter } from '../../redux/slices/filterSlice';
import { setSearch, setInputSearchValue } from '../../redux/slices/searchSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [pizza, setPizza] = React.useState(false);
  const [burgers, setBurgers] = React.useState(false);
  const [sushi, setSushi] = React.useState(false);
  const [salads, setSalads] = React.useState(false);
  const [pasta, setPasta] = React.useState(false);
  const [sandwiches, setSandwiches] = React.useState(false);
  const [bbqMeat, setBbqMeat] = React.useState(false);
  const [drink, setDrink] = React.useState(false);
  const [isTranding, setIsTranding] = React.useState(false);
  const [mostPopular, setMostPopular] = React.useState(false);
  const [isHealthy, setIsHealthy] = React.useState(false);
  const [isSupreme, setIsSupreme] = React.useState(false);
  const [valueSlider, setValueSlider] = React.useState();

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

  const valuetext = (value) => {
    return (`${value}$`, setValueSlider(value));
  };
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
    { condition: isTranding, filterFunc: (el) => el.isTranding },
    { condition: isHealthy, filterFunc: (el) => el.isHealthy },
    { condition: isSupreme, filterFunc: (el) => el.isSupreme },
  ];
  const filteredAndSortedItems = filters.reduce((items, filter) => {
    if (filter.condition) {
      return items.filter(filter.filterFunc);
    }
    return items;
  }, filteredItemsByCatagory);
  // console.log(filteredAndSortedItems);
  const handleApplyFilter = () => {
    if (filteredAndSortedItems.length === 0) {
      alert('Nothing found :(');
    } else {
      dispatch(setFilter(filteredAndSortedItems));
      dispatch(setSearch([]));
      dispatch(setInputSearchValue(''));
    }
  };

  return (
    <Stack component="section" sx={stylesWrap}>
      <Stack component="div">
        <Typography component="h3" sx={stylesTitle}>
          Category
        </Typography>
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
              value="isTranding"
              selected={isTranding}
              onChange={() => {
                setIsTranding(!isTranding);
              }}
            >
              Tranding
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
            defaultValue={15}
            getAriaValueText={valuetext}
            step={1}
            marks={marks}
            valueLabelDisplay="on"
          />
        </Box>
      </Stack>
      <Button
        sx={stylesBtn}
        onClick={handleApplyFilter}
      >
        Apply
      </Button>
    </Stack>
  );
};

export default Filter;
