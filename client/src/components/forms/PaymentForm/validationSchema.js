import { object, string } from 'yup';

const validationSchema = object({
  name: string()
    .required('Name is required'),
});

export default validationSchema;
