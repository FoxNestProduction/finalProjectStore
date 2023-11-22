import { object, string } from 'yup';

const validationSchema = object({

  password: string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum'),
});

export default validationSchema;
