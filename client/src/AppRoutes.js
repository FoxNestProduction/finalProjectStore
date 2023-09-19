import React from 'react';
import { Route, Routes } from 'react-router';
import PublicLayout from './pages/Layout/Public Layout';
import BlogPage from './pages/Blog/Blog';
import ContactPage from './pages/Contact/Contact';
import HomePage from './pages/Home/Home';
import MenuPage from './pages/Menu/Menu';
import PricingPage from './pages/Pricing/Pricing';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/Menu" element={<MenuPage />} />
        <Route path="/Blog" element={<BlogPage />} />
        <Route path="/Pricing" element={<PricingPage />} />
        <Route path="/Contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
