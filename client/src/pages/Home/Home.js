import React, { useEffect, useState } from 'react';
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
import SwiperReview from '../../components/SwiperReview/SwiperReview';
import useBreakpoint from '../../customHooks/useBreakpoint';
import { instance } from '../../API/instance';

const HomePage = () => {
  const [topDishes, setTopDishes] = useState([]);
  const partners = useSelector((state) => state.partners.partners, shallowEqual);
  const sortedPartners = useSortedItems(partners, partnersCardWidth);

  const breakpoint = useBreakpoint();
  // .slice(0, cardWidth[breakpoint]);

  useEffect(() => {
    (async () => {
      try {
        const response = await instance.get(`/products/filter?perPage=${productsCardWidth[breakpoint]}&sort=-rating`);
        setTopDishes(response.data.products);
      } catch (err) {
        console.error('Error getting top products: ', err);
      }
    })();
  }, [breakpoint]);

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
      <ListItems
        title="Our Top Dishes"
        topDish
        items={topDishes}
        itemComponent={ProductCardItem}
        actions={<ListItemAction />}
      />
      <SwiperReview />
    </>
  );
};

export default HomePage;
