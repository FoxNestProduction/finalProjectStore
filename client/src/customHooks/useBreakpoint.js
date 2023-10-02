import React, { useEffect, useState } from 'react';

const useBreakpoint = () => {
  const [breakPoint, setBreakPoint] = useState('mobile');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 481) {
        setBreakPoint('mobile');
      } else if (window.innerWidth < 690) {
        setBreakPoint('tablet');
      } else if (window.innerWidth < 993) {
        setBreakPoint('lgTablet');
      } else {
        setBreakPoint('desktop');
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

export default useBreakpoint;
