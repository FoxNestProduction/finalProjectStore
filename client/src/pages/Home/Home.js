import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SectionGetStarted from '../../components/SectionGetStarted/SectionGetStarted';
import ListItems from '../../components/ListItems/ListItem';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import Features from '../../components/Features/Features';
import MobileApp from '../../components/MobileApp/MobileApp';
import SwiperReview from '../../components/SwiperReview/SwiperReview';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import { instance } from '../../API/instance';

const HomePage = () => {
  const topProducts = useSelector((state) => state.products.topProducts, shallowEqual);
  const topPartners = useSelector((state) => state.partners.topPartners, shallowEqual);

  return (
    <>
      <SectionGetStarted />
      <Features />
      <MobileApp />
      {topPartners.length > 0 && (
      <ListItems
        title="Our Top Restaurants"
        items={topPartners}
        itemComponent={RestaurantItem}
        actions={<ListItemAction type="partners" />}
        type="partners"
      />
      ) }
      {topProducts.length > 0 && (
      <ListItems
        title="Our Top Dishes"
        items={topProducts}
        itemComponent={ProductCardItem}
        actions={<ListItemAction />}
      />
      ) }
      <SwiperReview />
    </>
  );
};

export default HomePage;
