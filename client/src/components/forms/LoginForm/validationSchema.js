import { object, string } from 'yup';

const validationSchema = object({
  email: string()
    .email('Invalid email format')
    .required('Email is required'),
});

export default validationSchema;
