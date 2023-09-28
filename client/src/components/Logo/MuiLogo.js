import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import { ReactComponent as LogoIcon } from '../../assets/svg/logo.svg';
import { stylesIcon, stylesTitle } from './styles';

const MuiLogo = () => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        edge="center"
        aria-label="logo"
        sx={stylesIcon}
      >
        <LogoIcon />
      </IconButton>
      <Typography sx={stylesTitle}>eatly</Typography>
    </Stack>
  );
};

export default MuiLogo;
