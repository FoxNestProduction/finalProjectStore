import { object, string } from 'yup';

const validationSchema = object({
  name: string()
    .required('Name is required')
    .matches(
      /^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+(?: [A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+)*$/,
      `Name must start with a capital letter and may contain only Latin or Ukrainian letters.
      If providing both name and surname, please separate them with a space.`,
    ),
  email: string()
    .required('Email is required')
    .email('Invalid email format'),
  tel: string()
    .required('Phone number is required')
    .matches(/^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/, 'Invalid phone number'),
  street: string()
    .required('Enter the name of your street')
    .min(2, 'The name of the street is too short.'),
  house: string()
    .required('Enter the number of your house'),
});

export default validationSchema;
