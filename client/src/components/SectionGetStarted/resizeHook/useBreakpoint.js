import React, { useEffect, useState } from 'react';

const useBreakpoint = () => {
  const [breakPoint, setBreakPoint] = useState('mobile');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 481) {
        setBreakPoint('shortTitle');
      } else {
        setBreakPoint('fullTitle');
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
