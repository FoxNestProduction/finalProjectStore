import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import AppRoutes from './AppRoutes';
import Modal from './components/Modal/Modal';
import ScrollTop from './components/ScrollTop/ScrollTop';
import { getProducts } from './redux/slices/productsSlice';
import { getPartners } from './redux/slices/partnersSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getPartners());
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
