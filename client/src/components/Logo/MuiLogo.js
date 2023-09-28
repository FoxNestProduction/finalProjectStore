import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import { ReactComponent as LogoIcon } from '../../assets/svg/logo.svg';

const MuiLogo = () => {
  const iconSize = {
    width: {
      zero: 40,
      mobile: 40,
      tabet: 44,
      desktop: 62,
    },
    height: {
      zero: 37,
      mobile: 37,
      tabet: 40,
      desktop: 57,
    },
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        edge="center"
        aria-label="logo"
        sx={{
          p: 0,
          mr: '10px',
          width: {
            zero: 40,
            mobile: 40,
            tablet: 44,
            desktop: 62,
          },
          height: {
            zero: 37,
            mobile: 37,
            tablet: 40,
            desktop: 57,
          },
        }}
      >
        <LogoIcon />
      </IconButton>
      <Typography
        sx={{
          color: 'primary.main',
          fontFamily: 'fontFamily.secondary',
          fontWeight: 'fontWeight.bold',
          fontSize: {
            zero: 18,
            mobile: 18,
            tablet: 20,
            desktop: 29,
          },
        }}
      >
        eatly
      </Typography>
    </Stack>
  );
};

export default MuiLogo;
