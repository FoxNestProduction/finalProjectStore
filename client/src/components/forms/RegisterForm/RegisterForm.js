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
import axios from 'axios';
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
import { setUser } from '../../../redux/slices/userSlice';
import { setRegistrationError } from '../../../redux/slices/errorSlice';
import { removeDataFromSessionStorage, setDataToSessionStorage } from '../../../utils/sessionStorageHelpers';
import { CHECKOUT_LS_KEY } from '../../../constants';
import saveUserInfoToSessionStorage from '../../../utils/saveUserInfoToSessionStorage';

export const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const registerError = useSelector((state) => state.error.registration);

  const handleSubmit = async (values, actions) => {
    const newCustomer = {
      ...values,
      login: values.firstName + values.lastName,
      isAdmin: false,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/customers`, newCustomer);
      const { user, token } = response.data;

      dispatch(setToken(token));
      dispatch(setAuthorization(true));
      dispatch(setUser(user));
      dispatch(closeModal());
      dispatch(setRegistrationError(''));

      removeDataFromSessionStorage(CHECKOUT_LS_KEY);
      saveUserInfoToSessionStorage(user);
    } catch (error) {
      dispatch(setRegistrationError(error.response.data.message));
      console.error('Помилка реєстрації:', error);
    }
  };

  const handleOpenLogInForm = () => {
    dispatch(setContent(<LoginForm />));
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
          disabled
          variant="contained"
          sx={googleAppleBtn}
        >
          <GoogleSvgComponent />
        </Button>
        <Button
          disableRipple
          disabled
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
              sx={{
                ...flexcenter,
                flexDirection: 'column',
                ...inputsWrapper,
              }}
            >
              {/* <Input */}
              {/*  type="text" */}
              {/*  name="fullName" */}
              {/*  id="registerFullName" */}
              {/*  label="Full name" */}
              {/*  placeholder="Enter your full name" */}
              {/*  icon={<PersonSvg />} */}
              {/* /> */}
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
                error={registerError}
                type="text"
                name="email"
                id="registerEmail"
                label="E-mail"
                placeholder="Enter your e-mail"
                icon={<EmailIcon />}
              />
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
