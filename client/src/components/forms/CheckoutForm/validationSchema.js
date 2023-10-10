import { object, string } from 'yup';

const validationSchema = object({
  firstName: string()
    .required('First name is required')
    .matches('^[A-Z][a-z]+$', 'The first name must be capitalized and contain only Latin letters'),
  lastName: string()
    .required('Last name is required')
    .matches('^[A-Z][a-z]+$', 'The last name must be capitalized and contain only Latin letters'),
  email: string()
    .required('Email is required')
    .email('Invalid email format'),
});

export default validationSchema;
