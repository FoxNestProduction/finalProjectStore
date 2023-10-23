import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SectionGetStarted from '../../components/SectionGetStarted/SectionGetStarted';
import ListItems from '../../components/ListItems/ListItem';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import { partnersCardWidth } from '../../components/ListItems/styles';
import useSortedItems from '../../customHooks/useSortedItems';
import Features from '../../components/Features/Features';
import MobileApp from '../../components/MobileApp/MobileApp';
import SwiperReview from '../../components/SwiperReview/SwiperReview';
import TopDishes from '../../components/TopDishes/TopDishes';

const HomePage = () => {
  const partners = useSelector((state) => state.partners.partners, shallowEqual);
  const sortedPartners = useSortedItems(partners, partnersCardWidth);

  return (
    <>
      <SectionGetStarted />
      <Features />
      <MobileApp />
      <ListItems
        title="Our Top Restaurants"
        items={sortedPartners}
        itemComponent={RestaurantItem}
        actions={<ListItemAction type="partners" />}
        type="partners"
      />
      <TopDishes actions={<ListItemAction />} />
      <SwiperReview />
    </>
  );
};

export default HomePage;
