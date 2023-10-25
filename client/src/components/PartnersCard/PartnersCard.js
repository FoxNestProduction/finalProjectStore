import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import { fixedDecodeURIComponent } from '../../utils/uriEncodeHelpers';
import RestaurantCard from '../RestaurantCard/RestaurantCard';
import useGetPartners from '../../customHooks/useGetPartners';

const PartnersCard = ({ partnersName }) => {
  const partners = useGetPartners();

  const nameOfPartners = fixedDecodeURIComponent(partnersName);
  const rest = partners.find((item) => item.name.toLowerCase() === nameOfPartners);
  const styleRestaurantCard = {
    mobile: 315,
    lgTablet: 881,
    desktop: 1285,
  };

  return (
    <Container
      component="section"
      sx={{
        bgcolor: 'background.default',
        mt: { mobile: 5, tablet: 8 },
        mb: { mobile: 5, tablet: 8 },
      }}
    >

      <RestaurantCard {...rest} styleWidth={styleRestaurantCard} />
    </Container>
  );
};

PartnersCard.propTypes = {
  partnersName: PropTypes.string.isRequired,
};

export default PartnersCard;
