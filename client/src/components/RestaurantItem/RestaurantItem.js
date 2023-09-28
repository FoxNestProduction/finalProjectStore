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
import BookmarkIcon from '../../assets/svgComponents/BookmarkIcon';
import RatingItem from '../Rating/Rating';
import ColorChips from '../Chip/Chip';

const RestaurantItem = ({ rating, name, imageUrl }) => {
  const styles = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  return (
    <Card
      sx={{
        ...styles,
        flexWrap: 'wrap',
        maxWidth: {
          mobile: 315,
          tablet: 281,
          desktop: 395,
        },
        boxShadow: '6px 71px 35px 0px rgba(229, 229, 229, 0.70)',
      }}
    >

      <CardMedia
        component="img"
        height={{
          mobile: 140,
          tablet: 125,
          desktop: 177,
        }}
        image={imageUrl}
        alt={name}
      />
      <ColorChips />
      <CardHeader
        title={(
          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              fontSize: {
                mobile: '1.2rem',
                tablet: '1.3rem',
                desktop: '1.5rem',
              },
            }}
          >
            {name}
          </Typography>
        )}
        sx={{
          padding: '0',
          marginLeft: '32px',
          marginBottom: {
            desktop: '10px',
          },
        }}
      />
      <Box
        sx={{
          ...styles,
          marginLeft: '32px',
          marginBottom: '20px',
        }}
      >
        <CardContent
          sx={{
            ...styles,
            gap: {
              mobile: '10px',
              tablet: 0,
              desktop: '10px',
            },
            padding: '0',
            flexWrap: 'wrap',
          }}
        >
          <RatingItem defaultValue={rating} />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              width: {
                // mobile: 140,
                desktop: 67,
                tablet: '100%',
              },
            }}
          >
            24min •
          </Typography>

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
              width: {
                mobile: 35,
                tablet: 41,
              },
              height: {
                mobile: 35,
                tablet: 41,
              },
            }}
          >
            <BookmarkIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
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
  imageUrl: './img/restaurants/Resturent01.jpg',
};

export default RestaurantItem;
