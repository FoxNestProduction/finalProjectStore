import React, { memo, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import VerifiedIcon from '@mui/icons-material/Verified';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import RatingItem from '../Rating/Rating';

const RestaurantCard = ({ rating, name, imageUrl, description, styleWidth }) => {
  const [desc, setDesc] = useState(false);
  const { i18n, t } = useTranslation();
  const descriptionLang = description || {};

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: { ...styleWidth },
        margin: '0 auto',
        marginBottom: '50px',
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
            height: { mobile: '220px', lgTablet: '268px', desktop: '378px' },
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
            width: { mobile: '87%', lgTablet: '53%' },
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
          sx={{
            padding: '0',
            paddingRight: '0',
            width: { mobile: '13%', lgTablet: '7%' },
            justifyContent: 'flex-end',
          }}
        >
          <Box
            sx={{
              padding: '0',
              width: {
                mobile: '26px',
                tablet: '30px',
                desktop: '35px',
              },
              height: {
                mobile: '26px',
                tablet: '30px',
                desktop: '35px',
              },
            }}
          >
            <VerifiedIcon sx={{ color: 'primary.main', height: '100%', width: '100%' }} />
          </Box>
        </CardActions>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" width="100%" m="15px">
        <Button
          variant="contained"
          sx={{
            borderRadius: '14px',
            border: '1px solid primary.main',
            fontSize: { mobile: '14px', lgTablet: '18px' },
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
            ':hover': {
              backgroundColor: 'primary.hover',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
              zIndex: 100,
            },
            '&:active': {
              backgroundColor: 'common.white',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
              color: 'primary.main',
              border: '1px solid',
            },
          }}
          onClick={(e) => {
            e.preventDefault();
            setDesc((prev) => !prev);
          }}
        >
          {desc ? 'Close' : 'Show more'}
        </Button>
      </Stack>
      <Typography
        variant="description"
        component="p"
        margin={desc ? '25px' : '0'}
        sx={{ textAlign: 'justify' }}
      >
        {desc && (descriptionLang[i18n.language] || description)}
      </Typography>
    </Card>
  );
};

RestaurantCard.propTypes = {
  rating: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string, PropTypes.object,
  ]),
  styleWidth: PropTypes.object,
};

RestaurantCard.defaultProps = {
  rating: 3,
  name: '',
  imageUrl: '',
  description: {},
  styleWidth: {},
};

export default memo(RestaurantCard);
