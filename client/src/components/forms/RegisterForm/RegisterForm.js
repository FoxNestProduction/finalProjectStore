import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Form, Formik } from 'formik';
import { Button, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Apple } from '../../../assets/svg/apple.svg';
import { ReactComponent as Google } from '../../../assets/svg/google.svg';
import PersonSvg from '../../../assets/svgComponents/PersonSvg';
import EmailSvg from '../../../assets/svgComponents/EmailSvg';
import LockSvg from '../../../assets/svgComponents/LockSvg';

import styles from './RegisterForm.module.scss';
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
      className={styles.container}
      sx={{
        maxWidth: {
          zero: '270px',
          mobile: '270px',
          tablet: '310px',
          desktop: '350px',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          sx={{
            mb: {
              zero: '34px',
              mobile: '34px',
              tablet: '38px',
              desktop: '44px',
            },
            color: '#323142',
            fontSize: {
              zero: '25px',
              mobile: '25px',
              tablet: '28px',
              desktop: '38px',
            },
          }}
        >
          Sign Up To eatly
        </Typography>
        <Box
          className={styles.buttons}
          sx={{
            mb: {
              zero: '23px',
              mobile: '23px',
              tablet: '26px',
              desktop: '36px',
            },
            width: '100%',
            display: 'flex  ',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: {
              zero: '15px',
              mobile: '15px',
              tablet: '17px',
              desktop: '22px',
            },
          }}
        >
          <Button
            disableRipple
            variant="signWith"
            sx={{
              width: '100%',
              height: '51px',
              backgroundColor: 'background.footer',
              border: 'none',
              transition: 'ease-in .4s',
              '&:hover': {
                backgroundColor: 'background.healthy',
                boxShadow: '7px 7px 10px #DBD9EE',
                border: '2px solid #EAEAEA',
              },
            }}
          >
            <Google />
          </Button>
          <Button
            disableRipple
            sx={{
              width: '100%',
              height: '51px',
              backgroundColor: 'background.footer',
              border: 'none',
              transition: 'ease-in .2s',
              '&:hover': {
                backgroundColor: 'background.healthy',
                boxShadow: '7px 7px 10px #DBD9EE',
                border: '2px solid #EAEAEA',
              },
              '&:active': {
                backgroundColor: 'background.healthy',
              },
            }}
          >
            <Apple className={styles.svg} />
          </Button>
        </Box>
        <Typography
          component="p"
          variant="h3"
          sx={{
            mb: {
              zero: '23px',
              mobile: '23px',
              tablet: '26px',
              desktop: '36px',
            },
            color: 'text.secondaryLight',
          }}
        >
          OR
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
        >
          <Form className={styles.form}>
            <Input
              type="text"
              name="fullName"
              id="fullName"
              label="Full name"
              placeholder="Enter your full name"
              icon={<PersonSvg />}
            />
            <Input
              type="text"
              name="email"
              id="email"
              label="E-mail"
              placeholder="Enter your e-mail"
              icon={<EmailSvg />}
            />
            <Input
              type="password"
              name="password"
              id="password"
              label="Password"
              placeholder="Сome up with a password"
              icon={<LockSvg />}
            />
            <Button
              onClick={submit}
              type="submit"
              sx={{
                width: '100%',
                height: '60px',
                color: '#fff',
                backgroundColor: 'rgba(108, 95, 188, 1)',
                mt: '10px',
                borderRadius: '12px',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'rgba(108, 25, 188, 1)',
                },
              }}
            >
              SIGN UP
            </Button>
          </Form>
        </Formik>
        <Typography>
          Already Have An Account?
          <NavLink to="/Login"> Log In</NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
