import { object, string } from 'yup';

const validationSchema = object({
  fullName: string()
    .min(2, 'Too short').max(40, 'Too long')
    .matches(/^[A-Za-zА-Яа-яЁё]+$/u)
    .required('Full Name is required'),
  email: string()
    .email('Invalid email format')
    .required('Email is required'),
});

export default validationSchema;
