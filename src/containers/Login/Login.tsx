import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from "firebase/app";

import { loginSuccess, logoutAction, showError } from 'redux-base/actions';
import { RootState } from 'index';
import { useMemoState } from 'hooks';

import { SendCodeForm } from './SendCodeForm';
import { RegisterForm } from './RegisterForm';

const mapStateToProps = (state: RootState) => ({ user: state.login.user });

const mapDispatchToProps = {
  loginSuccess,
  logoutAction,
  showError,
};

interface ILogin {
  user: firebase.User | null;
  loginSuccess: (user: firebase.User | null) => void;
  logoutAction: () => void;
  showError: (error: firebase.FirebaseError) => void;
}

export const Login = ({
  user,
  loginSuccess,
  logoutAction,
  showError,
}: ILogin) => {
  const [isCodeSent, setIsCodeSent] = useMemoState(false);
  const [isCaptchaLoading, setIsCaptchaLoading] = useMemoState(false);

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: () => {
        setIsCodeSent(true);
      },
    });
  }, []);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(userAuth => {
      if(userAuth) {
        loginSuccess(userAuth);
      }
    });

    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const logout = () => {
    logoutAction();
    firebase.auth().signOut();
  };

  if(user) {
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {user.displayName}! You are now signed-in!</p>
        <a onClick={logout}>Sign-out</a>
      </div>
    );
  }

  if(isCodeSent && !user) {
    return (
      <SendCodeForm
        loginSuccess={loginSuccess}
        showError={showError}
        onCapchaLoading={setIsCaptchaLoading}
        onCodeSent={setIsCodeSent}
      />
    );
  }

  return (
    <RegisterForm
      showError={showError}
      isCaptchaLoading={isCaptchaLoading}
      onCapchaLoading={setIsCaptchaLoading}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);