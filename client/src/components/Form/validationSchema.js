import { number, object, string } from 'yup';

const validationSchema = object({
  firstName: string()
    .required('Заповніть поле')
    .min(2, 'Ім\'я Занадто коротке'),
  lastName: string()
    .required('Заповніть поле')
    .min(2, 'Прізвище Занадто коротке'),
  age: number()
    .typeError('Вік має бути числом')
    .required('Заповніть поле')
    .min(16, 'Вік повинен бути 16 і старше')
    .max(110, 'Вік має бути меншим за 110')
    .integer(),
});

export default validationSchema;
