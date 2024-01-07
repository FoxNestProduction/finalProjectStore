import { object, string } from 'yup';

const validationSchema = (t) => object({
  firstName: string()
    .required(t('registrationForm.requiredFirstName'))
    .matches('^[A-Z][a-z]+$', t('registrationForm.invalidFirstName')),
  lastName: string()
    .required(t('registrationForm.requiredLastName'))
    .matches('^[A-Z][a-z]+$', t('registrationForm.invalidLastName')),
  email: string()
    .required(t('registrationForm.requiredMail'))
    .email(t('registrationForm.invalidMail')),
  password: string()
    .required(t('registrationForm.requiredPassword'))
    .min(8, t('registrationForm.invalidPassword')),
});

export default validationSchema;
