import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { Button, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import AppleIcon from '@mui/icons-material/Apple';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonSvg from '@mui/icons-material/Person';
import GoogleSvgComponent from '../../../assets/svgComponents/GoogleSvgComponent';

import { flexcenter, container, mainTitle, googleAppleBtnWrapper, googleAppleBtn, appleIcon, legend, inputsWrapper, signUpBtn, signUpLink } from './styles';
import Input from '../../Input/Input';

export const initialValues = {
  fullName: '',
  email: '',
  password: '',
};

const RegisterForm = () => {
  const submit = (values) => {
    console.log(values);
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
          sx={googleAppleBtn}
        >
          <GoogleSvgComponent />
        </Button>
        <Button
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
        onSubmit={submit}
      >
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
            >
              SIGN UP
            </Button>
            <Typography>
              Already Have An Account?
              <Link component={NavLink} to="/signIn" underline="none" sx={signUpLink}> Log In</Link>
            </Typography>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default RegisterForm;
