import { object, string } from 'yup';

const validationSchema = object({
  name: string()
    .required('This field is required')
    .min(2, 'Name is too short'),
  email: string()
    .required('Email is required')
    .email('Invalid email format'),
  message: string()
    .required('This field is required')
    .min(10, 'Message is too short'),
});

export default validationSchema;
