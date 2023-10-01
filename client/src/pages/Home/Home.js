import React from 'react';
import { Typography } from '@mui/material';
import SectionGetStarted from '../../components/SectionGetStarted/SectionGetStarted';
import RegisterForm from '../../components/forms/RegisterForm/RegisterForm';

const HomePage = () => {
  return (
    <>
      <SectionGetStarted />
      <Typography variant="h1">Home</Typography>
      <RegisterForm />
    </>
  );
};

export default HomePage;
