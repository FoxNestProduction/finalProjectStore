import React from 'react';
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
import GoogleSvgComponent from '../../../assets/svgComponents/GoogleSvgComponent';
import Input from '../../Input/Input';

const LoginForm = () => {
  const initialValues = {
    email: '',
    password: '',
  };
  const handleSubmit = (values, actions) => {
    console.log(values);
    console.log(actions);
    actions.resetForm();
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
                  type="email"
                  name="email"
                  placeholder="Enter your e-mail"
                  label="email"
                  icon={<EmailIcon />}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  label="password"
                  icon={<LockIcon />}
                />
              </Box>
              <Link
                component={NavLink}
                to="/forgetPassword"
                underline="none"
                sx={forgetPassword}
              >
                Forget Password ?
              </Link>
              <Button
                onSubmit={handleSubmit}
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
                <Link component={NavLink} to="/signUp" underline="none" sx={signUpLink}> Sign Up</Link>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
