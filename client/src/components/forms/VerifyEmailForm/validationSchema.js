import { object, string } from 'yup';

const validationSchema = object({
  email: string()
    .required('Email is required')
    .email('Invalid email format'),
});

export default validationSchema;
