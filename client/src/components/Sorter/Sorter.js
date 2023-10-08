import { Button, Container, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { stylesWrap, stylesIconsWrap, stylesTitle, stylesSlider, stylesBtn, stylesSortBtn } from './styles';

const Sorter = () => {
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
    <Stack sx={stylesWrap}>
      <Stack>
        <Typography sx={stylesTitle}>Category</Typography>
        <Stack>
          <div>Sorter</div>
        </Stack>
      </Stack>
      <Stack sx={{ mt: { mobile: '25px', tablet: '30px' } }}>
        <Typography sx={stylesTitle}>Sort By</Typography>
        <Stack
          direction="column"
          spacing={1}
          alignItems="flex-start"
          sx={{ width: '100%' }}
        >
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
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

      <Stack sx={{ mt: { mobile: '25px', tablet: '20px', desktop: '30px' } }}>
        <Typography sx={stylesTitle}>Price</Typography>
        <Box sx={{ width: '100%', mt: { mobile: '25px', tablet: '20px', desktop: '30px' } }}>
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

export default Sorter;
