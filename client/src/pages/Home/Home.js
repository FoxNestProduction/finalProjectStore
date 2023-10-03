import React from 'react';
import { Typography } from '@mui/material';
import { shallowEqual, useSelector } from 'react-redux';
import SectionGetStarted from '../../components/SectionGetStarted/SectionGetStarted';
import ListItems from '../../components/ListItems/ListItem';

const HomePage = () => {
  const items = [];
  // const items = useSelector((state) => state.restaurant, shallowEqual);
  // console.log(items);
  return (
    <>
      <SectionGetStarted />
      <ListItems title="Our Top Restaurants" items={items} />
    </>
  );
};

export default HomePage;
