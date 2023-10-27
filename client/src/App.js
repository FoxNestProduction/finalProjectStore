import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { useLocation } from 'react-router';
import AppRoutes from './AppRoutes';
import Modal from './components/Modal/Modal';
import ScrollTop from './components/ScrollTop/ScrollTop';
import { fetchTopProducts, getProducts } from './redux/slices/productsSlice';
import { fetchTopPartners, getPartners } from './redux/slices/partnersSlice';
import { getReviews } from './redux/slices/reviewsSlice';
import saveUserInfoToSessionStorage from './utils/saveUserInfoToSessionStorage';
import useBreakpoint from './customHooks/useBreakpoint';

const App = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const user = useSelector((state) => state.user.user, shallowEqual);
  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);

  useEffect(() => {
    if (isUserAuthorized && user) {
      saveUserInfoToSessionStorage(user);
    }
  }, [isUserAuthorized, user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const breakpoint = useBreakpoint();

  const topProductsQtyMap = {
    mobile: 4,
    tablet: 4,
    lgTablet: 3,
    desktop: 5,
  };

  const topPartnersQtyMap = {
    mobile: 3,
    tablet: 3,
    lgTablet: 2,
    desktop: 3,
  };

  useEffect(() => {
    dispatch(fetchTopProducts(topProductsQtyMap[breakpoint]));
    dispatch(fetchTopPartners(topPartnersQtyMap[breakpoint]));
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [breakpoint, dispatch]);

  useEffect(() => {
    dispatch(getPartners());
    dispatch(getProducts());
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <>
      <Modal disagree="Close" />
      <AppRoutes />
      <ScrollTop />
    </>
  );
};

export default App;
