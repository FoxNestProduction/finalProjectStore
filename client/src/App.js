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
import { getDataFromSessionStorage } from './utils/sessionStorageHelpers';
import { CHECKOUT_SS_KEY } from './constants/constants';
import getMaxValue from './utils/getMaxValue';

const App = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const breakpoint = useBreakpoint();

  const user = useSelector((state) => state.user.user, shallowEqual);
  const isUserAuthorized = useSelector((state) => state.authorization.isUserAuthorized);

  useEffect(() => {
    const checkoutValues = getDataFromSessionStorage(CHECKOUT_SS_KEY);
    if (isUserAuthorized && user && !checkoutValues) {
      saveUserInfoToSessionStorage(user);
    }
  }, [isUserAuthorized, user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(fetchTopProducts(getMaxValue(topProductsQtyMap)));
    dispatch(fetchTopPartners(getMaxValue(topPartnersQtyMap)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFilterParams({
      perPage: productsPerPageMap[breakpoint],
    }));
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
