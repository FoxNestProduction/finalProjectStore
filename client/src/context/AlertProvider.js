import React, { createContext, useEffect, useRef, useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';

export const AlertContext = createContext({});

export const AlertContextProvider = memo(({ children }) => {
  const [alert, setAlert] = useState(false);
  const handleCloseAlert = () => {
    setAlert((prev) => !prev);
  };

  const handleShowAlert = (e) => {
    e.preventDefault();
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  };

  const value = useMemo(() => {
    return {
      alert,
      handleCloseAlert,
      handleShowAlert,
    };
  }, [alert]);

  console.log(value);

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
});

AlertContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
