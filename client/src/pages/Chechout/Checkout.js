import React, { memo } from 'react';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import GroupOfStarsSvg from '../../assets/svgComponents/GroupOfStarsSvg';
import {
  formContainer,
  mainContainer,
  starsWrapper,
  title,
} from './styles';

const CheckoutPage = ({ titleText, formComponent: FormComponent }) => {
  return (
    <Container sx={mainContainer}>
      <Box sx={{ position: 'relative' }}>
        <Box sx={formContainer}>
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
      </Box>
    </Container>
  );
};

CheckoutPage.propTypes = {
  titleText: PropTypes.string.isRequired,
  formComponent: PropTypes.elementType.isRequired,
};

export default memo(CheckoutPage);
