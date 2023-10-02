import React from 'react';
import { Outlet } from 'react-router-dom';
import RestaurantItem from '../RestaurantItem/RestaurantItem';
import Footer from '../Footer/Footer';
<<<<<<< HEAD
import ProductCardItem from '../ProductCardItem/ProductCardItem';
=======
import Header from '../Header/Header';
>>>>>>> dev

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <RestaurantItem />
        <ProductCardItem />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
