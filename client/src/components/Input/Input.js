import React, { useState } from 'react';
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

// ------- Приклад використання -------

// --- варіант з лейбл ----
// <Input name="name" id="name" label="Name" placeholder="Enter your name..."
// icon={<PersonSvg />} />
// --- варіант без лейбл ---
// просто не передавати label

// --- для textarea додаємо атрибут multiline ---
// <Input name="comment" id="comment" placeholder="Enter the problem or query..." multiline />

const Input = ({ type, label, icon, multiline, id, error, bgColor, ...props }) => {
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
        sx={{
          bgcolor: `${bgColor}`,
          '&:hover:not(.Mui-error):not(.Mui-focused) > .MuiOutlinedInput-notchedOutline': {
            borderColor: '#664FFF',
          },
        }}
        id={id}
        aria-describedby="helper-text"
        label={label}
        multiline={multiline}
        rows={multiline ? 3 : ''}
        /* eslint-disable-next-line no-nested-ternary */
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        startAdornment={(
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
  multiline: PropTypes.bool,
  id: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
};

Input.defaultProps = {
  error: null,
  type: 'text',
  icon: null,
  label: '',
  multiline: false,
  bgColor: '#F9F9F9',
};

export default Input;
