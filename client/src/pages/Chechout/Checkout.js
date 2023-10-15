import React from 'react';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import GroupOfStarsSvg from '../../assets/svgComponents/GroupOfStarsSvg';
import {
  starsWrapper,
  title,
} from './styles';

const CheckoutPage = ({ titleText, formComponent: FormComponent }) => {
  return (
    <Container sx={{ pt: '45px', pb: { mobile: '100px', lgTablet: '150px' } }}>
      <Box sx={{ position: 'relative' }}>
        <Typography
          variant="h2"
          component="h1"
          align="center"
          mb="30px"
          sx={title}
        >
          {titleText}
        </Typography>
        <Box sx={starsWrapper}>
          <GroupOfStarsSvg />
        </Box>
        {FormComponent && <FormComponent />}
      </Box>
    </Container>
  );
};

CheckoutPage.propTypes = {
  titleText: PropTypes.string.isRequired,
  formComponent: PropTypes.elementType.isRequired,
};

export default CheckoutPage;
