import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    healthy: {
      background: '#F7EDD0',
      text: '#DAA31A',
    },
    trending: {
      background: '#F7C5BA',
      text: '#FB471D',
    },
    supreme: {
      background: '#00B67A',
      text: '#309D5B',
    },
  },
});

const ColorChips = () => {
  return (
  // <Stack spacing={1} alignItems="center">
  //   <Stack direction="row" spacing={1}>
  //     <Chip label="primary" color="primary" />
  //     <Chip label="success" color="success" />
  //   </Stack>
  // </Stack>

    <ThemeProvider theme={theme}>
      <Box sx={{ padding: '10px' }}>
        <Chip
          label="Healthy"
          sx={{
            backgroundColor: (colors) => theme.palette.healthy.background,
            color: (colors) => theme.palette.healthy.text,
            width: '78px',
            height: '24px',
            borderRadius: '8px',
          }}
        />
        <Chip
          label="Trending"
          sx={{
            backgroundColor: (colors) => theme.palette.trending.background,
            color: (colors) => theme.palette.trending.text,
            width: '78px',
            height: '24px',
            borderRadius: '8px',
          }}
        />
        <Chip
          label="Supreme"
          sx={{
            backgroundColor: (colors) => theme.palette.supreme.background,
            color: (colrs) => theme.palette.supreme.text,
            width: '78px',
            height: '24px',
            borderRadius: '8px',
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

// RatingItem.propTypes = {
//   ratingValue: PropTypes.number,
// };

// RatingItem.defaultProps = {
//   ratingValue: null,
// };

export default ColorChips;
