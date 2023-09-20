import React from 'react';
import SignUpForm from '../../components/forms/SignUpForm/SignUpForm.module';

const HomePage = () => {
  console.log(SignUpForm);
  return (
    <>
      <h1>Home</h1>
      <SignUpForm />
    </>
  );
};

export default HomePage;
