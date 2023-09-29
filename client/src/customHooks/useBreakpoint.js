import React, { useEffect, useState } from 'react';

const useBreakpoint = () => {
  const [breakPoint, setBreakPoint] = useState('mobile');

  useEffect(() => {
    const handleResize = () => {
      // eslint-disable-next-line no-undef
      if (window.innerWidth < 481) {
        setBreakPoint('mobile');
        // eslint-disable-next-line no-undef
      } else if (window.innerWidth < 993) {
        setBreakPoint('tablet');
      } else {
        setBreakPoint('desktop');
      }
    };

    handleResize();

    // eslint-disable-next-line no-undef
    window.addEventListener('resize', handleResize);
    return () => {
      // eslint-disable-next-line no-undef
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakPoint;
};

export default useBreakpoint;
