import { object, string } from 'yup';

const validationSchema = object({
  name: string()
    .required('Name is required')
    .matches(/^[A-Z][a-z]+$/, 'Name must be capitalized and contain only Latin letters'),
  email: string()
    .required('Email is required')
    .email('Invalid email format'),
  tel: string()
    .required('Phone number is required')
    .matches(/^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/, 'Invalid phone number'),
  street: string()
    .required('Enter the name of your street'),
  house: string()
    .required('Enter the number of your house'),
});

export default validationSchema;
