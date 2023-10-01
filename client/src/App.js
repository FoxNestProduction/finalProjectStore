import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import axios from 'axios';
import AppRoutes from './AppRoutes';
import Modal from './components/Modal/Modal';
import { setAuthorization } from './redux/slices/authorizationSlice';

const App = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(setAuthorization(true));
    }
  }, [dispatch]);

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
    </>
  );
};

export default App;
