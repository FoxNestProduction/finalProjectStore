import React, { memo, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LockIcon from '@mui/icons-material/Lock';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import validationSchema from './validationShema';
import Input from '../../inputs/Input/Input';
import { flexcenter, mainTitle, signInBtn } from './styles';
import { instance } from '../../../API/instance';
import useAlert from '../../../customHooks/useAlert';
import CustomAlert from '../../Alert/Alert';

const ChangePasswordForm = () => {
  const { userId } = useParams();
  const { token } = useParams();
  const navigate = useNavigate();
  const { alert, handleShowAlert, handleCloseAlert } = useAlert();
  const { i18n, t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const initialValues = {
    password: '',
    passwordConfirmation: '',
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError('');
      const response = await instance.post('/customers/reset-password', {
        id: userId,
        token,
        password: values.password,
      });
      if (response.status === 200) {
        setSuccess(true);
        handleShowAlert();
        setTimeout(() => {
          navigate('/');
        }, 2500);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {success && alert && (
        <CustomAlert
          type="success"
          handleCloseAlert={handleCloseAlert}
          content="Password was successfully changed!"
        />
      )}
      <Container
        component="section"
        sx={{
          ...flexcenter,
          py: 10,
          textAlign: 'center',
          bgcolor: 'background.default',
          width: '100%',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={mainTitle}
        >
          {t('changePassword.createNewPassword')}
        </Typography>
        {error && (
        <Typography
          variant="body1"
          sx={{
            pb: '20px',
            mt: '-20px',
            color: 'text.error',
          }}
        >
          {error}
        </Typography>
        )}
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
                    width: {
                      mobile: '100%;',
                      tablet: '350px',
                      desktop: '493px',
                    },
                  }}
                >
                  <Input
                    type="password"
                    name="password"
                    id="resetPassword"
                    placeholder={t('changePassword.placeholderEnter')}
                    label={t('changePassword.labelEnter')}
                    icon={<LockIcon />}
                  />
                  <Input
                    type="password"
                    name="passwordConfirmation"
                    id="resetPasswordConfirmation"
                    placeholder={t('changePassword.placeholderConfirm')}
                    label={t('changePassword.labelConfirm')}
                    icon={<LockIcon />}
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={signInBtn}
                  type="submit"
                  disabled={!isValid || loading}
                >
                  {!loading
                    ? t('changePassword.buttonCreate')
                    : <CircularProgress color="primary" />}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default memo(ChangePasswordForm);
