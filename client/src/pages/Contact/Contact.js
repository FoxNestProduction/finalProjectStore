import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
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
import ArrowSvg from '../../assets/svgComponents/ArrowSvg';

const ContactPage = () => {
  const isXsMobile = useMediaQuery('(max-width: 380px)');
  const isXsTablet = useMediaQuery('(min-width: 481px) and (max-width: 600px)');
  const isLgTablet = useMediaQuery('(min-width: 690px)');

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
              { !isLgTablet ? 'Contact Us' : 'Just Contact' }
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
            mobile: `${isXsMobile ? '-30px' : '0'}`,
            tablet: `${isXsTablet ? '0' : '30px'}`,
          } }}
        >
          <ArrowSvg />
        </Box>

        <Box
          component="img"
          src="./img/mobile.png"
          alt="mobile phone"
          sx={imgMobile}
        />
      </Box>
      <ContactForm />
    </Container>
  );
};

export default ContactPage;
