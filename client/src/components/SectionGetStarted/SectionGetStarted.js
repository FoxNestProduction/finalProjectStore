import React from 'react';
import { Typography, Link, Container, Box, Rating } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const SectionGetStarted = () => {
  const value = 4;

  return (
    <Container
      component="section"
    >
      <Typography component="span">
        OVER 1000 USERS
      </Typography>
      <Typography component="h1">
        Enjoy Foods All
        <br />
        Over The World
      </Typography>
      <Typography component="p">
        {/* eslint-disable-next-line max-len */}
        Eatly helps you set saving goals, earn cash back offers, and get paychecks up to two days early. Get a $20 bonus.
      </Typography>
      <Box>
        <Link component={RouterLink} to="/menu">
          Get Started
        </Link>
        <Link component={RouterLink} to="/Pricing">
          Go Pro
        </Link>
      </Box>
      <Box>
        <img src="/img/layout/trustpilotIcon.png" alt="" />
        <Typography component="span">Trustpilot</Typography>
        <Rating name="read-only" value={value} readOnly />
        <Typography component="span">4900+</Typography>
      </Box>
      <Box>
        <img src="/img/layout/getStartedSectionImage.jpg" alt="" />
      </Box>
    </Container>
  );
};

export default SectionGetStarted;
