import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import firebase from "firebase/app";

import { loginSuccess, showError } from 'redux-base/actions';
import { RootState } from 'index';

import { SendCodeForm } from './SendCodeForm';
import { RegisterForm } from './RegisterForm';

const mapStateToProps = (state: RootState) => ({ user: state.login.user });

const mapDispatchToProps = {
  loginSuccess,
  showError,
};

interface ILogin {
  user: firebase.User | null;
  loginSuccess: (user: firebase.User | null) => void;
  showError: (error: firebase.FirebaseError) => void;
}

export const Login = ({
  user,
  loginSuccess,
  showError,
}: ILogin) => {
  const [IsCodeSent, setIsCodeSent] = useState<string | boolean>();

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }, []);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(userAuth => {
      if(!user) {
        loginSuccess(userAuth);
      }
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if(user) {
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {user.displayName}! You are now signed-in!</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }

  if(IsCodeSent && !user) {
    return (
      <SendCodeForm
        loginSuccess={loginSuccess}
        showError={showError}
      />
    );
  }

  return (
    <RegisterForm
      showError={showError}
      setIsCodeSent={setIsCodeSent}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);