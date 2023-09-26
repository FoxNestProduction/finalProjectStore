/* eslint-disable max-len */
import React from 'react';
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
import styles from './Input.module.scss';
import PersonSvg from '../../assets/svgComponents/PersonSvg';
import EmailSvg from '../../assets/svgComponents/EmailSvg';
import LockSvg from '../../assets/svgComponents/LockSvg';

// ------- Варіант зі стилізацією за допомогою scss -------
// const Input = ({ type, ...props }) => {
//   const [field, meta] = useField(props.name);
//
//   return (
//     <div className={styles.root}>
//       <input type={type} {...field} {...props} />
//       {meta.touched && meta.error && <span className={styles.error}>{meta.error}</span>}
//     </div>
//   );
// };

// ------- Варіант з використанням MUI -------

// ------- Приклад використання -------
// --- варіант з лейбл ----
// <Input name="name" id="name" label="Name" placeholder="Enter your name..."
// icon={<PersonSvg />} />
// --- варіант без лейбл ----
// <Input name="email" id="email" placeholder="Email" icon={<EmailSvg />} />
// <Input name="password" id="password" type="password" placeholder="Password" icon={<LockSvg />} />
// --- для textarea додаємо атрибут multiline ---
// <Input name="comment" id="comment" placeholder="Enter the problem or query..." multiline />

const Input = ({ type, label, icon, multiline, ...props }) => {
  const [field, meta] = useField(props.name);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      variant="outlined"
      error={Boolean(meta.touched && meta.error)}
    >
      <InputLabel
        htmlFor="input"
        sx={{
          color: 'primary.main',
        }}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        id="input"
        aria-describedby="helper-text"
        label={label}
        multiline={multiline}
        rows={multiline ? 3 : ''}
        /* eslint-disable-next-line no-nested-ternary */
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        startAdornment={(
          <InputAdornment position="start">
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
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )}
        {...field}
        {...props}
      />
      <FormHelperText id="helper-text">{Boolean(meta.touched) && meta.error}</FormHelperText>
    </FormControl>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  icon: PropTypes.element,
  label: PropTypes.string,
  multiline: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  icon: null,
  label: '',
  multiline: false,
};

export default Input;
