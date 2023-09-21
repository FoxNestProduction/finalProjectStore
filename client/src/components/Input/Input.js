import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
// eslint-disable-next-line import/no-extraneous-dependencies
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './Input.module.scss';

const CustomInput = ({ type, name, label, icon, isMultiline, ...props }) => {
  const [field, meta] = useField(name);

  // return (
  //   <div className={styles.root}>
  //     <input {...field} {...props} />
  //     {meta.touched && meta.error && <span className={styles.error}>{meta.error}</span>}
  //   </div>
  // );

  return (
    <TextField
      label={label}
      variant="outlined"
      // size="small"
      fullWidth
      error={Boolean(meta.touched && meta.error)}
      helperText={Boolean(meta.touched) && meta.error}
      style={{ fontSize: '24px' }}
      sx={{
        m: 1,
        '& .MuiOutlinedInput-notchedOutline': {
          borderRadius: '16px',
          border: '2px solid #6C5FBC',
          // '&$focused': {
          //   border: '2px solid #6C5FBC',
          // },
          // '&:hover': {
          //   borderColor: '',
          // },
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '2px solid #6C5FBC',
          borderColor: '#6CffBC',
        },
        // '& .MuiInputBase-input': {
        //   fontSize: '24px',
        // },
        '& .MuiOutlinedInput-root': {
          fontSize: '24px',
        },
      }}
      {...field}
      {...props}
    />
  );
  // const [showPassword, setShowPassword] = React.useState(false);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  //
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  // return (
  //   <FormControl sx={{ m: 1, width: '400px' }} variant="outlined">
  //     <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
  //     <OutlinedInput
  //       sx={{ outline: 'none' }}
  //       id="outlined-adornment-password"
  //       type={showPassword ? 'text' : 'password'}
  //       endAdornment={(
  //         <InputAdornment position="end">
  //           <IconButton
  //             aria-label="toggle password visibility"
  //             onClick={handleClickShowPassword}
  //             onMouseDown={handleMouseDownPassword}
  //             edge="end"
  //           >
  //             {showPassword ? <VisibilityOff /> : <Visibility />}
  //           </IconButton>
  //         </InputAdornment>
  //       )}
  //       label="Password"
  //     />
  //   </FormControl>
  // );
};

CustomInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  icon: PropTypes.element,
  label: PropTypes.string,
  isMultiline: PropTypes.bool,
};

CustomInput.defaultProps = {
  type: 'text',
  icon: null,
  label: '',
  isMultiline: false,
};

export default CustomInput;
