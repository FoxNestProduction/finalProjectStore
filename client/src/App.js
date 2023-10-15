import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { useLocation } from 'react-router';
import axios from 'axios';
import AppRoutes from './AppRoutes';
import Modal from './components/Modal/Modal';
import ScrollTop from './components/ScrollTop/ScrollTop';
import { getProducts } from './redux/slices/productsSlice';
import { getPartners } from './redux/slices/partnersSlice';
import { setUser } from './redux/slices/userSlice';

const App = () => {
  // const location = useLocation();
  // console.log('location App', location);

  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // const token = useSelector((state) => state.authorization.token);
  // useEffect(() => {
  //   const newConfigs = {
  //     customId: 'eatly-global-configs',
  //     development: {
  //       database: {
  //         uri: 'mongodb+srv://admin:Xzwxj5fM4sxm1Z1F@cluster0.me12bv8.mongodb.net/foodtoorder?retryWrites=true&w=majority',
  //       },
  //       email: {
  //         mailUser: 'foodtoorder.fe17@gmail.com',
  //         mailPassword: 'Fe172023',
  //         mailService: 'gmail',
  //       },
  //       auth: {
  //         secretOrKey: 'Xzwxj5fM4sxm1Z1F',
  //       },
  //     },
  //     production: {
  //       database: {
  //         uri: 'mongodb+srv://admin:Xzwxj5fM4sxm1Z1F@cluster0.me12bv8.mongodb.net/foodtoorder?retryWrites=true&w=majority',
  //       },
  //       email: {
  //         mailUser: 'foodtoorder.fe17@gmail.com',
  //         mailPassword: 'Fe172023',
  //         mailService: 'gmail',
  //       },
  //       auth: {
  //         secretOrKey: 'Xzwxj5fM4sxm1Z1F',
  //       },
  //     },
  //   };
  //
  //   (async () => {
  //     try {
  //       const response = await axios.post('http://localhost:4000/api/configs', newConfigs, {
  //         headers: { 'Authorization': token },
  //       });
  //       console.log(response);
  //     } catch (err) {
  //       console.log('Error adding configs: ', err);
  //     }
  //   })();
  // }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(getPartners());
    dispatch(getProducts());
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
