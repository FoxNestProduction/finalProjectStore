import { number, object, string } from 'yup';

const validationSchema = object({
  name: string()
    .required('Заповніть поле')
    .min(2, 'Ім\'я Занадто коротке'),
  email: string()
    .email('Невірний формат email')
    .required('Заповніть поле'),
  password: string()
    .required('Заповніть поле')
    .min(8, 'Пароль має складатись мінімум з 8 символів'),
  comment: string()
    .required('Заповніть поле'),
});

export default validationSchema;
