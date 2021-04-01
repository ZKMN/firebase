import React from 'react';
import { connect } from 'react-redux';
import firebase from "firebase/app";

import { logoutAction, showError } from 'redux-base/actions';
import { RootState } from 'index';

const mapStateToProps = (state: RootState) => ({ user: state.login.user });

const mapDispatchToProps = { logoutAction };

interface IHome {
  user: firebase.User | null;
  logoutAction: () => void;
}

const Home = ({
  user,

  logoutAction,
}: IHome) => {
  const logout = async () => {
    try {
      await firebase.auth().signOut();
      logoutAction();
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div>
      <h1>My App</h1>
      <p>Welcome {window?.userName || user?.displayName}! You are now signed-in!</p>
      <a onClick={logout}>Sign-out</a>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);