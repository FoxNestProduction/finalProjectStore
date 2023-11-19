import React, { memo } from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Textarea.module.scss';

const Textarea = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const [field, meta] = useField(props.name);

  return (
    <div className={styles.root}>
      <textarea
        className={classNames(styles.textarea, { [styles.error]: meta.touched && meta.error })}
        rows={6}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && <p className={styles.errorMessage}>{meta.error}</p>}
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
};

export default memo(Textarea);
