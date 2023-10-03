import React from 'react';
import { Typography } from '@mui/material';
import SectionGetStarted from '../../components/SectionGetStarted/SectionGetStarted';
import ReviewItem from '../../components/ReviewItem/ReviewItem';

const HomePage = () => {
  return (
    <>
      <SectionGetStarted />
      <ReviewItem />
      <Typography variant="h1">Home</Typography>
    </>
  );
};

export default HomePage;
