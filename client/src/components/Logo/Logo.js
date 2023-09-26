import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Logo = ({ className }) => {
  return (
    <Link to="/" className={className}>
      <img src="./img/logo.svg" alt="logo" />
      <p>eatly</p>
    </Link>
  );
};

export default Logo;

Logo.propTypes = {
  className: PropTypes.string,
};

Logo.defaultProps = {
  className: '',
};
