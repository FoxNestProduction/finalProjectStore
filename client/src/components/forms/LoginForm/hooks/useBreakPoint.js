/* eslint-disable no-undef */
import { useState, useEffect } from 'react';

const useBreakPoint = () => {
  const breakPointValue = {
    mobile: 'mobile',
    tablet: 'tablet',
    desctop: 'desctop',
  };

  const [breakPoint, setBreakPoint] = useState(breakPointValue.mobile);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setBreakPoint(breakPointValue.mobile);
      } else if (window.innerWidth <= 992) {
        setBreakPoint(breakPointValue.tablet);
      } else {
        setBreakPoint(breakPointValue.desctop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return breakPoint;
};

export default useBreakPoint;
