import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import { useLocation } from 'react-router';
import axios from 'axios';
import AppRoutes from './AppRoutes';
import Modal from './components/Modal/Modal';
import ScrollTop from './components/ScrollTop/ScrollTop';
import { getProducts } from './redux/slices/productsSlice';
import { setAuthorization } from './redux/slices/authorizationSlice';
import { setUser } from './redux/slices/userSlice';
import { fetchRestaurant } from './redux/slices/restaurantSlice';
import { getReviews } from './redux/slices/reviewsSlice';
import { getCustomers } from './redux/slices/customersSlice';

const App = () => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(fetchRestaurant());
    dispatch(getReviews());
    dispatch(getCustomers());
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
