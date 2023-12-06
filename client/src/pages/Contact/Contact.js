import React, { memo } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import ContactForm from '../../components/forms/ContactForm/ContactForm';
import {
  doubleLoopArrowWrapper,
  arrowWrapper,
  mainContainer,
  rect,
  rectTitleWrapper,
  rectWrapper,
  title, imgMobile,
} from './styles';
import DoubleLoopArrowSvg from '../../assets/svgComponents/DoubleLoopArrowSvg';
import OneLoopArrowSvg from '../../assets/svgComponents/OneLoopArrowSvg';

const ContactPage = () => {
  const isXsMobile = useMediaQuery('(max-width: 390px)');
  const isXsTablet = useMediaQuery('(min-width: 481px) and (max-width: 600px)');
  const isLgTablet = useMediaQuery('(min-width: 690px)');
  const { i18n, t } = useTranslation();

  return (
    <Container component="section" sx={mainContainer}>
      <Box sx={rectWrapper}>
        <Box sx={rect}>
          <Box sx={rectTitleWrapper}>

            <Typography
              variant="h2"
              component="h2"
              color="text.primaryLight"
              align="center"
              sx={title}
            >
              { !isLgTablet ? t('contactForm.contactUs') : t('contactForm.contactUs') }
            </Typography>

            <Box sx={doubleLoopArrowWrapper}>
              <DoubleLoopArrowSvg />
            </Box>

          </Box>
        </Box>
        <Box sx={{ ...arrowWrapper,
          position: 'absolute',
          top: '17px',
          left: {
            mobile: `${isXsMobile ? '-30px' : '-5px'}`,
            tablet: `${isXsTablet ? '-5px' : '30px'}`,
          } }}
        >
          <OneLoopArrowSvg />
        </Box>

        <Box
          component="img"
          src="./img/layout/mobile.png"
          alt="mobile phone"
          sx={imgMobile}
        />
      </Box>
      <ContactForm />
    </Container>
  );
};

export default memo(ContactPage);
