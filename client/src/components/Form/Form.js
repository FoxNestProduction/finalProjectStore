import React from 'react';
import { Form, Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import { TextField, Box, Button } from '@mui/material';
import validationSchema from './validationSchema';
import Input from '../Input/Input';
import EmailSvg from '../../assets/svgComponents/EmailSvg';
import PersonSvg from '../../assets/svgComponents/PersonSvg';
import LockSvg from '../../assets/svgComponents/LockSvg';

const PurchaseForm = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    comment: '',
  };

  const onSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid }) => (
        <Form style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '500px',
          margin: '0 auto',
        }}
        >
          <Input name="name" id="name" label="Name" placeholder="Enter your name..." icon={<PersonSvg />} />
          <Input name="email" id="email" placeholder="Email" icon={<EmailSvg />} />
          <Input name="password" id="password" type="password" placeholder="Password" icon={<LockSvg />} />
          { /* ----- для textarea додаємо атрибут multiline ----- */ }
          <Input name="comment" id="comment" placeholder="Enter the problem or query..." multiline />
          <Button type="submit">
            Підтвердити замовлення
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PurchaseForm;
