import React from 'react';
import { Route, Routes } from 'react-router';
import PublicLayout from './components/Layout/PublicLayout';
import ContactPage from './pages/Contact/Contact';
import HomePage from './pages/Home/Home';
import MenuPage from './pages/Menu/Menu';
import PricingPage from './pages/Pricing/Pricing';
import AboutUsPage from './pages/AboutUs/AboutUs';
import ReviewsPage from './pages/Reviews/Reviews';
import Cart from './components/Cart/Cart';
import Favourites from './components/Favourites/Favourites';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/Menu" element={<MenuPage />} />
        <Route path="/Pricing" element={<PricingPage />} />
        <Route path="/Reviews" element={<ReviewsPage />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/AboutUs" element={<AboutUsPage />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Favourites" element={<Favourites />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
