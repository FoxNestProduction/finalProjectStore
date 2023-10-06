import React from 'react';
import { Route, Routes } from 'react-router';
import PublicLayout from './components/Layout/PublicLayout';
import ContactPage from './pages/Contact/Contact';
import HomePage from './pages/Home/Home';
import MenuPage from './pages/Menu/Menu';
import PricingPage from './pages/Pricing/Pricing';
import AboutUsPage from './pages/AboutUs/AboutUs';
import ProductPage from './pages/Product/Product';
import ReviewsPage from './pages/Reviews/Reviews';
import Cart from './components/Cart/Cart';
import Favourites from './components/Favourites/Favourites';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/menu/:productName" element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
