import React, { memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LockIcon from '@mui/icons-material/Lock';
import validationSchema from './validationSchema';
import {
  flexcenter,
  container,
  mainTitle,
  inputsWrapper,
  signUpBtn,
} from './styles';
import Input from '../../inputs/Input/Input';
import { closeModal } from '../../../redux/slices/modalSlice';
import { setAuthorization, setToken } from '../../../redux/slices/authorizationSlice';
import { registerCustomer, setUser } from '../../../redux/slices/userSlice';
import { setRegistrationError } from '../../../redux/slices/errorSlice';
import { removeDataFromSessionStorage } from '../../../utils/sessionStorageHelpers';
import { CHECKOUT_SS_KEY } from '../../../constants/constants';
import saveUserInfoToSessionStorage from '../../../utils/saveUserInfoToSessionStorage';
import { instance } from '../../../API/instance';
import { createCart } from '../../../redux/slices/cartSlice';

export const initialValues = {
  password: '',
};

const CreatePasswordForm = () => {
  const dispatch = useDispatch();
  const newGoogleUser = useSelector((state) => state.newGoogleUser.newGoogleUser);

  const handleSubmit = async (values) => {
    const login = newGoogleUser.email.split('@')[0];
    const newCustomer = {
      ...newGoogleUser,
      ...values,
      login,
      isAdmin: false,
    };

    const data = await dispatch(registerCustomer(newCustomer)).unwrap();

    if (data.success) {
      const { user, token } = data;
      dispatch(setToken(token));
      dispatch(setAuthorization(true));
      dispatch(closeModal());
      dispatch(setRegistrationError(''));
      removeDataFromSessionStorage(CHECKOUT_SS_KEY);
      saveUserInfoToSessionStorage(user);
      dispatch(createCart());
    }
  };

  return (
    <Box
      component="section"
      sx={{
        ...flexcenter,
        ...container,
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        sx={mainTitle}
      >
        Create your own password
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid }) => (
          <Form>
            <Box
              sx={{
                ...flexcenter,
                flexDirection: 'column',
                ...inputsWrapper,
              }}
            >
              <Input
                type="password"
                name="password"
                id="registerPassword"
                label="Password"
                placeholder="Сome up with a password"
                icon={<LockIcon />}
              />
              <Button
                disableRipple
                variant="contained"
                sx={signUpBtn}
                type="submit"
                disabled={!isValid}
              >
                Sign up
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default memo(CreatePasswordForm);
