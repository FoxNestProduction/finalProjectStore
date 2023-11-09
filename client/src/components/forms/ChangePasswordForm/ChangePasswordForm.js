import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LockIcon from '@mui/icons-material/Lock';
import validationSchema from './validationShema';
import Input from '../../inputs/Input/Input';
import { flexcenter, mainTitle, signInBtn } from './styles';
import { instance } from '../../../API/instance';

const ChangePasswordForm = () => {
  const { userId } = useParams();
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    password: '',
    passwordConfirmation: '',
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError('');
      const response = await instance.post('/customers/reset-password', {
        id: userId,
        token,
        password: values.password,
      });
      // if (response.status === 200) {
      //   navigate('/');
      // }
      console.log(response.data.message);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Error changing password: ', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="section"
      sx={{
        ...flexcenter,
        py: 10,
        textAlign: 'center',
        bgcolor: 'background.default',
        width: '100%',
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={mainTitle}
      >
        Create new password
      </Typography>
      {error && (
      <Typography
        variant="body1"
        sx={{
          pb: '20px',
          mt: '-20px',
          color: 'text.error',
        }}
      >
        {error}
      </Typography>
      )}
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
                  type="password"
                  name="password"
                  id="resetPassword"
                  placeholder="Enter new password"
                  label="Password"
                  icon={<LockIcon />}
                />
                <Input
                  type="password"
                  name="passwordConfirmation"
                  id="resetPasswordConfirmation"
                  placeholder="Confirm your password"
                  label="Password confirmation"
                  icon={<LockIcon />}
                />
              </Box>
              <Button
                variant="contained"
                sx={signInBtn}
                type="submit"
                disabled={!isValid || loading}
              >
                Create Password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ChangePasswordForm;
