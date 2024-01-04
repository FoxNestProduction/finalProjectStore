import React, { memo } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { backBtn, btn, buttonsWrapper, continueBtn } from './styles';

const CheckoutActions = ({ isValid, loading }) => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={buttonsWrapper}>
      <Button type="button" variant="outlined" sx={{ ...btn, ...backBtn }} onClick={handleGoBack} disabled={loading}>
        {t('checkout.back')}
      </Button>
      <Button type="submit" variant="contained" sx={{ ...btn, ...continueBtn }} disabled={!isValid || loading}>
        {!loading
          ? t('checkout.continue')
          : <CircularProgress color="primary" size="1.5em" />}
      </Button>
    </Box>
  );
};

CheckoutActions.propTypes = {
  isValid: PropTypes.bool,
  loading: PropTypes.bool,
};

CheckoutActions.defaultProps = {
  isValid: true,
  loading: false,
};

export default memo(CheckoutActions);
