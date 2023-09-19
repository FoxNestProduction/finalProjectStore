import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import AppRoutes from './AppRoutes';

function App() {
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
}

export default App;
