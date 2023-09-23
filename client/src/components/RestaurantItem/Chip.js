import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
// import makeStyles from '@mui/styles/makeStyles';
import theme from '../../themeMui/theme';

// const useStyles = makeStyles(() => ({
//   root: {
//     backgroundColor: theme.palette.healthyColor.background,
//   },
// }));

const ColorChips = () => {
  // const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          paddingTop: theme.components.chip.paddingTop,
          paddingLeft: theme.components.chip.paddingLeft,
        }}
      >
        <Chip
          label="Healthy"
          sx={{
            backgroundColor: theme.palette.healthyColor.background,
            color: theme.palette.healthyColor.text,
            width: theme.components.chip.width,
            height: theme.components.chip.height,
            borderRadius: theme.components.chip.borderRadius,
            marginRight: theme.components.chip.marginRight,
          }}
          // className={classes.root}
        />
        <Chip
          label="Trending"
          sx={{
            backgroundColor: theme.palette.trendingColor.background,
            color: theme.palette.trendingColor.text,
            width: theme.components.chip.width,
            height: theme.components.chip.height,
            borderRadius: theme.components.chip.borderRadius,
            marginRight: theme.components.chip.marginRight,
          }}
        />
        <Chip
          label="Supreme"
          sx={{
            backgroundColor: theme.palette.supremeColor.background,
            color: theme.palette.supremeColor.text,
            width: theme.components.chip.width,
            height: theme.components.chip.height,
            borderRadius: theme.components.chip.borderRadius,
            marginRight: theme.components.chip.marginRight,
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
