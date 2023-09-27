import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from './logo.svg';

const Logo = ({ className, classNameIcon }) => {
  return (
    <Link to="/" className={className}>
      <LogoIcon className={classNameIcon} />
      <p>eatly</p>
    </Link>
  );
};

export default Logo;

Logo.propTypes = {
  className: PropTypes.string,
  classNameIcon: PropTypes.string,
};

Logo.defaultProps = {
  className: '',
  classNameIcon: '',
};
