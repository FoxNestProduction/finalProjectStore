import React from 'react';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { NavLink } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Link,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AppleIcon from '@mui/icons-material/Apple';
import {
  closeModal, setContent,
} from '../../../redux/slices/modalSlice';
import validationSchema from './validationSchema';
import {
  flexcenter,
  googleAppleBtn,
  googleAppleBtnWrapper,
  mainTitle,
  legend,
  inputsWrapper,
  forgetPassword,
  signInBtn,
  signUpLink,
  appleIcon,
} from './styles';
// eslint-disable-next-line import/no-cycle
import RegisterForm from '../RegisterForm/RegisterForm';
import GoogleSvgComponent from '../../../assets/svgComponents/GoogleSvgComponent';
import Input from '../../inputs/Input/Input';
import { setAuthorization, setToken } from '../../../redux/slices/authorizationSlice';
import { setUser } from '../../../redux/slices/userSlice';
import { setAuthorizationError } from '../../../redux/slices/errorSlice';
import { removeDataFromSessionStorage, setDataToSessionStorage } from '../../../utils/sessionStorageHelpers';
import { CHECKOUT_SS_KEY } from '../../../constants/constants';
import saveUserInfoToSessionStorage from '../../../utils/saveUserInfoToSessionStorage';
import { instance } from '../../../API/instance';
import { fetchCart } from '../../../redux/slices/cartSlice';
import { fetchFavourites } from '../../../redux/slices/favouriteSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.error.authorization);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleOpenSignUpForm = () => {
    dispatch(setContent(<RegisterForm />));
  };

  const handleSubmit = async (values, actions) => {
    try {
      const response = await instance.post('/customers/login', values);
      const { token } = response.data;
      const { user } = response.data;
      if (token) {
        dispatch(setToken(token));
        dispatch(setAuthorization(true));
        dispatch(setUser(user));
        dispatch(closeModal());
        dispatch(setAuthorizationError(''));

        removeDataFromSessionStorage(CHECKOUT_SS_KEY);
        saveUserInfoToSessionStorage(user);
        dispatch(fetchCart());

        dispatch(fetchFavourites());
      }
    } catch (error) {
      dispatch(setAuthorizationError(error.response.data));
      console.error('Помилка авторизації:', error);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        pt: 0,
        ...flexcenter,
        width: {
          mobile: '100%',
          tablet: 350,
          desktop: 526,
        },
        bgcolor: 'common.white',
        p: {
          desktop: 2,
        },
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={mainTitle}
      >
        Sign In To eatly
      </Typography>
      <Box
        sx={{
          ...flexcenter,
          ...googleAppleBtnWrapper,
        }}
      >
        <Button
          disabled
          disableRipple
          variant="contained"
          sx={googleAppleBtn}
        >
          <GoogleSvgComponent />
        </Button>
        <Button
          disabled
          disableRipple
          variant="contained"
          sx={googleAppleBtn}
        >
          <AppleIcon sx={appleIcon} />
        </Button>
      </Box>
      <Typography
        variant="body1"
        sx={legend}
      >
        OR
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid }) => (
          <Form>
            <Box
              sx={flexcenter}
            >
              <Box
                sx={{
                  ...flexcenter,
                  ...inputsWrapper,
                }}
              >
                <Input
                  error={authError.email}
                  type="email"
                  name="email"
                  id="loginEmail"
                  placeholder="Enter your e-mail"
                  label="E-mail"
                  icon={<EmailIcon />}
                />
                <Input
                  error={authError.password}
                  type="password"
                  name="password"
                  id="loginPassword"
                  placeholder="Enter your password"
                  label="Password"
                  icon={<LockIcon />}
                />
              </Box>
              <Link
                component={NavLink}
                to="/forget-password"
                underline="none"
                sx={forgetPassword}
              >
                Forget Password ?
              </Link>
              <Button
                disableRipple
                variant="contained"
                sx={signInBtn}
                type="submit"
                disabled={!isValid}
              >
                Sign in
              </Button>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: 'text.primary',
                  width: '100%',
                }}
              >
                Create A New Account?
                <Button onClick={handleOpenSignUpForm} sx={signUpLink}>Sing Up</Button>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
