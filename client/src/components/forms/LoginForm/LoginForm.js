import React from 'react';
import { Formik, Form } from 'formik';
import { NavLink } from 'react-router-dom';
import {
  Typography,
  Container,
  Box,
  Button,
  Link,
} from '@mui/material';
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
} from './styles';
import AppleSvgComponent from '../AppleSvgComponent';
import GoogleSvgComponent from '../GoogleSvgComponent';
import Input from '../../Input/Input';
import EmailSvg from '../../../assets/svgComponents/EmailSvg';
import LockSvg from '../../../assets/svgComponents/LockSvg';

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
    <Container
      component="section"
      sx={{
        ...flexcenter,
        bgcolor: 'common.white',
      }}
    >
      <Box
        sx={{
          ...flexcenter,
          width: {
            mobile: 313,
            tablet: 276,
            desktop: 493,
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
            <AppleSvgComponent />
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
                    icon={<EmailSvg />}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    label="password"
                    icon={<LockSvg />}
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
    </Container>
  );
};

export default LoginForm;
