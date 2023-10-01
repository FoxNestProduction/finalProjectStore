import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { Button, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { object, string } from 'yup';

import AppleIcon from '@mui/icons-material/Apple';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonSvg from '@mui/icons-material/Person';
import GoogleSvgComponent from '../../../assets/svgComponents/GoogleSvgComponent';

// eslint-disable-next-line import/no-cycle
import LoginForm from '../LoginForm/LoginForm';
import { flexcenter, container, mainTitle, googleAppleBtnWrapper, googleAppleBtn, appleIcon, legend, inputsWrapper, signUpBtn, signUpLink } from './styles';
import Input from '../../Input/Input';
import { setContent } from '../../../redux/slices/modalSlice';

export const initialValues = {
  fullName: '',
  email: '',
  password: '',
};

const validationSchema = object({
  fullName: string()
    .required("Це поле обов'язкове для заповнення")
    .matches('^[A-Z][a-z]+ [A-Z][a-z]+$', "Введіть прізвище та ім'я"),
  email: string()
    .required("Це поле обов'язкове для заповнення")
    .email('Невірний формат e-mail'),
  password: string()
    .required("Це поле обов'язкове для заповнення")
    .min(8, 'Пароль має містити не менше восьми символів'),
});

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
        validationSchema={validationSchema}
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
              <Button onClick={logInContent}> Log In</Button>
            </Typography>
          </Box>
        </Form>
      </Formik>
    </Box>
  );
};

export default RegisterForm;
