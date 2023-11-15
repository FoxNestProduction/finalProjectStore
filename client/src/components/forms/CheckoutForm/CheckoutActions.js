import React, { memo } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { backBtn, btn, buttonsWrapper, continueBtn } from './styles';

const CheckoutActions = ({ isValid }) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={buttonsWrapper}>
      <Button type="button" variant="outlined" sx={{ ...btn, ...backBtn }} onClick={handleGoBack}>
        Back
      </Button>
      <Button type="submit" variant="contained" sx={{ ...btn, ...continueBtn }} disabled={!isValid}>
        Continue
      </Button>
    </Box>
  );
};

CheckoutActions.propTypes = {
  isValid: PropTypes.bool,
};

CheckoutActions.defaultProps = {
  isValid: true,
};

export default memo(CheckoutActions);
