import { number, object, string } from 'yup';

const validationSchema = (validationNames) => {
  const descriptionValidationSchema = (Object.fromEntries(validationNames.map((name) => (
    [name, string().required('Required')]
  ))));

  return object({
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
    ...descriptionValidationSchema,
  });
};

export default validationSchema;
