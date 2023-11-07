import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { useLocation } from 'react-router';
import { Box } from '@mui/material';
import AppRoutes from './AppRoutes';
import Modal from './components/Modal/Modal';
import ScrollTop from './components/ScrollTop/ScrollTop';
import { fetchTopProducts, getProducts } from './redux/slices/productsSlice';
import { fetchTopPartners } from './redux/slices/partnersSlice';
import saveUserInfoToSessionStorage from './utils/saveUserInfoToSessionStorage';
import useBreakpoint from './customHooks/useBreakpoint';
import { topPartnersQtyMap, topProductsQtyMap } from './constants/bpMapConstants';

import styles from './styles.module.scss';

const App = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const user = useSelector((state) => state.user.user, shallowEqual);
  const partners = useSelector((state) => state.partners.partners);
  const products = useSelector((state) => state.products.products, shallowEqual);
  const reviews = useSelector((state) => state.reviews.reviews, shallowEqual);
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

  useEffect(() => {
    dispatch(fetchTopProducts(topProductsQtyMap[breakpoint]));
    dispatch(fetchTopPartners(topPartnersQtyMap[breakpoint]));
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [breakpoint, dispatch]);

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Box className={styles.mainBackground}>
      <ul>
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
      <Modal disagree="Close" />
      <AppRoutes />
      <ScrollTop />
    </Box>
  );
};

export default App;
