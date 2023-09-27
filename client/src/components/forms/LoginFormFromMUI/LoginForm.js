import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Typography, Container, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
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
  const GoogleAppleBtn = styled(Button)({
    backgroundColor: '#EAEAEA',
    height: '46px',
    width: '148px',
    borderRadius: 'shape',
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
        bgcolor: '#FFFFFF',
      }}
    >
      <Box
        sx={{
          ...flexcenter,
          width: {
            zero: 313,
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
              zero: '38px',
              tablet: '34px',
              desktop: '27px',
            },
            color: 'text.primary',
            textAlign: 'center',
          }}
        >
          Sign In To eatly
        </Typography>
        <Box
          sx={{
            ...flexcenter,
            flexDirection: 'row',
            gap: {
              zero: '17px',
              tablet: '15px',
              desktop: '21px',
            },
            mb: {
              zero: '27px',
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
              zero: '16px',
              tablet: '14px',
              desktop: '24px',
            },
            mb: {
              zero: '31px',
              tablet: '28px',
              desktop: '26px',
            },
            fontWeight: 500,
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
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default LoginForm;
