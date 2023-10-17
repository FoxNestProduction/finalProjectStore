import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { fixedDecodeURIComponent } from '../../utils/uriEncodeHelpers';
import RestaurantCard from '../RestaurantCard/RestaurantCard';

const PartnersCard = ({ partnersName }) => {
  const partners = useSelector((state) => state.partners.partners, shallowEqual);

  const nameOfPartners = fixedDecodeURIComponent(partnersName);
  const rest = partners.find((item) => item.name.toLowerCase() === nameOfPartners);

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
    </Container>
  );
};

PartnersCard.propTypes = {
  partnersName: PropTypes.string.isRequired,
};

export default PartnersCard;
