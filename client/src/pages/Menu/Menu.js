import React from 'react';
import { useSelector } from 'react-redux';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import Search from '../../components/Search/Search';

const MenuPage = () => {
  const itemFromSearch = useSelector((state) => state.search.search);
  console.log(itemFromSearch);
  return (
    <>
      <Search />
      <RestaurantItem />
    </>
  );
};

export default MenuPage;
