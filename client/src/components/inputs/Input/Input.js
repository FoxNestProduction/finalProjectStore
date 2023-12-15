import React, { memo, useState } from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';

const Input = ({ type, label, icon, id, error, bgColor, styles, multiline, maxRows, ...props }) => {
  const [field, meta] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={Boolean(error || (meta.touched && meta.error))}
    >
      <InputLabel htmlFor={id}>
        {label}
      </InputLabel>
      <OutlinedInput
        multiline={multiline}
        maxRows={maxRows}
        sx={{
          bgcolor: `${bgColor}`,
          cursor: `${props.readOnly ? 'default' : 'initial'}`,
          '&:hover:not(.Mui-error):not(.Mui-focused):not(.Mui-disabled) > .MuiOutlinedInput-notchedOutline': {
            borderColor: `${props.readOnly ? 'primary.main' : 'primary.hover'}`,
          },
          '&.Mui-focused > .MuiOutlinedInput-notchedOutline': {
            borderWidth: `${props.readOnly ? '1px' : '2px'}`,
          },
          '& textarea::-webkit-scrollbar': {
            width: '8px',
          },
          '& textarea::-webkit-scrollbar-track': {
            backgroundColor: 'scrollbar.track',
            borderRadius: '12px',
          },
          '& textarea::-webkit-scrollbar-thumb': {
            backgroundColor: 'scrollbar.thumb',
            borderRadius: '12px',
          },
          '& input': {
            cursor: `${props.readOnly ? 'default' : 'initial'}`,
          },
          '& textarea': {
            cursor: `${props.readOnly ? 'default' : 'initial'}`,
          },
          ...styles,
        }}
        id={id}
        aria-describedby="helper-text"
        label={label}
        /* eslint-disable-next-line no-nested-ternary */
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        startAdornment={icon && (
          <InputAdornment
            position="start"
            sx={{
              mr: '12px',
            }}
          >
            {icon}
          </InputAdornment>
        )}
        endAdornment={type === 'password' && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{
                mr: '1px',
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )}
        {...field}
        {...props}
      />
      <FormHelperText id="helper-text">
        {error || (Boolean(meta.touched) && meta.error)}
      </FormHelperText>
    </FormControl>
  );
};

Input.propTypes = {
  error: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  icon: PropTypes.element,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  styles: PropTypes.object,
  multiline: PropTypes.bool,
  maxRows: PropTypes.number,
  readOnly: PropTypes.bool,
};

Input.defaultProps = {
  error: null,
  type: 'text',
  icon: null,
  label: '',
  bgColor: '#F9F9F9',
  styles: {},
  multiline: false,
  maxRows: 5,
  readOnly: false,
};

export default memo(Input);
