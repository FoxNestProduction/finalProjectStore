import React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const ColorChips = ({ isHealthy, isTrending, isSupreme, customStyles }) => {
  return (
    <Box
      sx={{
        margin: '10px 32px',
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
      { isTrending && (
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
      ) }
    </Box>
  );
};

ColorChips.propTypes = {
  isHealthy: PropTypes.bool,
  isTrending: PropTypes.bool,
  isSupreme: PropTypes.bool,
  customStyles: PropTypes.object,
};

ColorChips.defaultProps = {
  isHealthy: true,
  isTrending: true,
  isSupreme: true,
  customStyles: {},
};

export default ColorChips;
