import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import ColorChips from '../Chip/Chip';
import { stylesButtonCard, stylesButtonCardOutline, stylesSectionCard, stylesHeaderTopCard, stylesHeaderInCard, stylesContentCard, stylesActionsCard, stylesPriceCard, stylesRatingCard, stylesLabelCard, stylesMediaCard } from './styles';
import { fixedDecodeURIComponent } from '../../utils/uriEncodeHelpers';
import RestaurantCard from '../RestaurantCard/RestaurantCard';

const PartnersCard = ({ partnersName }) => {
  const partners = useSelector((state) => state.partners.partners, shallowEqual);

  const nameOfPartners = fixedDecodeURIComponent(partnersName);
  // eslint-disable-next-line no-underscore-dangle
  const rest = partners.find((item) => item.name.toLowerCase() === nameOfPartners);
  // const dish = products.find((item) => item._id === productId);
  console.log('partners', partners);
  console.log('nameOfProduct', nameOfPartners);
  console.log('rest', rest);

  // console.log('description', rest.description);

  return (
    <Container
      component="section"
      sx={{
        bgcolor: 'background.default',
        mt: { mobile: 5, tablet: 8 },
        mb: { mobile: 5, tablet: 8 },
      }}
    >

      <RestaurantCard {...rest} />
      <div>
        <p>{rest.description}</p>
      </div>

    </Container>
  );
};

PartnersCard.propTypes = {
  partnersName: PropTypes.string.isRequired,
};

export default PartnersCard;
