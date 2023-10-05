import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import axios from 'axios';
import AppRoutes from './AppRoutes';
import ProductCardItem from './components/ProductCardItem/ProductCardItem';
import Modal from './components/Modal/Modal';
import ScrollTop from './components/ScrollTop/ScrollTop';
import { setAuthorization } from './redux/slices/authorizationSlice';
import { setUser } from './redux/slices/userSlice';

const App = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // todo: LS eslint

    // eslint-disable-next-line no-undef
    const token = localStorage.getItem('token');
    // eslint-disable-next-line no-undef
    const user = JSON.parse(localStorage.getItem('user'));
    if (token) {
      dispatch(setAuthorization(true));
      dispatch(setUser(user));
    }
  }, [dispatch]);

  // const getItems = async () => {
  //   try {
  //     const { data } = await axios.get('http://localhost:4000/api/products');
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Modal disagree="Close" />
      <AppRoutes />
      <ScrollTop />
    </>
  );
};

export default App;
