import { object, string } from 'yup';

const validationSchema = object({
  fullName: string()
    .required('Enter your Full name')
    .matches('^[A-Z][a-z]+ [A-Z][a-z]+$', 'Enter Name and Last Name'),
  email: string()
    .required('Email is required')
    .email('Invalid email format'),
  password: string()
    .required('This field is required')
    .min(8, 'Password is too short - should be 8 chars minimum'),
});

export default validationSchema;
