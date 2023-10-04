import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
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
import {
  closeModal, setContent,
} from '../../../redux/slices/modalSlice';
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
// eslint-disable-next-line import/no-cycle
import RegisterForm from '../RegisterForm/RegisterForm';
import GoogleSvgComponent from '../../../assets/svgComponents/GoogleSvgComponent';
import Input from '../../Input/Input';
import { setAuthorization } from '../../../redux/slices/authorizationSlice';
import { setUser } from '../../../redux/slices/userSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };
  const logUpContent = () => {
    dispatch(setContent(<RegisterForm />));
  };
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post('http://localhost:4000/api/customers/login', values);
      // Отримання токену і збереження його у локальному сховищі браузера
      const { token } = response.data;
      const { user } = response.data;
      if (token) {
        // todo: LS eslint

        // eslint-disable-next-line no-undef
        localStorage.setItem('token', token);
        // eslint-disable-next-line no-undef
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setUser(user));
        dispatch(setAuthorization(true));
        dispatch(closeModal());
      }
      // Перенаправлення користувача на іншу сторінку чи
      // відображення повідомлення про успішну авторизацію
    } catch (error) {
      // Обробка помилки, наприклад, відображення повідомлення про невірний логін чи пароль
      console.error('Помилка авторизації:', error);
    }
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
                  id="loginEmail"
                  placeholder="Enter your e-mail"
                  label="email"
                  icon={<EmailIcon />}
                />
                <Input
                  type="password"
                  name="password"
                  id="loginPassword"
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
                <Button onClick={logUpContent} sx={signUpLink}> Log In</Button>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
