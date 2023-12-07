import React from 'react';
import { Route, Routes } from 'react-router';
import { useTranslation } from 'react-i18next';
import PublicLayout from './components/Layout/PublicLayout';
import ContactPage from './pages/Contact/Contact';
import HomePage from './pages/Home/Home';
import MenuPage from './pages/Menu/Menu';
import RestaurantPage from './pages/Restaurant/Restaurant';
import AboutUsPage from './pages/AboutUs/AboutUs';
import ProductPage from './pages/Product/Product';
import PartnersPage from './pages/Partners/Partners';
import ReviewsPage from './pages/Reviews/Reviews';
import Cart from './components/Cart/Cart';
import Favourites from './components/Favourites/Favourites';
import CheckoutPage from './pages/Chechout/Checkout';
import CheckoutForm from './components/forms/CheckoutForm/CheckoutForm';
import OrderConfirmationPage from './pages/OrderConfirmation/OrderConfirmation';
import PaymentForm from './components/forms/PaymentForm/PaymentForm';
import ChangePasswordForm from './components/forms/ChangePasswordForm/ChangePasswordForm';
import NotFound from './pages/NotFound/NotFound';

const AppRoutes = () => {
  const { i18n, t } = useTranslation();

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/restaurants" element={<RestaurantPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/checkout" element={<CheckoutPage titleText={t('checkout.checkout')} formComponent={CheckoutForm} />} />
        <Route path="/checkout/payment" element={<CheckoutPage titleText={t('payment.payment')} formComponent={PaymentForm} />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/menu/:productName/:itemNo" element={<ProductPage />} />
        <Route path="/restaurants/:partnersName/:customId" element={<PartnersPage />} />
        <Route path="/recovery-password/:userId/:token" element={<ChangePasswordForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
