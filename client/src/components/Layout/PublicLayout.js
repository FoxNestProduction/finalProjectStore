import React from 'react';
import { Outlet } from 'react-router-dom';
import RestaurantItem from '../RestaurantItem/RestaurantItem';
import Footer from '../Footer/Footer';
import ProductCardItem from '../ProductCardItem/ProductCardItem';
import Header from '../Header/Header';
import Search from '../Search/Search';

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <RestaurantItem />
        <ProductCardItem />
      </main>
      <Search />
      <Footer />
    </>
  );
};

export default PublicLayout;
