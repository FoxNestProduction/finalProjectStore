import { object, string, ref } from 'yup';

const validationSchema = (t) => object({
  password: string()
    .required(t('changePassword.required'))
    .min(8, t('changePassword.validationPass')),
  passwordConfirmation: string()
    .required(t('changePassword.required'))
    .min(8, t('changePassword.validationConfirmPass'))
    .oneOf([ref('password')], t('changePassword.unValidation')),
});

export default validationSchema;
