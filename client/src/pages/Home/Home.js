import React from 'react';
import { Typography } from '@mui/material';
import SectionGetStarted from '../../components/SectionGetStarted/SectionGetStarted';
import ListItems from '../../components/ListItems/ListItem';

const HomePage = () => {
  return (
    <>
      <SectionGetStarted />
      <ListItems title="Our Top Restaurants" />
    </>
  );
};

export default HomePage;
