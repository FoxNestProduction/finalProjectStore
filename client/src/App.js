import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const getItems = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/products');
      console.log(data);// eslint-disable-next-line
    } catch (err) {
      console.log(err);// eslint-disable-next-line
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="App" />
  );
}

export default App;
