import React, { createContext, useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';

const AlertContext = createContext({});

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState('vcv');

  const value = useMemo(() => {
    return {
      alert,
      setAlert,
    };
  }, [alert]);

  console.log(value);

  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};

AlertContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(AlertContext);
