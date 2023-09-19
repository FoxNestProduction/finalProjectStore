import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import styles from './Input.module.scss';

const Input = ({ type, name, ...props }) => {
  // const [field, meta] = useField(name);
  //
  // return (
  //   <div className={styles.root}>
  //     <input {...field} {...props} />
  //     {meta.touched && meta.error && <span className={styles.error}>{meta.error}</span>}
  //   </div>
  // );

  return (
    <div className={styles.root}>
      <input {...props} />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
