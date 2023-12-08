import { object, string } from 'yup';

const validationSchema = (t) => object({

  password: string()
    .required(t('createPassword.required'))
    .min(8, t('createPassword.validationPass')),
});

export default validationSchema;
