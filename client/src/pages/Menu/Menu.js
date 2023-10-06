import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import Search from '../../components/Search/Search';
import ProductCardItem from '../../components/ProductCardItem/ProductCardItem';

const MenuPage = () => {
  const itemsFromSearch = useSelector((state) => state.search.search);
  console.log(itemsFromSearch);
  return (
    <>
      <Search />
      <RestaurantItem />
      <ProductCardItem />
    </>
  );
};

export default MenuPage;
