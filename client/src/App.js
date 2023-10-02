import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import axios from 'axios';
import AppRoutes from './AppRoutes';
import Modal from './components/Modal/Modal';
import ScrollTop from './components/ScrollTop/ScrollTop';
import { setProducts } from './redux/slices/productsSlice';

const App = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/products');
        console.log(data);
        dispatch(setProducts(data));
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
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
