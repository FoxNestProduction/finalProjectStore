import { object, string } from 'yup';

const validationSchema = (t) => object({
  email: string()
    .required(t('loginForm.requiredMail'))
    .email(t('loginForm.invalidMail')),
  password: string()
    .required(t('loginForm.requiredPassword'))
    .min(8, t('loginForm.invalidPassword')),
});

export default validationSchema;
