import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const [products, setProducts] = useState([]);

const getItems = async () => {
  try {
    const { data } = await axios('/products');
    console.log(data);
    // setProducts(data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  getItems();
}, []);

function App() {
  return (
    <div className="App" />
  );
}

export default App;
