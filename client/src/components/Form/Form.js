import React from 'react';
import { Form, Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import { TextField, Box, Button } from '@mui/material';
import validationSchema from './validationSchema';
import CustomInput from '../Input/Input';

const PurchaseForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    age: '',
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
        <Form>
          <h3>Оформлення замовлення</h3>
          <Field
            name="firstName"
            id="firstName"
            as={TextField}
            label="Ім'я"
            variant="outlined"
            size="small"
            margin="normal"
            // sx={{
            //   mb: '10px',
            // }}
          />
          <CustomInput name="lastName" id="lastName" label="Прізвище" />
          <Box height={14} />
          <CustomInput name="age" id="age" label="Вік" multiline rows={2} />
          <Button type="submit">
            Підтвердити замовлення
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default PurchaseForm;
