import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Stack, Typography } from '@mui/material';
import { ReactComponent as LogoIcon } from '../../assets/svg/logo.svg';
import { stylesIconFooter, stylesTitleFooter, stylesIconHeader, stylesTitleHeader } from './styles';

const Logo = ({ type }) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        component="div"
        aria-label="logo"
        sx={type === 'footer' ? stylesIconFooter : stylesIconHeader}
      >
        <LogoIcon />
      </IconButton>
      <Typography sx={type === 'footer' ? stylesTitleFooter : stylesTitleHeader}>
        eatly
      </Typography>
    </Stack>
  );
};

Logo.propTypes = {
  type: PropTypes.string,
};

Logo.defaultProps = {
  type: '',
};

export default memo(Logo);
