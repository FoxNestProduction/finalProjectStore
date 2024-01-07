import { object, string } from 'yup';

const validationSchema = (t) => object({
  name: string()
    .required(t('checkout.requiredName'))
    .matches(
      /^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+(?: [A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+)*$/,
      t('checkout.validationName'),
    ),
  email: string()
    .required(t('checkout.requiredMail'))
    .email(t('checkout.invalidMail')),
  tel: string()
    .required(t('checkout.requiredPhone'))
    .matches(/^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/, t('checkout.invalidPhone')),
  street: string()
    .required(t('checkout.requiredStreet'))
    .min(2, t('checkout.invalidStreet')),
  house: string()
    .required(t('checkout.requiredHose')),
});

export default validationSchema;
