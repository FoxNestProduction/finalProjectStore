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
import GoogleSvgComponent from '../../../assets/svgComponents/GoogleSvgComponent';

// eslint-disable-next-line import/no-cycle
import LoginForm from '../LoginForm/LoginForm';
import validationSchema from './ValidationSchema';
import { flexcenter, container, mainTitle, googleAppleBtnWrapper, googleAppleBtn, appleIcon, legend, inputsWrapper, signUpBtn, signUpLink } from './styles';
import Input from '../../Input/Input';
import { setContent } from '../../../redux/slices/modalSlice';

export const initialValues = {
  fullName: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const dispatch = useDispatch();

  const submit = (values) => {
    console.log(values);
  };

  const logInContent = () => {
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
        onSubmit={submit}
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
                label="Full name"
                placeholder="Enter your full name"
                icon={<PersonSvg />}
              />
              <Input
                type="text"
                name="email"
                label="E-mail"
                placeholder="Enter your e-mail"
                icon={<EmailIcon />}
              />
              <Input
                type="password"
                name="password"
                id="password"
                label="Password"
                placeholder="Сome up with a password"
                icon={<LockIcon />}
              />
              <Button
                onSubmit={submit}
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
              <Button onClick={logInContent} sx={signUpLink}> Log In</Button>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterForm;
