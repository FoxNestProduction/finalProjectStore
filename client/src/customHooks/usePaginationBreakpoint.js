import React, { useEffect, useState } from 'react';

const usePaginationBreakpoint = () => {
  const [breakPoint, setBreakPoint] = useState('mobileTablet');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 690) {
        setBreakPoint('mobileTablet');
      } else if (window.innerWidth < 993) {
        setBreakPoint('lgTablet');
      } else if (window.innerWidth < 1060) {
        setBreakPoint('desktop');
      } else {
        setBreakPoint('lgDesktop');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakPoint;
};

export default usePaginationBreakpoint;
