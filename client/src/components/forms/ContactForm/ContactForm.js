import React from 'react';
import { Formik, Form } from 'formik';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import validationSchema from './validationSchema';
import {
  mainTitle,
  inputsWrapper,
  sendBtn,
  mainContainer,
  rectWrapper,
  formWrapper, rect, rectTitleWrapper,
} from './styles';
import Input from '../../Input/Input';
import Textarea from '../../Textarea/Textarea';
import ArrowSvg from '../../../assets/svgComponents/ArrowSvg';
import DoubleLoopArrowSvg from '../../../assets/svgComponents/DoubleLoopArrowSvg';

const ContactForm = () => {
  const isXsMobile = useMediaQuery('(max-width: 380px)');
  const isXsTablet = useMediaQuery('(min-width: 481px) and (max-width: 600px)');
  const islgTablet = useMediaQuery('(min-width: 690px)');

  const initialValues = {
    name: '',
    email: '',
    message: '',
  };
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };
  return (
    <Container
      component="section"
      sx={mainContainer}
    >
      <Box sx={rectWrapper}>
        <Box sx={rect}>
          <Box sx={rectTitleWrapper}>

            <Typography
              variant="h2"
              component="h2"
              color="text.primaryLight"
              align="center"
              sx={{ pt: '24px', fontSize: { tablet: '32px', lgTablet: '28px', desktop: '36px' } }}
            >
              { !islgTablet ? 'Contact Us' : 'Just Contact' }
            </Typography>
            <Box sx={{
              position: 'absolute',
              bottom: '-90px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: {
                mobile: 'none',
                lgTablet: 'block',
              },
            }}
            >
              <DoubleLoopArrowSvg />
            </Box>
          </Box>
        </Box>
        <Box sx={{
          display: {
            mobile: 'block',
            lgTablet: 'none',
          },
          position: 'absolute',
          top: '17px',
          left: {
            mobile: `${isXsMobile ? '-30px' : '0'}`,
            tablet: `${isXsTablet ? '0' : '30px'}`,
          },
        }}
        >
          <ArrowSvg />
        </Box>

        <Box
          component="img"
          sx={{
            display: {
              mobile: 'none',
              lgTablet: 'block',
            },
            position: 'absolute',
            top: {
              lgTablet: '200px',
              desktop: '170px',
            },
            right: '0',
            transform: 'translateX(58%)',
            width: {
              lgTablet: '220px',
              desktop: '270px',
            },
          }}
          alt="mobile phone"
          src="./img/mobile.png"
        />
      </Box>
      <Box
        sx={formWrapper}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={mainTitle}
        >
          Customer Support
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ isValid }) => (
            <Form>
              <Box
                sx={inputsWrapper}
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  label="name"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your e-mail"
                  label="email"
                />
                <Textarea
                  name="message"
                  placeholder="Enter the problem or query..."
                />
              </Box>
              <Button
                onSubmit={handleSubmit}
                disableRipple
                variant="contained"
                sx={sendBtn}
                type="submit"
              >
                Send Now
              </Button>
            </Form>
          )}
        </Formik>
        <Box sx={{
          display: {
            mobile: 'none',
            lgTablet: 'block',
          },
          position: 'absolute',
          bottom: '-20%',
          left: '-22%',
          transform: 'rotate(-78deg)',
        }}
        >
          <ArrowSvg color="#6C5FBC" />
        </Box>
      </Box>
    </Container>
  );
};

export default ContactForm;
