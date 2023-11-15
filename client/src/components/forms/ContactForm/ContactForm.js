import React, { memo } from 'react';
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
import Input from '../../inputs/Input/Input';
import Textarea from '../../inputs/Textarea/Textarea';
import OneLoopArrowSvg from '../../../assets/svgComponents/OneLoopArrowSvg';

const ContactForm = () => {
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    // actions.resetForm();
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
                id="contactName"
                placeholder="Enter your name"
                label="Name"
                bgColor="#FFF"
              />
              <Input
                type="email"
                name="email"
                id="contactEmail"
                placeholder="Enter your e-mail"
                label="E-mail"
                bgColor="#FFF"
              />
              <Textarea name="message" placeholder="Enter the problem or query..." />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                disableRipple
                variant="contained"
                sx={sendBtn}
                type="submit"
                disabled={!isValid}
              >
                Send Now
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Box sx={purpleArrow}>
        <OneLoopArrowSvg color="#6C5FBC" />
      </Box>
    </Box>
  );
};

export default memo(ContactForm);
