import { object, string } from 'yup';

const getValidationSchema = (partnerValidationNames) => {
  const descriptionValidationSchema = (Object.fromEntries(partnerValidationNames.map((name) => (
    [name, string().required('Required')]
  ))));

  return object({
    name: string()
      .required('Name is required'),
    address: string()
      .required('Address is required'),
    ...descriptionValidationSchema,
  });
};

export default getValidationSchema;
