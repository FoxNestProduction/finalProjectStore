import React, { useEffect } from 'react';
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
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';

const HomePage = () => {
  const partners = useSelector((state) => state.partners.partners, shallowEqual);
  const sortedPartners = useSortedItems(partners, partnersCardWidth);
  const topProducts = useSelector((state) => state.products.topProducts);

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
