/* eslint-disable import/no-cycle */
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Typography, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import validationSchema from './validationSchema';
import {
  flexcenter,
  inputsWrapper,
  signInBtn,
} from './styles';
import Input from '../../inputs/Input/Input';
import {
  setAuthorization,
  setToken,
} from '../../../redux/slices/authorizationSlice';
import { loginCustomer, setUser } from '../../../redux/slices/userSlice';
import { setAuthorizationError } from '../../../redux/slices/errorSlice';
import { removeDataFromSessionStorage } from '../../../utils/sessionStorageHelpers';
import { CHECKOUT_SS_KEY } from '../../../constants/constants';
import saveUserInfoToSessionStorage from '../../../utils/saveUserInfoToSessionStorage';
import { instance } from '../../../API/instance';
import { fetchCartAfterAuthorization } from '../../../redux/slices/cartSlice';
import { fetchFavourites } from '../../../redux/slices/favouriteSlice';
import useAlert from '../../../customHooks/useAlert';
import { setNewGoogleUser } from '../../../redux/slices/newGoogleUserSlice';

const PartnerEditForm = ({ restaurant }) => {
  const { name, address, description } = restaurant;
  const initialValues = {
    name,
    address,
    description,
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Box sx={{
      width: '100%',
    }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid }) => (
          <Form>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              width: '100%',
            }}
            >
              <Box
                sx={{
                  ...flexcenter,
                  ...inputsWrapper,
                }}
              >
                <Input
                  // error={authError.email}
                  name="name"
                  id="editRestaurantName"
                  label="Name"
                  bgColor="common.white"
                  styles={{
                    fontWeight: '500',
                  }}
                />
                <Input
                  // error={authError.password}
                  name="address"
                  id="editRestaurantAddress"
                  label="Address"
                  bgColor="common.white"
                  styles={{
                    // bgcolor: 'common.white',
                    fontWeight: '500',
                  }}
                />
                <Input
                  // error={authError.password}
                  name="description"
                  id="editRestaurantDescription"
                  label="Description"
                  bgColor="common.white"
                  styles={{
                    fontWeight: '500',
                  }}
                />
              </Box>
              <Button
                disableRipple
                variant="contained"
                sx={signInBtn}
                type="submit"
                disabled={!isValid}
              >
                Sign in
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

PartnerEditForm.propTypes = {
  restaurant: PropTypes.object,
};

PartnerEditForm.defaultProps = {
  restaurant: {},
};

export default memo(PartnerEditForm);
