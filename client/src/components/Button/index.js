import React from 'react';
import PropTypes from 'prop-types';

function Button({
  onClick,
  className,
  children,
  type,
  disabled,
  id,
  onKeyDown,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
      id={id}
      onKeyDown={onKeyDown}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onKeyDown: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  type: 'button',
  disabled: false,
  id: '',
  onKeyDown: null,
};

export default Button;
