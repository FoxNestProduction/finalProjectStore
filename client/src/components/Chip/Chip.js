import React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const ColorChips = ({ isHealthy, isTranding, isSupreme, customStyles }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '3%',
        flexWrap: 'wrap',
        width: '100%',
        marginBottom: {
          mobile: 0,
          desktop: 1,
        },
      }}
    >
      { isHealthy && (
        <Chip
          label="Healthy"
          sx={{
            ...customStyles,
            backgroundColor: 'background.healthy',
            color: 'text.healthy',
          }}
        />
      ) }
      { isTranding && (
        <Chip
          label="Trending"
          sx={{
            ...customStyles,
            backgroundColor: 'background.trending',
            color: 'text.trending',
          }}
        />
      ) }
      { isSupreme && (
        <Chip
          label="Supreme"
          sx={{
            ...customStyles,
            backgroundColor: 'background.supreme',
            color: 'text.supreme',
          }}
        />
      )}
    </Box>
  );
};

ColorChips.propTypes = {
  isHealthy: PropTypes.bool,
  isTranding: PropTypes.bool,
  isSupreme: PropTypes.bool,
  customStyles: PropTypes.object,
};

ColorChips.defaultProps = {
  isHealthy: false,
  isTranding: false,
  isSupreme: false,
  customStyles: {},
};

export default ColorChips;
