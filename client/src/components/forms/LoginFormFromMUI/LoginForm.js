import React from 'react';
import { Formik, Form } from 'formik';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import {
  Typography,
  Container,
  Box,
  Button,
  Link,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import styles from './LoginForm.module.scss';
import validationSchema from './validationSchema';
import { flexcenter } from './styles';
import AppleSvgComponent from './AppleSvgComponent';
import GoogleSvgComponent from './GoogleSvgComponent';
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
  const theme = useTheme();
  console.log(theme);
  const GoogleAppleBtn = styled(Button)({
    backgroundColor: '#EAEAEA',
    height: '46px',
    width: '148px',
    borderRadius: '10px',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    '@media (min-width: 481px)': {
      width: '130px',
    },
    '@media (min-width: 993px)': {
      width: '183px',
      height: '60px',
    },
    '&:hover': {
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
      // backgroundColor: '#EAEAEA',
    },
    '&:active': {
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
      transform: 'translateY(1px)',
    },
  });
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
          sx={{
            mb: {
              mobile: '38px',
              tablet: '34px',
              desktop: '27px',
            },
            color: 'text.primary',
            textAlign: 'center',
            fontWeight: {
              mobile: 'fontWeightSemiBold',
              desktop: 500,
            },
          }}
        >
          Sign In To eatly
        </Typography>
        <Box
          sx={{
            ...flexcenter,
            flexDirection: 'row',
            gap: {
              mobile: '17px',
              tablet: '15px',
              desktop: '21px',
            },
            mb: {
              mobile: '27px',
              tablet: '24px',
              desktop: '35px',
            },
          }}
        >
          <GoogleAppleBtn
            disableRipple
          >
            <GoogleSvgComponent />
          </GoogleAppleBtn>
          <GoogleAppleBtn
            disableRipple
          >
            <AppleSvgComponent />
          </GoogleAppleBtn>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: {
              mobile: '16px',
              tablet: '14px',
              desktop: '24px',
            },
            mb: {
              mobile: '31px',
              tablet: '28px',
              desktop: '26px',
            },
            fontWeight: {
              mobile: 500,
              desktop: 400,
            },
          }}
        >
          OR
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >

          {({ isValid }) => (
            <Form className={classNames(styles.formContainer)}>
              <Box
                sx={{
                  ...flexcenter,
                  gap: {
                    mobile: '20px;',
                    tablet: '17px',
                    desktop: '24px',
                  },
                  mb: {
                    mobile: '10px;',
                    tablet: '9px',
                    desktop: '24px',
                  },
                  width: {
                    mobile: '308px;',
                    tablet: '272px',
                    desktop: '493px',
                  },
                }}
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your e-mail"
                  label="email"
                  className={classNames(styles.inputWrapper)}
                  icon={<EmailSvg />}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  label="password"
                  className={classNames(styles.inputWrapper)}
                  icon={<LockSvg />}
                />
              </Box>

              <Link
                component={NavLink}
                to="/forgetPassword"
                underline="none"
                sx={{
                  fontFamily: 'fontFamily',
                  fontSize: {
                    mobile: '12px',
                    tablet: '11px',
                    desktop: '16px',
                  },
                  lineHeight: '1.5em',
                  transition: 'color 0.3s ease',
                  opacity: '0.7',
                  mb: {
                    mobile: '16px',
                    tablet: '14px',
                    desktop: '24px',
                  },
                  ':hover': {
                    color: 'primary.hover',
                  },
                }}
              >
                Forget Password ?
              </Link>
              <Button
                disableRipple
                variant="contained"
                sx={{
                  width: '100%',
                  mb: {
                    mobile: '19px',
                    tablet: '16px',
                    desktop: '24px',
                  },
                  borderRadius: {
                    mobile: '12px',
                    tablet: '11px',
                    desktop: '16px',
                  },
                  height: {
                    mobile: '60px',
                    tablet: '53px',
                    desktop: '60px',
                  },
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease',
                  ':hover': {
                    backgroundColor: 'primary.hover',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                  },
                  '&:active': {
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
                    transform: 'translateY(1px)', // під питанням
                    backgroundColor: 'common.white',
                    color: '#1C186C',
                    boxSizing: 'border-box',
                    border: '1px solid',
                    borderColor: 'primary.main',
                  },
                  fontSize: {
                    mobile: '14px',
                    desktop: '24px',
                  },
                  fontWeight: {
                    mobile: 600,
                    tablet: 600,
                    desktop: 400,
                  },
                  textTransform: {
                    mobile: 'uppercase',
                    tablet: 'uppercase',
                    desktop: 'capitalize;',
                  },
                }}
              >
                Sign in
              </Button>
              <Typography>
                Create A New Account?
                <Link
                  component={NavLink}
                  to="/signUp"
                  underline="none"
                >
                  {' '}
                  Sign Up
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default LoginForm;
