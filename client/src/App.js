import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { useLocation } from 'react-router';
import { Box } from '@mui/material';
import AppRoutes from './AppRoutes';
import Modal from './components/Modal/Modal';
import ScrollTop from './components/ScrollTop/ScrollTop';
import { getProducts } from './redux/slices/productsSlice';
import { getPartners } from './redux/slices/partnersSlice';
import { getReviews } from './redux/slices/reviewsSlice';
import saveUserInfoToSessionStorage from './utils/saveUserInfoToSessionStorage';
import { setIsLoading } from './redux/slices/skeletonSlice';

import styles from './styles.module.scss';
import googleAuth from './services/googleAuth/googleAuth.js';

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

  const loading = () => {
    console.log(partners);
    console.log(products);
    console.log(reviews);
    dispatch(setIsLoading(true));
    if (partners && products && reviews) {
      dispatch(setIsLoading(false));
      console.log(partners);
      console.log(products);
      console.log(reviews);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    googleAuth();
  }, [pathname]);

  useEffect(() => {
    loading();
    dispatch(getPartners());
    dispatch(getProducts());
    dispatch(getReviews());
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
