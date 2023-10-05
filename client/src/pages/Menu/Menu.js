import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import Search from '../../components/Search/Search';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';

const MenuPage = () => {
  return (
    <>
      <Search />
      <RestaurantItem />
      <ProductCardItem />
    </>
  );
};

export default MenuPage;
