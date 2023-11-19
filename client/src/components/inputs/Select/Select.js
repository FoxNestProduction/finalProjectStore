import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Select } from '@mui/material';

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

SelectForFormik.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  bgColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

SelectForFormik.defaultProps = {
  bgColor: '#F9F9F9',
};

export default memo(SelectForFormik);
