import React from 'react';
import { Outlet } from 'react-router-dom';
import RestaurantItem from '../RestaurantItem/RestaurantItem';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Search from '../Search/Search';

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <RestaurantItem />
      </main>
      <Search />
      <Footer />
    </>
  );
};

export default PublicLayout;
