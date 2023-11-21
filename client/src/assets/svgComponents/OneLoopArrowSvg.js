import React, { memo } from 'react';
import PropTypes from 'prop-types';

const OneLoopArrowSvg = ({ color }) => {
  return (
    <svg width="117" height="118" viewBox="0 0 117 118" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M57.9545 94.9949C47.2252 85.339 38.8069 73.1896 38.0046 58.5059C37.2806 45.2521 44.3231 35.2379 58.4214 41.1439C65.0953 43.9396 71.4587 51.6393 70.3128 59.0609C69.0362 67.3292 58.5027 63.3819 54.5536 59.1501C45.3299 49.2665 43.4373 32.8851 52.6569 22.5675C63.5751 10.3491 74.9329 24.3724 74.8255 24.4077" stroke={color} strokeWidth="2.09329" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42.5719 95.8242C43.8782 95.0961 45.3767 95.0149 46.8626 94.8559C51.7416 94.3332 57.2693 95.3597 61.4869 98.4709C58.0966 93.8961 55.1476 86.9063 57.1738 81.6141" stroke={color} strokeWidth="2.09329" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

OneLoopArrowSvg.propTypes = {
  color: PropTypes.string,
};

OneLoopArrowSvg.defaultProps = {
  color: '#6C5FBC',
};

export default memo(OneLoopArrowSvg);
