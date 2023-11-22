import { object, string } from 'yup';

const validationSchema = object({

  password: string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches('(.*[a-z].*)', 'Password must contain only Latin letters and special symbol')
    .matches('(.*[A-Z].*)', 'Password must contain only Latin letters and special symbol')
    .matches('(.*\\d.*)', 'Password must contain only Latin letters and special symbol')
    .matches('[!@#$%^&*(),.?":{}|<>]', 'Password must contain only Latin letters and special symbol'),
});

export default validationSchema;
