import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import validationSchema from './validationSchema';
import Input from '../../inputs/Input/Input';
import { instance } from '../../../API/instance';
import { setContent } from '../../../redux/slices/modalSlice';
import { flexcenter, mainTitle, legend, inputsWrapper, signInBtn } from './styles';
import SuccessfulLetter from '../../SuccessfulLetter/SuccessfulLetter';

const VerifyEmailForm = () => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  const initialValues = {
    email: '',
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (email) => {
    try {
      setLoading(true);
      setError('');
      const response = await instance.post('/customers/forgot-password', email);
      if (response.status === 200) {
        dispatch(setContent(<SuccessfulLetter />));
      }
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        ...flexcenter,
        width: '100%',
        bgcolor: 'common.white',
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={mainTitle}
      >
        {t('verifyMail.fogot')}
      </Typography>
      <Typography
        variant="body1"
        sx={legend}
      >
        {t('verifyMail.enterMail')}
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema(t)}
      >
        {({ isValid }) => (
          <Form>
            <Box
              sx={flexcenter}
            >
              <Box
                sx={{
                  ...flexcenter,
                  ...inputsWrapper,
                }}
              >
                <Input
                  error={error}
                  type="email"
                  name="email"
                  id="loginEmail"
                  placeholder={t('verifyMail.placeholder')}
                  label="E-mail"
                  icon={<EmailIcon />}
                />
              </Box>
              <Button
                variant="contained"
                sx={signInBtn}
                type="submit"
                disabled={!isValid || loading}
              >
                {!loading
                  ? t('buttonContinue')
                  : <CircularProgress color="primary" />}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default memo(VerifyEmailForm);
