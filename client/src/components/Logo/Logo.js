import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ className }) => {
  return (
    <div className={className}>
      <img src="./img/logo.svg" alt="logo" />
      <p>eatly</p>
    </div>
  );
};

export default Logo;

Logo.propTypes = {
  className: PropTypes.string,
};

Logo.defaultProps = {
  className: '',
};
