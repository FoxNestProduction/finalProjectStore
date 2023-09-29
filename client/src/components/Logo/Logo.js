import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ReactComponent as LogoIcon } from '../../assets/svg/logo.svg';
import {
  stylesIconFooter,
  stylesIconHeader,
  stylesTitleFooter,
  stylesTitleHeader,
} from './styles';

const Logo = ({ type }) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        component="div"
        edge="center"
        aria-label="logo"
        sx={type === 'header' ? stylesIconHeader : stylesIconFooter}
      >
        <LogoIcon />
      </IconButton>
      <Typography
        sx={type === 'header' ? stylesTitleHeader : stylesTitleFooter}
      >
        eatly
      </Typography>
    </Stack>
  );
};

Logo.propTypes = {
  type: PropTypes.oneOf(['header', 'footer']),
};

Logo.defaultProps = {
  type: 'header',
};

export default Logo;
