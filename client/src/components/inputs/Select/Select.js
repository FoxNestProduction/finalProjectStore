import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@mui/material';
/* eslint-disable react/destructuring-assignment */
// const SelectForFormik = ({ children, label, labelId, id, icon, bgColor, ...props }) => {
// eslint-disable-next-line react/prop-types
const SelectForFormik = ({ field, form, children, bgColor, ...props }) => {
  return (
    <Select
      {...field}
      {...props}
      sx={{
        bgcolor: `${bgColor}`,
        '&:hover:not(.Mui-error):not(.Mui-focused) > .MuiOutlinedInput-notchedOutline': {
          borderColor: '#664FFF',
        },
      }}
    >
      {children}
    </Select>
  );
};

// SelectForFormik.propTypes = {
//   name: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
//   labelId: PropTypes.string.isRequired,
//   bgColor: PropTypes.string,
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node,
//   ]).isRequired,
// };
//
// SelectForFormik.defaultProps = {
//   bgColor: '#F9F9F9',
// };

export default SelectForFormik;
