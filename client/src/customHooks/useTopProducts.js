import { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import useBreakpoint from './useBreakpoint';
import { topProductsQtyMap } from '../constants/bpMapConstants';

const useTopProducts = () => {
  const topProducts = useSelector((state) => state.products.topProducts, shallowEqual);
  const breakpoint = useBreakpoint();

  return useMemo(
    () => topProducts.slice(0, topProductsQtyMap[breakpoint]),
    [breakpoint, topProducts],
  );
};

export default useTopProducts;
