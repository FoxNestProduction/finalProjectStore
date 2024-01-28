import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import NotFound from '../../pages/NotFound/NotFound';

const AdminRoute = ({ element }) => {
  const isAuthorized = useSelector((state) => state.authorization.isUserAuthorized);
  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.isAdmin;

  if (!isAuthorized || !isAdmin) {
    return <NotFound />;
  }

  return element;
};

AdminRoute.propTypes = {
  element: PropTypes.element,
};

AdminRoute.defaultProps = {
  element: null,
};

export default AdminRoute;
