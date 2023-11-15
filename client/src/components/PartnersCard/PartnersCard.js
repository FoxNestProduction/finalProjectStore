import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import RestaurantCard from '../RestaurantCard/RestaurantCard';

const PartnersCard = ({ partner }) => {
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

      <RestaurantCard {...partner} styleWidth={styleRestaurantCard} />
    </Container>
  );
};

PartnersCard.propTypes = {
  partner: PropTypes.object,
};

PartnersCard.defaultProps = {
  partner: {},
};

export default memo(PartnersCard);
