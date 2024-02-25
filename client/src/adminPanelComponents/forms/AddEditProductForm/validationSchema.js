import { number, object, string } from 'yup';

const validationSchema = (validationNames) => {
  const descriptionValidationSchema = (Object.fromEntries(validationNames.map((name) => (
    [name, string().required('Required')]
  ))));

  return object({
    name: string()
      .required('Enter product name'),
    currentPrice: number()
      .required('Enter product price'),
    ...descriptionValidationSchema,
  });
};

export default validationSchema;
