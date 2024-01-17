/* eslint-disable no-undef */
import React, { memo } from 'react';
import { Form, Formik } from 'formik';
import Stack from '@mui/material/Stack';
import {
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useTranslation } from 'react-i18next';
import Input from '../../inputs/Input/Input';
import { subtitle, input, paymentSystemsWrapper, imgVisa } from './styles';
import CheckoutActions from '../CheckoutForm/CheckoutActions';
import { putNewOrder } from '../../../redux/slices/orderSlice';
import { removeDataFromSessionStorage } from '../../../utils/sessionStorageHelpers';
import { CHECKOUT_SS_KEY } from '../../../constants/constants';
import { resetCart, deleteCart, setRestaurants } from '../../../redux/slices/cartSlice';
import saveUserInfoToSessionStorage from '../../../utils/saveUserInfoToSessionStorage';

const PaymentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const user = useSelector((state) => state.user.user, shallowEqual);
  const pendingOrderInfo = useSelector((state) => state.order.pendingOrderInfo, shallowEqual);
  const orderLoading = useSelector((state) => state.order.loading);
  const orderError = useSelector((state) => state.order.error);

  const initialValues = {
    name: isUserAuthorized ? `${user.firstName} ${user.lastName}` : `${pendingOrderInfo.name}`,
    cardNumber: '0000 0000 0000 0000',
    expiryDate: '03/25',
    cvv: '123',
  };

  const handleContinue = async () => {
    const newOrder = {
      ...pendingOrderInfo,
      status: 'new_order/paid',
    };
    const response = await dispatch(putNewOrder(newOrder)).unwrap();
    if (response.status === 200) {
      removeDataFromSessionStorage(CHECKOUT_SS_KEY);
      dispatch(resetCart());
      dispatch(setRestaurants());
      if (isUserAuthorized && user) {
        saveUserInfoToSessionStorage(user);
        dispatch(deleteCart());
      }
      navigate('/order-confirmation');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleContinue}
    >
      {({ isValid }) => (
        <Form>
          <Stack
            spacing={4}
          >
            <Box sx={paymentSystemsWrapper}>
              <IconButton
                aria-label="checked"
                size="small"
                disableFocusRipple
                disableRipple
                sx={{
                  cursor: 'initial',
                }}
                disabled
              >
                <CheckCircleOutlineIcon fontSize="small" />
              </IconButton>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/img/checkout/visa.png`}
                alt="visa"
                sx={imgVisa}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ userSelect: 'none', color: 'text.primary' }}
              >
                {t('payment.credit')}
                /
                {' '}
                <Typography
                  component="span"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {t('payment.debit')}
                </Typography>
              </Typography>
            </Box>
            <Box sx={paymentSystemsWrapper}>
              <IconButton
                aria-label="checked"
                size="small"
                disableFocusRipple
                disableRipple
                sx={{
                  cursor: 'initial',
                }}
                disabled
              >
                <RadioButtonUncheckedIcon fontSize="small" />
              </IconButton>
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/img/checkout/mastercard.png`}
                alt="visa"
                sx={imgVisa}
              />
              <Typography
                variant="body1"
                component="p"
                sx={{ userSelect: 'none', color: 'text.primary' }}
              >
                {t('payment.credit')}
                /
                {' '}
                <Typography
                  component="span"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {t('payment.debit')}
                </Typography>
              </Typography>
            </Box>

            <Typography variant="h3" component="h2" align="left" sx={subtitle}>
              {t('payment.addNewCard')}
            </Typography>

            <Input
              name="name"
              id="checkout-name"
              label={t('payment.labelHolderName')}
              bgColor="#FFF"
              disabled
              styles={input}
            />
            <Input
              name="cardNumber"
              id="checkout-cardNumber"
              label={t('payment.labelNumberCard')}
              bgColor="#FFF"
              disabled
              styles={input}
            />
            <Box sx={{ display: 'flex', gap: '5%' }}>
              <Input
                name="expiryDate"
                id="checkout-expiryDate"
                label={t('payment.labelDateCard')}
                bgColor="#FFF"
                disabled
                styles={input}
              />
              <Input
                name="cvv"
                id="checkout-cvv"
                label={t('payment.labelCvvCard')}
                bgColor="#FFF"
                type="password"
                disabled
                styles={input}
              />
            </Box>

          </Stack>
          {orderError && (
            <Box>
              <Typography variant="body1" component="p" sx={{ color: 'text.error', mt: '15px', mb: '-15px' }}>
                {orderError}
              </Typography>
            </Box>
          )}

          <CheckoutActions isValid={isValid} loading={orderLoading} />
        </Form>
      )}
    </Formik>
  );
};

export default memo(PaymentForm);
