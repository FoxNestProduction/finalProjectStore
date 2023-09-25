import React from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { PropTypes } from 'prop-types';

const ColorChips = ({ isHealthy, isTrending, isSupreme }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        margin: '10px 32px',
        width: '100%',
      }}
    >
      { isHealthy && (
        <Chip
          label="Healthy"
          sx={{
            backgroundColor: theme.palette.healthyColor.background,
            color: theme.palette.healthyColor.text,
            width: theme.components.MaiChip.root.width,
            height: theme.components.MaiChip.root.height,
            borderRadius: theme.components.MaiChip.root.borderRadius,
            marginRight: theme.components.MaiChip.root.marginRight,
          }}
        />
      ) }
      { isTrending && (
        <Chip
          label="Trending"
          sx={{
            backgroundColor: theme.palette.trendingColor.background,
            color: theme.palette.trendingColor.text,
            width: theme.components.MaiChip.root.width,
            height: theme.components.MaiChip.root.height,
            borderRadius: theme.components.MaiChip.root.borderRadius,
            marginRight: theme.components.MaiChip.root.marginRight,
          }}
        />
      ) }
      { isSupreme && (
        <Chip
          label="Supreme"
          sx={{
            backgroundColor: theme.palette.supremeColor.background,
            color: theme.palette.supremeColor.text,
            width: theme.components.MaiChip.root.width,
            height: theme.components.MaiChip.root.height,
            borderRadius: theme.components.MaiChip.root.borderRadius,
            marginRight: theme.components.MaiChip.root.marginRight,
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
  isSupreme: true,
};

export default ColorChips;
