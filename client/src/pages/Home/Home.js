import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SectionGetStarted from '../../components/SectionGetStarted/SectionGetStarted';
import ListItems from '../../components/ListItems/ListItem';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import { partnersCardWidth, productsCardWidth } from '../../components/ListItems/styles';
import useSortedItems from '../../customHooks/useSortedItems';
import Features from '../../components/Features/Features';
import MobileApp from '../../components/MobileApp/MobileApp';
import SwiperBanner from '../../components/SwiperBanner/SwiperBanner';

const HomePage = () => {
  const partners = useSelector((state) => state.partners.partners, shallowEqual);
  const sortedPartners = useSortedItems(partners, partnersCardWidth);
  const products = useSelector((state) => state.products.products);
  const sortedProducts = useSortedItems(products, productsCardWidth);
  return (
    <>
      <SectionGetStarted />
      <Features />
      <MobileApp />
      <ListItems title="Our Top Restaurants" items={sortedPartners} itemComponent={RestaurantItem} actions={<ListItemAction />} type="partners" />
      <ListItems title="Our Top Dishes" items={sortedProducts} itemComponent={ProductCardItem} actions={<ListItemAction />} />
      <SwiperBanner />
    </>
  );
};

export default HomePage;
