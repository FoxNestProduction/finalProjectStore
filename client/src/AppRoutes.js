import React from 'react';
import { Route, Routes } from 'react-router';
import PublicLayout from './components/Layout/PublicLayout';
import BlogPage from './pages/Blog/Blog';
import ContactPage from './pages/Contact/Contact';
import HomePage from './pages/Home/Home';
import MenuPage from './pages/Menu/Menu';
import PricingPage from './pages/Pricing/Pricing';
import AboutUsPage from './pages/AboutUs/AboutUs';
import RegisterPage from './pages/Register/Register';
import LoginPage from './pages/Login/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Menu" element={<MenuPage />} />
        <Route path="/Blog" element={<BlogPage />} />
        <Route path="/Pricing" element={<PricingPage />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/AboutUs" element={<AboutUsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
