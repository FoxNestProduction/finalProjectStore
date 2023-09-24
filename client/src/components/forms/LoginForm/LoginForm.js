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
  const initialValues = {
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

          <h1 className={classNames(styles.title)}>Sign In To eatly</h1>
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
          <div className={styles.signInForm}>
            <Field type="email" name="fullName" placeholder="email" className={classNames(styles.input)} />
            <Field type="password" name="fullName" placeholder="password" className={classNames(styles.input)} />
            <div className={classNames(styles.forgetPasswordWrapper)}>
              <Link to="/forgetPassword" className={classNames(styles.forgetPassword)}>Forget Password ?</Link>
            </div>
            <Button
              type="submit"
              onClick={() => { }}
              className={classNames(styles.button)}
              disabled={!isValid}
            >
              SIGN IN
            </Button>
            <p>
              Create A New Account?
              <Link to="/">Sign Up</Link>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
