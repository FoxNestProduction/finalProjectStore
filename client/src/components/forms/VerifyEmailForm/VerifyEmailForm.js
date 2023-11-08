import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import validationSchema from './validationSchema';
import Input from '../../inputs/Input/Input';
import { instance } from '../../../API/instance';
import { closeModal } from '../../../redux/slices/modalSlice';
import { setIsSendMail } from '../../../redux/slices/authorizationSlice';
import { flexcenter, mainTitle, legend, inputsWrapper, signInBtn } from './styles';

const VerifyEmailForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
  };

  const [error, setError] = useState('');

  const handleSubmit = async (email) => {
    try {
      setError('');
      const response = await instance.post('/customers/forgot-password', email);
      if (response.status === 200) {
        dispatch(setIsSendMail(true));
        dispatch(closeModal());
      }
    } catch (err) {
      console.log('Error sending mail: ', err);
      setError(err.response.data.message);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        ...flexcenter,
        width: '100%',
        bgcolor: 'common.white',
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={mainTitle}
      >
        Forget Password
      </Typography>
      <Typography
        variant="body1"
        sx={legend}
      >
        Enter Your Mail To Reset
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
                  error={error}
                  type="email"
                  name="email"
                  id="loginEmail"
                  placeholder="Enter your e-mail"
                  label="E-mail"
                  icon={<EmailIcon />}
                />
              </Box>
              <Button
                variant="contained"
                sx={signInBtn}
                type="submit"
                disabled={!isValid}
              >
                Verify
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default VerifyEmailForm;
