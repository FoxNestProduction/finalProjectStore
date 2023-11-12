import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import AppleIcon from '@mui/icons-material/Apple';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonSvg from '@mui/icons-material/Person';
import GoogleSvgComponent from '../../../assets/svgComponents/GoogleSvgComponent';
// eslint-disable-next-line import/no-cycle
import LoginForm from '../LoginForm/LoginForm';
import validationSchema from './validationSchema';
import {
  flexcenter,
  container,
  mainTitle,
  googleAppleBtnWrapper,
  googleAppleBtn,
  appleIcon,
  legend,
  inputsWrapper,
  signUpBtn,
  signInLink,
} from './styles';
import Input from '../../inputs/Input/Input';
import { closeModal, setContent } from '../../../redux/slices/modalSlice';
import { setAuthorization, setToken } from '../../../redux/slices/authorizationSlice';
import { setIsRegistrationSuccessful, setUser } from '../../../redux/slices/userSlice';
import { setRegistrationError } from '../../../redux/slices/errorSlice';
import { removeDataFromSessionStorage } from '../../../utils/sessionStorageHelpers';
import { CHECKOUT_SS_KEY } from '../../../constants/constants';
import saveUserInfoToSessionStorage from '../../../utils/saveUserInfoToSessionStorage';
import { instance } from '../../../API/instance';
import { getCartItemsFromServer } from '../../../redux/slices/cartSlice';
import useAlert from '../../../customHooks/useAlert';
import { setNewGoogleUser } from '../../../redux/slices/newGoogleUserSlice';
import CreatePasswordForm from '../CreatePassword/CreatePasswordForm';

export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const registerError = useSelector((state) => state.error.registration);
  const { handleShowAlert } = useAlert();

  const handleOpenLogInForm = () => {
    dispatch(setContent(<LoginForm />));
  };

  const authFunc = (value) => {
    const { user, token } = value;

    dispatch(setIsRegistrationSuccessful(true));
    handleShowAlert();
    setTimeout(() => {
      dispatch(setIsRegistrationSuccessful(false));
    }, 4000);

    dispatch(setToken(token));
    dispatch(setAuthorization(true));
    dispatch(setUser(user));
    dispatch(closeModal());
    dispatch(setRegistrationError(''));

    removeDataFromSessionStorage(CHECKOUT_SS_KEY);
    saveUserInfoToSessionStorage(user);
    dispatch(getCartItemsFromServer());
  };

  const handleSubmit = async (values) => {
    const newCustomer = {
      ...values,
      login: values.firstName + values.lastName,
      isAdmin: false,
    };

    try {
      const response = await instance.post('/customers', newCustomer);
      authFunc(response.data);
    } catch (error) {
      dispatch(setRegistrationError(error.response.data));
      console.error('Помилка реєстрації:', error.response.data);
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
        ...flexcenter,
        ...container,
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        sx={mainTitle}
      >
        Sign Up To eatly
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
          onClick={googleAuth}
          sx={googleAppleBtn}
        >
          <GoogleSvgComponent />
        </Button>
        {/* <Button
          disableRipple
          disabled
          variant="contained"
          sx={googleAppleBtn}
        >
          <AppleIcon sx={appleIcon} />
        </Button> */}
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
              sx={{
                ...flexcenter,
                flexDirection: 'column',
                ...inputsWrapper,
              }}
            >
              <Input
                type="text"
                name="firstName"
                id="registerFirstName"
                label="First name"
                placeholder="Enter your first name"
                icon={<PersonSvg />}
              />
              <Input
                type="text"
                name="lastName"
                id="registerLastName"
                label="Last name"
                placeholder="Enter your last name"
                icon={<PersonSvg />}
              />
              <Input
                error={registerError.message}
                type="text"
                name="email"
                id="registerEmail"
                label="E-mail"
                placeholder="Enter your e-mail"
                icon={<EmailIcon />}
              />
              <Input
                error={registerError.password}
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
            <Typography
              sx={flexcenter}
            >
              Already Have An Account?
              <Button onClick={handleOpenLogInForm} sx={signInLink}> Log In</Button>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterForm;
