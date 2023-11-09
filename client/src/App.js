import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { useLocation } from 'react-router';
import AppRoutes from './AppRoutes';
import Modal from './components/Modal/Modal';
import ScrollTop from './components/ScrollTop/ScrollTop';
import { fetchTopProducts } from './redux/slices/productsSlice';
import { fetchTopPartners } from './redux/slices/partnersSlice';
import saveUserInfoToSessionStorage from './utils/saveUserInfoToSessionStorage';
import useBreakpoint from './customHooks/useBreakpoint';
import { productsPerPageMap, topPartnersQtyMap, topProductsQtyMap } from './constants/bpMapConstants';
import { setFilterParams } from './redux/slices/filterSlice';

const App = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const breakpoint = useBreakpoint();
  const user = useSelector((state) => state.user.user, shallowEqual);
  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  useEffect(() => {
    if (isUserAuthorized && user) {
      saveUserInfoToSessionStorage(user);
    }
  }, [isUserAuthorized, user]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    dispatch(fetchTopProducts(topProductsQtyMap[breakpoint]));
    dispatch(fetchTopPartners(topPartnersQtyMap[breakpoint]));
    dispatch(setFilterParams({
      perPage: productsPerPageMap[breakpoint],
    }));
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [breakpoint, dispatch]);
  return (
    <>
      <Modal disagree="Close" />
      <AppRoutes />
      <ScrollTop />
    </>
  );
};
export default App;
