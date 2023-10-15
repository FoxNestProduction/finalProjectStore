import { Button, CardMedia, Container, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
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

const Filter = () => {
  const [pizza, setPizza] = React.useState(false);
  const [burger, setBurger] = React.useState(false);
  const [sushi, setSushi] = React.useState(false);
  const [salad, setSalad] = React.useState(false);
  const [pasta, setPasta] = React.useState(false);
  const [sandwich, setSandwich] = React.useState(false);
  const [bbqMeat, setBbqMeat] = React.useState(false);
  const [drink, setDrink] = React.useState(false);
  // const [vegan, setVegan] = React.useState(false);
  const [recomended, setRecomended] = React.useState(false);
  const [mostPopular, setMostPopular] = React.useState(false);
  const [fastDelivery, setFastDelivery] = React.useState(false);

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
    return `${value}$`;
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
            spacing={{ gap: { mobile: '10px', tablet: '9px', desktop: '13px' } }}
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
              value="burger"
              selected={burger}
              onChange={() => {
                setBurger(!burger);
              }}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/burger.png" alt="burger" />
                <Typography component="p">Burger</Typography>
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
              value="salad"
              selected={salad}
              onChange={() => {
                setSalad(!salad);
              }}
            >
              <Stack component="div" sx={stylesCategoryItem}>
                <CardMedia component="img" image="./img/salad_2.png" alt="salad" />
                <Typography component="p">Salad</Typography>
              </Stack>
            </ToggleButton>
          </Stack>
          <Stack
            component="div"
            direction="row"
            spacing={{ gap: { mobile: '10px', tablet: '9px', desktop: '13px' } }}
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
              selected={sandwich}
              onChange={() => {
                setSandwich(!sandwich);
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
          {/* <div>Sorter : піца, бургер, салати, десерти, sea food,</div> */}
          {/* <div> мясо-гриль, веганська їжа, паста, напої</div> */}
        </Stack>
      </Stack>
      <Stack component="div" sx={{ mt: { mobile: '25px', tablet: '30px' } }}>
        <Typography component="h3" sx={stylesTitle}>
          Sort By
        </Typography>
        <Stack component="div" direction="column" spacing={0} alignItems="flex-start" sx={{ width: '100%' }}>
          <Stack
            component="div"
            direction="row"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <ToggleButton
              sx={stylesSortBtn}
              value="recomended"
              selected={recomended}
              onChange={() => {
                setRecomended(!recomended);
              }}
            >
              Recomended
            </ToggleButton>
            <ToggleButton
              sx={stylesSortBtn}
              value="fastDelivery"
              selected={fastDelivery}
              onChange={() => {
                setFastDelivery(!fastDelivery);
              }}
            >
              Fast Delivery
            </ToggleButton>
          </Stack>

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
      <Button sx={stylesBtn}>Apply</Button>
    </Stack>
  );
};

export default Filter;
