import React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { PropTypes } from 'prop-types';

const ColorChips = ({ isHealthy, isTrending, isSupreme }) => {
  const chipSize = {
    width: '66px',
    height: '24px',
    borderRadius: '8px',
    marginRight: '10px',
    marginBottom: '5px',
    fontSize: '0.625rem',
  };

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
            ...chipSize,
            backgroundColor: 'background.healthy',
            color: 'text.healthy',
          }}
        />
      ) }
      { isTrending && (
        <Chip
          label="Trending"
          sx={{
            ...chipSize,
            backgroundColor: 'background.trending',
            color: 'text.trending',
          }}
        />
      ) }
      { isSupreme && (
        <Chip
          label="Supreme"
          sx={{
            ...chipSize,
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
};

ColorChips.defaultProps = {
  isHealthy: true,
  isTrending: true,
  isSupreme: false,
};

export default ColorChips;
