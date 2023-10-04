import React from 'react';
import { Formik, Form } from 'formik';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import validationSchema from './validationSchema';
import {
  mainTitle,
  inputsWrapper,
  sendBtn,
  formWrapper,
  purpleArrow,
} from './styles';
import Input from '../../Input/Input';
import Textarea from '../../Textarea/Textarea';
import ArrowSvg from '../../../assets/svgComponents/ArrowSvg';

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
    <Box sx={formWrapper}>
      <Typography variant="h2" component="h1" sx={mainTitle}>
        Customer Support
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid }) => (
          <Form>
            <Box sx={inputsWrapper}>
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
              <Textarea name="message" placeholder="Enter the problem or query..." />
            </Box>
            <Button
              onSubmit={handleSubmit}
              disableRipple
              variant="contained"
              sx={sendBtn}
              type="submit"
            >
              Send Now
            </Button>
          </Form>
        )}
      </Formik>
      <Box sx={purpleArrow}>
        <ArrowSvg color="#6C5FBC" />
      </Box>
    </Box>
  );
};

export default ContactForm;
