/* eslint-disable import/no-cycle */
import React from 'react';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { NavLink, useLocation } from 'react-router-dom';
import { Typography, Box, Button, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AppleIcon from '@mui/icons-material/Apple';
import { closeModal, openModal, setContent } from '../../../redux/slices/modalSlice';
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
import RegisterForm from '../RegisterForm/RegisterForm';
import VerifyEmailForm from '../VerifyEmailForm/VerifyEmailForm';
import CreatePasswordForm from '../CreatePassword/CreatePasswordForm';
import GoogleSvgComponent from '../../../assets/svgComponents/GoogleSvgComponent';
import Input from '../../inputs/Input/Input';
import {
  setAuthorization,
  setToken,
} from '../../../redux/slices/authorizationSlice';
import { setUser } from '../../../redux/slices/userSlice';
import { setAuthorizationError } from '../../../redux/slices/errorSlice';
import { removeDataFromSessionStorage } from '../../../utils/sessionStorageHelpers';
import { CHECKOUT_SS_KEY } from '../../../constants/constants';
import saveUserInfoToSessionStorage from '../../../utils/saveUserInfoToSessionStorage';
import { instance } from '../../../API/instance';
import { fetchCart, updateCart } from '../../../redux/slices/cartSlice';
import { fetchFavourites } from '../../../redux/slices/favouriteSlice';
import useAlert from '../../../customHooks/useAlert';
import CustomAlert from '../../Alert/Alert';
import { setNewGoogleUser } from '../../../redux/slices/newGoogleUserSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.error.authorization);
  const cartProducts = useSelector((state) => state.cart.cart.products);
  const { handleShowAlert } = useAlert();
  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleOpenSignUpForm = () => {
    dispatch(setContent(<RegisterForm />));
  };

  const handleFogetPassword = () => {
    dispatch(setContent(<VerifyEmailForm />));
  };

  const authFunc = (value) => {
    const { token } = value.data;
    const { user } = value.data;
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
      handleShowAlert();
    }
  };

  const handleSubmit = async (values, actions) => {
    try {
      const response = await instance.post('/customers/login', values);
      authFunc(response);
    } catch (error) {
      dispatch(setAuthorizationError(error.response.data));
      console.error('Помилка авторизації:', error);
    }
  };

  // eslint-disable-next-line no-undef
  const googleClient = google.accounts.oauth2.initCodeClient({
    client_id: process.env.REACT_APP_CLIENT_ID,
    scope: ['profile', 'email', 'openid'].join(' '),
    ux_mode: 'popup',
    callback: (response) => {
      instance
        .post(`${process.env.REACT_APP_API_URL}/auth/googleAuth`, {
          code: response.code,
        })
        .then((res) => {
          if (res.status === 200) {
            authFunc(res);
          }
          const { data } = res;
          console.log(data);
          dispatch(setNewGoogleUser({
            email: data.email,
            firstName: data.given_name ? data.given_name : 'New',
            lastName: data.family_name ? data.family_name : 'User',
          }));
          dispatch(setContent(<CreatePasswordForm />));
        });
    },
  });

  const googleAuth = () => {
    googleClient.requestCode();
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
      <Typography variant="h2" component="h1" sx={mainTitle}>
        Sign In To eatly
      </Typography>
      <Box
        sx={{
          ...flexcenter,
          ...googleAppleBtnWrapper,
        }}
      >
        <Button
          disableRipple
          variant="contained"
          sx={googleAppleBtn}
          onClick={googleAuth}
        >
          <GoogleSvgComponent />
          <Box
            component="span"
            sx={{
              color: 'text.secondaryLightGrey',
              ml: '12px',
              fontWeight: 'fontWeightSemiBold',
              fontSize: {
                mobile: '18px',
                tablet: '20px',
                lgTablet: '22px',
                desktop: '24px',
              },
            }}
          >
            Google
          </Box>
        </Button>
        {/* <Button disabled disableRipple variant="contained" sx={googleAppleBtn}>
          <AppleIcon sx={appleIcon} />
        </Button> */}
      </Box>
      <Typography variant="body1" sx={legend}>
        OR
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid }) => (
          <Form>
            <Box sx={flexcenter}>
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
              {/* <Link
                component={NavLink}
                to="/forget-password"
                underline="none"
                sx={forgetPassword}
              >
                Forget Password ?
              </Link> */}
              <Typography
                sx={forgetPassword}
                onClick={handleFogetPassword}
              >
                Forget Password ?
              </Typography>
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
                <Button onClick={handleOpenSignUpForm} sx={signUpLink}>
                  Sing Up
                </Button>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
