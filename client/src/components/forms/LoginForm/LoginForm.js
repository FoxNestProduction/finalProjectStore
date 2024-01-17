/* eslint-disable import/no-cycle */
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Typography, Box, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useTranslation } from 'react-i18next';
import { closeModal, setContent } from '../../../redux/slices/modalSlice';
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
  googleText,
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

const LoginForm = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.error.authorization);
  const { handleShowAlert } = useAlert();
  const { i18n, t } = useTranslation();

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

  const authFunc = (data) => {
    const { token, user } = data;
    if (token) {
      dispatch(setToken(token));
      dispatch(setAuthorization(true));
      dispatch(closeModal());
      dispatch(setAuthorizationError(''));
      removeDataFromSessionStorage(CHECKOUT_SS_KEY);
      saveUserInfoToSessionStorage(user);
      dispatch(fetchCartAfterAuthorization());
      dispatch(fetchFavourites());
      handleShowAlert();
    }
  };

  const handleSubmit = async (values) => {
    const data = await dispatch(loginCustomer(values)).unwrap();
    if (data.success) {
      authFunc(data);
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
            authFunc(res.data);
          } else {
            const { data } = res;
            dispatch(setNewGoogleUser({
              email: data.email,
              firstName: data.given_name ? data.given_name : 'New',
              lastName: data.family_name ? data.family_name : 'User',
            }));
            dispatch(setContent(<CreatePasswordForm />));
          }
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
        {t('loginForm.title')}
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
            sx={googleText}
          >
            Google
          </Box>
        </Button>
        {/* <Button disabled disableRipple variant="contained" sx={googleAppleBtn}>
          <AppleIcon sx={appleIcon} />
        </Button> */}
      </Box>
      <Typography variant="body1" sx={legend}>
        {t('loginForm.or')}
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema(t)}
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
                  placeholder={t('loginForm.placeholderMail')}
                  label="E-mail"
                  icon={<EmailIcon />}
                />
                <Input
                  error={authError.password}
                  type="password"
                  name="password"
                  id="loginPassword"
                  placeholder={t('loginForm.placeholderPassword')}
                  label={t('loginForm.labelPassword')}
                  icon={<LockIcon />}
                />
              </Box>
              <Typography
                sx={forgetPassword}
                onClick={handleFogetPassword}
              >
                {t('loginForm.forgetPassword')}
                ?
              </Typography>
              <Button
                disableRipple
                variant="contained"
                sx={signInBtn}
                type="submit"
                disabled={!isValid}
              >
                {t('loginForm.signIn')}
              </Button>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: 'text.primary',
                  width: '100%',
                }}
              >
                {t('loginForm.createNewAccount')}
                ?
                <Button onClick={handleOpenSignUpForm} sx={signUpLink}>
                  {t('loginForm.signUp')}
                </Button>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default memo(LoginForm);
