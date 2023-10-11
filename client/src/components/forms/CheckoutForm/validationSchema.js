import { object, string } from 'yup';

const validationSchema = object({
  // firstName: string()
  //   .required('First name is required')
  //   .matches('^[A-Z][a-z]+$',
  //   'The first name must be capitalized and contain only Latin letters'),
  // lastName: string()
  //   .required('Last name is required')
  //   .matches('^[A-Z][a-z]+$',
  //   'The last name must be capitalized and contain only Latin letters'),
  name: string()
    .required('Name is required')
    .matches('^[A-Z][a-z]+$', 'The name must be capitalized and contain only Latin letters'),
  email: string()
    .required('Email is required')
    .email('Invalid email format'),
  street: string()
    .required('Enter the name of your street'),
  house: string()
    .required('Enter the number of your house'),
});

export default validationSchema;
