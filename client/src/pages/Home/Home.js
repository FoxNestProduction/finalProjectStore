import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SectionGetStarted from '../../components/SectionGetStarted/SectionGetStarted';
import ListItems from '../../components/ListItems/ListItem';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import { partnersCardWidth, productsCardWidth } from '../../components/ListItems/styles';
import useBreakpoint from '../../customHooks/useBreakpoint';

const HomePage = () => {
  const breakpoint = useBreakpoint();
  const partners = useSelector((state) => state.partners.partners, shallowEqual);
  const sortedPartners = partners.slice()
    .sort((a, b) => b.rating - a.rating).slice(0, partnersCardWidth[breakpoint]);
  const products = useSelector((state) => state.products.products);
  const sortedProducts = products.slice()
    .sort((a, b) => b.rating - a.rating).slice(0, productsCardWidth[breakpoint]);

  return (
    <>
      <SectionGetStarted />
      <ListItems title="Our Top Restaurants" items={sortedPartners} itemComponent={RestaurantItem} actions={<ListItemAction />} type="partners" />
      <ListItems title="Our Top Dishes" items={sortedProducts} itemComponent={ProductCardItem} actions={<ListItemAction />} />
    </>
  );
};

export default HomePage;
