import { number, object, string } from 'yup';

const validationSchema = object({
  name: string()
    .required('Enter product name'),
  price: number()
    .required('Enter product price'),
  descriptionEN: string()
    .required('Please describe dish'),
  descriptionUA: string()
    .required('Please describe dish'),
  descriptionPL: string()
    .required('Please describe dish'),
});

export default validationSchema;
