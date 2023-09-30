import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import AppRoutes from './AppRoutes';
import Modal from './components/Modal/Modal';
import ProductCard from './components/ProductCard/ProductCard';

const App = () => {
  const [products, setProducts] = useState([]);

  const getItems = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/products');
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Modal disagree="Close" />
      <AppRoutes />
      {/* <ProductCard /> */}
    </>
  );
};

export default App;
