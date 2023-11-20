import { object, string } from 'yup';

const validationSchema = object({
  firstName: string()
    .required('Enter your first name')
    .matches('^[A-Z][a-z]+$', 'The first name must be capitalized and contain only Latin letters'),
  lastName: string()
    .required('Enter your last name')
    .matches('^[A-Z][a-z]+$', 'The last name must be capitalized and contain only Latin letters'),
  email: string()
    .required('Email is required')
    .email('Invalid email format'),
  password: string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches('^[A-Z][a-z]+$', 'Password must contain only Latin letters')
    .matches('[!@#$%^&*(),.?":{}|<>]'),
});

export default validationSchema;
