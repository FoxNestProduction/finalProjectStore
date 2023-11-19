import React, { cloneElement, memo } from 'react';
import { useScrollTrigger } from '@mui/material';
import PropTypes from 'prop-types';

const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      bgcolor: 'rgba(249,249,249,0.9)',
    },
  });
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default memo(ElevationScroll);
