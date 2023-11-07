import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import validationSchema from './validationSchema';
import Input from '../../inputs/Input/Input';
import { closeModal } from '../../../redux/slices/modalSlice';
import { flexcenter, mainTitle, legend, inputsWrapper, signInBtn } from './styles';

const VerifyEmailForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.error.authorization);

  const initialValues = {
    email: '',
  };

  const handleSubmit = () => {
    navigate('/recovery-password/:token');
    dispatch(closeModal());
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
                  error={authError.email}
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
