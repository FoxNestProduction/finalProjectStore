import React, { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import Input from './components/Input/Input';

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
    <div className="App">
      <p>Lorem3</p>
      <Input name="name" type="text" placeholder="name" />
    </div>
  );
};

export default App;
