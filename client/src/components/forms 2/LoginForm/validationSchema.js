import { object, string } from 'yup';

const validationSchema = object({
  email: string()
    .required('Email is required')
    .email('Invalid email format'),
  password: string()
    .required('This field is required')
    .min(8, 'Password is too short - should be 8 chars minimum'),
});

export default validationSchema;
