import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';

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
import Input from '../../Input/Input';
import { closeModal, setContent } from '../../../redux/slices/modalSlice';
import { setAuthorization, setToken } from '../../../redux/slices/authorizationSlice';
import { setUser } from '../../../redux/slices/userSlice';
import { setAuthorizationError } from '../../../redux/slices/errorSlice';

export const initialValues = {
  fullName: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const { fullName, email, password } = values;
    const firstName = fullName.split(' ').splice(0, 1).join('');
    const lastName = fullName.split(' ').splice(1).join('');
    const login = fullName.toLowerCase().split(' ').join('-');

    const newCustomer = {
      firstName,
      lastName,
      email,
      password,
      login,
      isAdmin: false,
    };

    try {
      const response = await axios.post('http://localhost:4000/api/customers', newCustomer);
      console.log(response);
      // const { user } = response.data;
      // if (token) {
      // dispatch(setToken(token));
      // dispatch(setAuthorization(true));
      // dispatch(setUser(user));
      // dispatch(closeModal());
      // dispatch(setAuthorizationError(''));
      // }
    } catch (error) {
      // dispatch(setAuthorizationError(error.response.data));
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
              <Input
                type="text"
                name="fullName"
                id="registerFullName"
                label="Full name"
                placeholder="Enter your full name"
                icon={<PersonSvg />}
              />
              <Input
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
