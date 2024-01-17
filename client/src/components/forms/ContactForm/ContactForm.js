import React, { memo, useState } from 'react';
import { Formik, Form } from 'formik';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import validationSchema from './validationSchema';
import {
  mainTitle,
  inputsWrapper,
  sendBtn,
  formWrapper,
  purpleArrow,
} from './styles';
import Input from '../../inputs/Input/Input';
import Textarea from '../../inputs/Textarea/Textarea';
import OneLoopArrowSvg from '../../../assets/svgComponents/OneLoopArrowSvg';
import { instance } from '../../../API/instance';

const ContactForm = () => {
  const [messageReceived, setMessageReceived] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { i18n, t } = useTranslation();

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const handleSubmit = async (values, actions) => {
    try {
      setLoading(true);
      setError(false);
      setMessageReceived(false);
      const response = await instance.post('/support', values);
      if (response.status === 200) {
        setMessageReceived(true);
      }
      actions.resetForm();
    } catch (err) {
      setMessageReceived(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (e, handleChange) => {
    handleChange(e);
    setMessageReceived(false);
  };

  return (
    <Box sx={formWrapper}>
      <Typography variant="h2" component="h1" sx={mainTitle}>
        {t('contactForm.title')}
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isValid, handleChange }) => (
          <Form>
            <Box sx={inputsWrapper}>
              <Input
                type="text"
                name="name"
                id="contactName"
                placeholder={t('contactForm.placeholderName')}
                label={t('contactForm.labelName')}
                bgColor="#FFF"
                onChange={(e) => {
                  handleFieldChange(e, handleChange);
                }}
              />
              <Input
                type="email"
                name="email"
                id="contactEmail"
                placeholder={t('contactForm.placeholderMail')}
                label="E-mail"
                bgColor="#FFF"
                onChange={(e) => {
                  handleFieldChange(e, handleChange);
                }}
              />
              <Textarea
                name="message"
                placeholder={t('contactForm.placeholderText')}
                onChange={(e) => {
                  handleFieldChange(e, handleChange);
                }}
              />
            </Box>
            {messageReceived && (
            <Typography variant="body1" component="p" sx={{ color: 'primary.main', mb: '10px', pl: '5px' }}>
              {t('contactForm.messageReceived')}
            </Typography>
            )}
            {error && (
              <Typography variant="body1" component="p" sx={{ color: 'text.error', mb: '10px', pl: '5px' }}>
                {t('contactForm.error')}
              </Typography>
            )}
            <Box sx={{ textAlign: 'center' }}>
              <Button
                disableRipple
                variant="contained"
                sx={sendBtn}
                type="submit"
                disabled={!isValid || loading}
              >
                {!loading
                  ? t('contactForm.submit')
                  : <CircularProgress color="primary" />}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Box sx={purpleArrow}>
        <OneLoopArrowSvg color="#6C5FBC" />
      </Box>
    </Box>
  );
};

export default memo(ContactForm);
