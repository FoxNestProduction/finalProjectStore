import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import AppRoutes from './AppRoutes';
import Input from './components/Input/Input';
import Button from './components/Button/Button';

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

      <div className="App" />
      <AppRoutes />
    </>
  );
};

export default App;
