import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import VerifiedIcon from '@mui/icons-material/Verified';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { memo } from 'react';
import BookmarkIcon from '../../assets/svgComponents/BookmarkIcon';
import RatingItem from '../Rating/Rating';
import ColorChips from '../Chip/Chip';
import { chipSizeRestaurant, chipBoxchipSizeRestaurant } from '../Chip/styles';
import { fixedEncodeURIComponent } from '../../utils/uriEncodeHelpers';

const RestaurantCard = ({ rating, name, imageUrl, isHealthy, isTrending, isSupreme, customId }) => {
  const styles = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  return (
    <Link to={`/restaurants/${fixedEncodeURIComponent(name)}/${customId}`}>
      <Card
        sx={{
          ...styles,
          flexWrap: 'wrap',
          maxWidth: {
            mobile: 315,
            lgTablet: 281,
            desktop: 395,
          },
          display: 'flex',
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
            height="160px"
            image={imageUrl}
            alt={name}
            sx={{
              transition: '.3s',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '3%',
            flexWrap: 'wrap',
            width: '100%',
            ...chipBoxchipSizeRestaurant,
          }}
        >
          <ColorChips
            customStyles={chipSizeRestaurant}
            isHealthy={isHealthy}
            isTrending={isTrending}
            isSupreme={isSupreme}
          />
        </Box>
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
            <RatingItem ratingValue={rating} />

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
            <Box
              sx={{
                padding: '0',
                width: {
                  mobile: '25px',
                  tablet: '30px',
                },
                height: {
                  mobile: '25px',
                  tablet: '30px',
                },
              }}
            >
              <VerifiedIcon sx={{ color: 'primary.main', height: '100%', width: '100%' }} />
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Link>
  );
};

RestaurantCard.propTypes = {
  rating: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  isHealthy: PropTypes.bool,
  isTrending: PropTypes.bool,
  isSupreme: PropTypes.bool,
  customId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

RestaurantCard.defaultProps = {
  isHealthy: false,
  isTrending: false,
  isSupreme: false,
  rating: 3,
  name: '',
  imageUrl: '',
  customId: '',
};

export default memo(RestaurantCard);
