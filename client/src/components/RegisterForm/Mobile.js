import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Form, Formik } from 'formik';
import { Button, Link } from '@mui/material';
import { useTheme } from '@emotion/react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Apple } from '../../assets/svg/apple.svg';
import { ReactComponent as Google } from '../../assets/svg/google.svg';
import PersonSvg from '../../assets/svgComponents/PersonSvg';
import EmailSvg from '../../assets/svgComponents/EmailSvg';
import LockSvg from '../../assets/svgComponents/LockSvg';

import styles from './RegisterForm.module.scss';
import Input from '../Input/Input';

export const initialValues = {
  fullName: '',
  email: '',
  password: '',
};

const Mobile = () => {
  const submit = (values) => {
    console.log(values);
  };
  const theme = useTheme();
  console.log(theme);
  return (
    <Container className={styles.container} component="section" sx={{ maxWidth: '310px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          sx={{
            mb: '38px',
            fontFamily: theme.typography.fontPoppins,
            fontSize: '28px',
            fontWeight: 600,
            color: '#323142',
          }}
        >
          Sign Up To eatly
        </Typography>
        <Box
          className={styles.buttons}
          sx={{
            width: '100%',
            display: 'flex  ',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: '17px',
          }}
        >
          <Button
            disableRipple
            sx={{
              width: '100%',
              height: '51px',
              backgroundColor: '#fbfacd',
              boxShadow: '5px 5px 10px #ffd292',
              border: 'none',
              transition: 'ease-in .4s',
              '&:hover': {
                backgroundColor: '#606060',
                boxShadow: '-5px -5px 10px #405672',
                border: '2px solid #ff7636',
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
              backgroundColor: '#fbfacd',
              boxShadow: '5px 5px 10px #ffd292',
              border: 'none',
              transition: 'ease-in .4s',
              '&:hover': {
                backgroundColor: '#606060',
                boxShadow: '-5px -5px 10px #405672',
                border: '2px solid #ff7636',
              },
            }}
          >
            <Apple className={styles.svg} />
          </Button>
        </Box>
        <Typography
          component="p"
          sx={{
            mt: '30px',
            mb: '30px',
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
          <Link component={NavLink} to="/Pricing">Log In</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Mobile;
