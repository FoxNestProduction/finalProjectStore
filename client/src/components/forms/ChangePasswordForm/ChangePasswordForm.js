import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LockIcon from '@mui/icons-material/Lock';
import validationSchema from './validationShema';
import Input from '../../inputs/Input/Input';
import { flexcenter, mainTitle, signInBtn } from './styles';

const CangePasswordForm = () => {
  const authError = useSelector((state) => state.error.authorization);

  const initialValues = {
    password: '',
    passwordConfirmation: '',
  };

  const handleSubmit = (value) => {
    console.log(value);
  };

  return (
    <Container
      component="section"
      sx={{
        ...flexcenter,
        py: 10,
        textAlign: 'center',
        bgcolor: 'common.white',
        width: '100%',
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={mainTitle}
      >
        Password recovery
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
                  width: {
                    mobile: '100%;',
                    tablet: '350px',
                    desktop: '493px',
                  },
                }}
              >
                <Input
                  error={authError.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  label="Password"
                  icon={<LockIcon />}
                />
                <Input
                  error={authError.password}
                  type="password"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  placeholder="Confirmation your password"
                  label="Password confirmation"
                  icon={<LockIcon />}
                />
              </Box>
              <Button
                variant="contained"
                sx={signInBtn}
                type="submit"
                disabled={!isValid}
              >
                Restore
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default CangePasswordForm;
