import { useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import useBreakpoint from './useBreakpoint';
import { topPartnersQtyMap } from '../constants/bpMapConstants';

const useTopPartners = () => {
  const topPartners = useSelector((state) => state.partners.topPartners, shallowEqual);
  const breakpoint = useBreakpoint();

  return useMemo(
    () => topPartners.slice(0, topPartnersQtyMap[breakpoint]),
    [breakpoint, topPartners],
  );
};

export default useTopPartners;
