import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as LogoIcon } from './logo.svg';

const Logo = ({ className, classNameIcon }) => {
  return (
    <div className={className}>
      <LogoIcon className={classNameIcon} />
      <p>eatly</p>
    </div>
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
