import React from 'react';
import { useNavigate, useParams } from 'react-router';
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
import { instance } from '../../../API/instance';

const ChangePasswordForm = () => {
  const { userId } = useParams();
  const { token } = useParams();
  const navigate = useNavigate();

  const authError = useSelector((state) => state.error.authorization);

  const initialValues = {
    password: '',
    passwordConfirmation: '',
  };
  console.log(token);
  const handleSubmit = async (values) => {
    try {
      const { status } = await instance.post('/customers/reset-password', { id: userId, token, password: values.password });
      if (status === 200) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
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
                  placeholder="Confirm your password"
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
                Confirm
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ChangePasswordForm;
