import { object, string } from 'yup';

const validationSchema = (t) => object({
  email: string()
    .required(t('verifyMail.required'))
    .email(t('verifyMail.invalid')),
});

export default validationSchema;
