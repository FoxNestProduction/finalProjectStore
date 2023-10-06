import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import SectionGetStarted from '../../components/SectionGetStarted/SectionGetStarted';
import ListItems from '../../components/ListItems/ListItem';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';
import ListItemAction from '../../components/ListItems/ListItemAction';
import { gridWidthRestaurant, gridWidthDishes } from '../../components/ListItems/styles';

const HomePage = () => {
  const itemsRestaurant = useSelector((state) => state.restaurant.restaurant, shallowEqual);
  const itemsDishes = useSelector((state) => state.products.products, shallowEqual);

  return (
    <>
      <SectionGetStarted />
      <ListItems title="Our Top Restaurants" items={itemsRestaurant} itemComponent={RestaurantItem} actions={<ListItemAction />} count={3} gridProps={gridWidthRestaurant} />
      {/* <ListItems title="Our Top Dishes" items={itemsRestaurant} */}
      {/*           itemComponent={ProductCardItem} actions={<ListItemAction />} count={5} */}
      {/*           gridProps={gridWidthDishes} /> */}
      <ListItems title="Our Top Dishes" items={itemsDishes} itemComponent={ProductCardItem} actions={<ListItemAction />} count={5} gridProps={gridWidthDishes} />
    </>
  );
};

export default HomePage;
