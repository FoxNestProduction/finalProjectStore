import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './LoginForm.module.scss';
import validationSchema from './validationSchema';
import Button from '../../Button/Button';
import AppleSvgComponent from './AppleSvgComponent';
import GoogleSvgComponent from './GoogleSvgComponent';

const LoginForm = () => {
  console.log('Hello');
  const initialValues = {
    fullName: '',
    email: '',
    password: '',
  };
  const handleSubmit = (values, actions) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid }) => (
        <Form className={classNames(styles.formContainer)}>
          <h1 className={classNames(styles.title)}>Sign Up To eatly</h1>
          <div className={classNames(styles.buttonWrapper)}>
            <Button
              type="button"
              onClick={() => { }}
              className={classNames(styles.button)}
            >
              <GoogleSvgComponent />
            </Button>
            <Button
              type="button"
              onClick={() => { }}
              className={classNames(styles.button)}
            >
              <AppleSvgComponent />
            </Button>
          </div>
          <p className={classNames(styles.legend)}>OR</p>
          <Field type="text" name="fullName" placeholder="full name" />
          <Field type="email" name="fullName" placeholder="email" />
          <Field type="password" name="fullName" placeholder="password" />
          <button type="submit" disabled={!isValid}>SIGN UP</button>
          <p>
            Already Have An Account?
            <Link to="/">Log in</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
