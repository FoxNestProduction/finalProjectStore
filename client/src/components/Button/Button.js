import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  onClick,
  className,
  children,
  disabled,
  type,
  id,
  onKeyDown,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type={type === 'button' ? 'button' : 'submit'}
      disabled={disabled}
      id={id}
      onKeyDown={onKeyDown}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit']).isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onKeyDown: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  disabled: false,
  id: '',
  onKeyDown: null,
};

export default Button;
