import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './RestaurantItem.module.scss';
import BookmarkIcon from '../SvgComponents/BookmarkIcon';
import RatingItem from './Rating';
import ColorChips from './Chip';

const RestaurantItem = ({ rating, name, imageUrl }) => {
  const localtheme = createTheme({
    MaiChip: {
      styleOverrides: {
        root: {
          width: 78,
          height: 24,
          borderRadius: 8,
          marginRight: '10px',
        },
      },
    },
  });

  return (
    <ThemeProvider localtheme={localtheme}>
      <Card
        sx={{
          maxWidth: '395px',
          display: 'flex',
          flexWrap: 'wrap',
          boxShadow: '0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        }}
      >

        <CardMedia
          component="img"
          height="177"
          image="./img/restaurants/Resturent01.jpg"
          alt={name}
        />
        <ColorChips />
        <CardHeader
          title={name}
          // color="text.healthy"
          sx={{
            padding: '0',
            marginLeft: '32px',
            marginBottom: '10px',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            marginLeft: '32px',
            marginBottom: '20px',
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              gap: '10px',
              width: '100%',
              padding: '0',
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                paddingTop: '7px',
              }}
            >
              24min •
            </Typography>

            <RatingItem defaultValue={rating} />

          </CardContent>
          <CardActions
            disableSpacing
            sx={{
              padding: '0',
              paddingRight: '18px',
            }}
          >
            <IconButton
              aria-label="add to favorites"
              sx={{
                padding: '0',
              }}
            >
              <BookmarkIcon />
            </IconButton>
          </CardActions>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

RestaurantItem.propTypes = {
  rating: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
};

RestaurantItem.defaultProps = {
  rating: 3,
  name: 'The Chicken King',
  imageUrl: '',
};

export default RestaurantItem;
