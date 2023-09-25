import React from 'react';
import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './LoginForm.module.scss';
import validationSchema from './validationSchema';
import Button from '../../Button/Button';
import AppleSvgComponent from './AppleSvgComponent';
import GoogleSvgComponent from './GoogleSvgComponent';
import Input from '../../Input/Input';
import EmailSvg from '../../../assets/svgComponents/EmailSvg';
import LockSvg from '../../../assets/svgComponents/LockSvg';

const LoginForm = () => {
  const initialValues = {
    email: '',
    password: '',
  };
  const handleSubmit = (values, actions) => {
    console.log(values);
    console.log(actions);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid }) => (
        <Form className={classNames(styles.formContainer)}>

          {/* <h1 className={classNames(styles.title)}>Sign In To eatly</h1>
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
            <div className={styles.inputsContainer}>
              <Input
                type="email"
                name="email"
                placeholder="Enter your e-mail"
                label="email"
                className={classNames(styles.inputWrapper)}
                icon={<EmailSvg />}
              />
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                label="password"
                className={classNames(styles.inputWrapper)}
                icon={<LockSvg />}
              />
            </div>
            <div className={classNames(styles.forgetPasswordWrapper)}>
              <Link to="/forgetPassword">Forget Password ?</Link>
            </div>
            <Button
              type="submit"
              onClick={() => { }}
              className={classNames(styles.button, styles.signInBtn)}
              disabled={!isValid}
            >
              SIGN IN
            </Button>
            <p className={classNames(styles.signUpLinkWrapper)}>
              Create A New Account?
              <Link to="/"> Sign Up</Link>
            </p>
          </div> */}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
