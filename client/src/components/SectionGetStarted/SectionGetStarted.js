import React from 'react';
import { Typography, Container, Box, Rating, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useResize from './resizeHook/useResize';
import { stylesReviewAmount, stylesStarts, stylesTrustpilot, stylesProBnt, stylesStartedBnt, stylesTextContainer, stylesLabel, stylesTitle, stylesSection, stylesDescription, stylesActions, stylesRating, stylesImage } from './styles';

const SectionGetStarted = () => {
  const value = 4;
  const breakPoint = useResize();
  const breakPointsMap = {
    shortTitle:
  <>
    Enjoy Foods
    <br />
    Over World
  </>,
    fullTitle:
  <>
    Enjoy Foods All
    <br />
    Over The World
  </>,

  };

  return (
    <Container
      component="section"
      sx={stylesSection}
    >
      <Box sx={stylesTextContainer}>
        <Typography
          component="span"
          sx={stylesLabel}
        >
          OVER 1000 USERS
        </Typography>
        <Typography
          variant="h1"
          component="h1"
          sx={stylesTitle}
        >
          {breakPointsMap[breakPoint]}
        </Typography>
        <Typography component="p" sx={stylesDescription}>
          {/* eslint-disable-next-line max-len */}
          Eatly helps you set saving goals, earn cash back offers, and get paychecks up to two days early. Get a $20 bonus.
        </Typography>
        <Box sx={stylesActions}>
          <Button sx={stylesStartedBnt} component={RouterLink} to="/menu" variant="contained">
            Get Started
          </Button>
          <Button sx={stylesProBnt} component={RouterLink} to="/Pricing" variant="outlined">
            Go Pro
          </Button>
        </Box>
        <Box sx={stylesRating}>
          <img
            style={{
              position: 'relative',
              top: '-2px',
              left: '-2px',
            }}
            src="/img/layout/trustpilotIcon.png"
            alt=""
          />
          <Typography sx={stylesTrustpilot} component="span">Trustpilot</Typography>
          <Rating sx={stylesStarts} name="read-only" value={value} readOnly />
          <Typography sx={stylesReviewAmount} component="span">4900+</Typography>
        </Box>
      </Box>
      <Box sx={stylesImage}>
        <img src="/img/layout/getStartedSectionImage.png" alt="" />
      </Box>
    </Container>
  );
};

export default SectionGetStarted;
