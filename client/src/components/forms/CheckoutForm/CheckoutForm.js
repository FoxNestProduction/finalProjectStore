import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';

import Input from '../../inputs/Input/Input';
import validationSchema from './validationSchema';
import SelectForFormik from '../../inputs/Select/Select';
import CheckoutActions from './CheckoutActions';
import {
  subtitle,
  paymentRadioBtn, paymentWrapper,
} from './styles';
import { updateCustomer } from '../../../redux/slices/userSlice';
import { CHECKOUT_SS_KEY } from '../../../constants/constants';
import {
  getDataFromSessionStorage,
  removeDataFromSessionStorage,
  updateSessionStorageValues,
} from '../../../utils/sessionStorageHelpers';
import { putNewOrder, setPendingOrderInfo } from '../../../redux/slices/orderSlice';
import saveUserInfoToSessionStorage from '../../../utils/saveUserInfoToSessionStorage';
import { deleteCart, resetCart, setRestaurants } from '../../../redux/slices/cartSlice';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  const getInitialValues = () => ({
    name: '',
    email: '',
    tel: '',
    city: 'Kyiv',
    street: '',
    house: '',
    apartment: '',
    payment: 'Card',
  });

  const [initialValues, setInitialValues] = useState(getInitialValues);

  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const user = useSelector((state) => state.user.user, shallowEqual);
  const token = useSelector((state) => state.authorization.token);
  const cart = useSelector((state) => state.cart.cart.products, shallowEqual);

  const updateCustomerLoading = useSelector((state) => state.user.loading.updatedCustomer);
  const orderLoading = useSelector((state) => state.order.loading);
  const orderError = useSelector((state) => state.order.error);

  useEffect(() => {
    const checkoutValues = getDataFromSessionStorage(CHECKOUT_SS_KEY);
    const newValues = getInitialValues();

    if (checkoutValues) {
      Object.keys(checkoutValues).forEach((key) => {
        if (key in newValues) {
          newValues[key] = checkoutValues[key];
        }
      });
    }
    setInitialValues(newValues);
  }, [isUserAuthorized]);

  const handleFieldBlur = (e, handleBlur) => {
    handleBlur(e);
    updateSessionStorageValues(CHECKOUT_SS_KEY, { [e.target.name]: e.target.value });
  };

  const handleContinue = async (values) => {
    // updating user info in DB and user slice
    if (isUserAuthorized && token) {
      const customerUpdates = {
        telephone: values.tel,
      };
      await dispatch(updateCustomer(customerUpdates));
    }

    const { name, email, tel, city, street, house, apartment, payment } = values;
    const newOrder = {
      products: cart,
      name,
      email,
      mobile: tel,
      deliveryAddress: {
        city,
        street,
        house,
        apartment,
      },
      paymentInfo: payment,
    };

    if (isUserAuthorized && user) {
      const { _id: id } = user;
      newOrder.customerId = id;
    }

    if (values.payment === 'Cash') {
      newOrder.status = 'new_order/cash';
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
    } else {
      dispatch(setPendingOrderInfo(newOrder));
      navigate('/checkout/payment');
    }
  };

  const setInitialTouched = () => {
    const values = getDataFromSessionStorage(CHECKOUT_SS_KEY);
    if (values) {
      return {
        name: 'name' in values,
        email: 'email' in values,
        tel: 'tel' in values,
        street: 'street' in values,
        house: 'house' in values,
      };
    }
    return null;
  };

  const setIsValid = (touched, errors) => {
    return !Object.keys(errors).some((key) => touched[key] === true);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleContinue}
      validationSchema={validationSchema(t)}
      enableReinitialize
      initialTouched={setInitialTouched()}
    >
      {({ handleBlur, touched, errors }) => (
        <Form>
          <Stack spacing={4}>
            <Divider />
            <Typography variant="h3" component="h2" align="left" sx={subtitle}>
              {t('checkout.personalInformation')}
            </Typography>

            <Input
              name="name"
              id="checkout-name"
              label={t('checkout.labelName')}
              bgColor="#FFF"
              onBlur={(e) => {
                handleFieldBlur(e, handleBlur);
              }}
            />
            <Input
              name="email"
              id="checkout-email"
              label={t('checkout.labelMail')}
              bgColor="#FFF"
              onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
            />

            <Field name="tel">
              {({ field }) => (
                <InputMask
                  mask="+38 (099) 999-99-99"
                  {...field}
                  onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
                >
                  <Input type="tel" name="tel" id="checkout-tel" bgColor="#FFF" label={t('checkout.labelPhone')} />
                </InputMask>
              )}
            </Field>

            <Divider />
            <Typography variant="h3" component="h2" align="left" sx={subtitle}>
              {t('checkout.deliveryInformation')}
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="checkout-city-label">{t('checkout.city')}</InputLabel>
              <Field
                name="city"
                label={t('checkout.labelCity')}
                component={SelectForFormik}
                labelId="checkout-city-label"
                id="checkout-city"
                bgColor="#FFF"
                onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
              >
                <MenuItem value="Kyiv">Kyiv</MenuItem>
                <MenuItem value="Lviv">Lviv</MenuItem>
              </Field>
            </FormControl>

            <Input
              name="street"
              id="checkout-street"
              label={t('checkout.labelStreet')}
              bgColor="#FFF"
              onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
            />
            <Box sx={{ display: 'flex', gap: '5%' }}>
              <Input
                name="house"
                id="checkout-house"
                label={t('checkout.labelHose')}
                bgColor="#FFF"
                onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
              />
              <Input
                name="apartment"
                id="checkout-apartment"
                label={t('checkout.labelApartment')}
                bgColor="#FFF"
                onBlur={(e) => { handleFieldBlur(e, handleBlur); }}
              />
            </Box>

            <Divider />
            <Typography variant="h3" component="h2" align="left" sx={subtitle}>
              {t('checkout.paymentMethod')}
            </Typography>

            <Field name="payment">
              {({ field }) => (
                <FormControl sx={paymentWrapper}>
                  <RadioGroup {...field} onBlur={(e) => { handleFieldBlur(e, handleBlur); }}>
                    <FormControlLabel value="Card" control={<Radio />} label={t('checkout.labelCard')} sx={paymentRadioBtn} />
                    <FormControlLabel value="Cash" control={<Radio />} label={t('checkout.labelCash')} sx={paymentRadioBtn} />
                  </RadioGroup>
                </FormControl>
              )}
            </Field>

          </Stack>
          {orderError && (
            <Box>
              <Typography variant="body1" component="p" sx={{ color: 'text.error', mt: '15px', mb: '-15px' }}>
                {orderError}
              </Typography>
            </Box>
          )}
          <CheckoutActions
            isValid={setIsValid(touched, errors)}
            loading={(orderLoading || updateCustomerLoading) && !orderError}
          />
        </Form>
      )}
    </Formik>
  );
};

export default memo(CheckoutForm);
