import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SectionGetStarted from '../../components/SectionGetStarted/SectionGetStarted';
import ListItems from '../../components/ListItems/ListItem';

const HomePage = () => {
  const items = useSelector((state) => state.restaurant.restaurant, shallowEqual);
  console.log(items);
  return (
    <>
      <SectionGetStarted />
      <ListItems title="Our Top Restaurants" items={items} />
    </>
  );
};

export default HomePage;
