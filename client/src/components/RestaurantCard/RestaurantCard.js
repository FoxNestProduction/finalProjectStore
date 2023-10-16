import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import BookmarkIcon from '../../assets/svgComponents/BookmarkIcon';
import RatingItem from '../Rating/Rating';

const RestaurantCard = ({ rating, name, imageUrl }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        maxWidth: {
          mobile: 315,
          lgTablet: 881,
          desktop: 1285,
        },
        margin: '0 auto',
        boxShadow: '6px 71px 35px 0px rgba(229, 229, 229, 0.70)',
        '&:hover .MuiCardMedia-img': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          sx={{
            transition: '.3s',
            height: { mobile: '140px', lgTablet: '268px', desktop: '378px' },
          }}
        />
      </Box>
      <Stack
        direction="row"
        width="100%"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        sx={{ margin: '25px' }}
      >
        <CardHeader
          title={(
            <Typography
              variant="h3"
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
            marginBottom: {
              desktop: '10px',
            },
            width: { mobile: '100%', lgTablet: '40%' },
          }}

        />
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0',
            width: { mobile: '87%', lgTablet: '55%' },
            flexWrap: 'noWrap',
          }}
        >
          <RatingItem ratingValue={rating} />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              width: {
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
            width: { mobile: '13%', lgTablet: '5%' },
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
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            width: {
              desktop: 67,
              tablet: '100%',
            },
            mt: '50px',
          }}
        >
          Serving the juiciest burgers in town with a variety of toppings and flavors.
          Fast food at its finest!
        </Typography>
      </Stack>
    </Card>
  );
};

RestaurantCard.propTypes = {
  rating: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
};

RestaurantCard.defaultProps = {
  rating: 3,
  name: 'The Chicken King',
  imageUrl: './img/restaurants/Resturent01.jpg',
};

export default RestaurantCard;
