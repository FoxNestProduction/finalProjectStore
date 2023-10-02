import React from 'react';
import { Formik, Form } from 'formik';
import {
  Typography,
  Box,
  Button, TextareaAutosize,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import validationSchema from './validationSchema';
import {
  flexcenter,
  mainTitle,
  inputsWrapper,
  signInBtn,
} from './styles';
import Input from '../../Input/Input';
import Textarea from '../../Textarea/Textarea';

const ContactForm = () => {
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <Box
      sx={{
        ...flexcenter,
        m: '40px auto',
        width: {
          mobile: '100%',
          tablet: 350,
          desktop: 526,
        },
        bgcolor: 'transparent',
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
        Customer Support
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
                  alignItems: 'stretch',
                }}
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  label="name"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your e-mail"
                  label="email"
                />
                <Textarea
                  name="message"
                  placeholder="Enter the problem or query..."
                />
              </Box>
              <Button
                onSubmit={handleSubmit}
                disableRipple
                variant="contained"
                sx={signInBtn}
                type="submit"
              >
                Send Now
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ContactForm;
