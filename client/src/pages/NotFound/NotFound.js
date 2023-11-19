import React, { memo } from 'react';
import { Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { stylesWrapper, stylesStatus, stylesDescription, stylesLink, stylesLeftArrow, stylesRightArrow, stylesStatusWrapper } from './styles';
import OneLoopArrowSvg from '../../assets/svgComponents/OneLoopArrowSvg';

const NotFound = () => (
  <Container component="div" sx={stylesWrapper}>
    <Box sx={stylesStatusWrapper}>
      <Box sx={stylesLeftArrow}><OneLoopArrowSvg /></Box>
      <Typography sx={stylesStatus} variant="h4">404</Typography>
      <Box sx={stylesRightArrow}><OneLoopArrowSvg /></Box>
    </Box>
    <Typography sx={stylesDescription} variant="body1">
      Oops, something went wrong!
      <br />
      The page you&apos;re looking for doesn&apos;t exist.
    </Typography>
    <Button
      sx={stylesLink}
      component={RouterLink}
      to="/"
    >
      Go To Home Page
    </Button>
  </Container>
);

export default memo(NotFound);
