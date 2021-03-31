import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from "firebase/app";
import { Row, Col } from 'antd';

import { loginSuccess } from 'redux-base/actions';
import { RootState } from 'index';

import { ICoreLayoutProps } from "./CoreLayoutTypes";
import './CoreLayout.css';

const mapStateToProps = (state: RootState) => ({ user: state.login.user });

const mapDispatchToProps = { loginSuccess };

export const CoreLayout = ({ children, user, loginSuccess }: ICoreLayoutProps) => {
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(userAuth => {
      if(!user && userAuth) {
        loginSuccess(userAuth);
  
        if(window.userName) {
          userAuth.updateProfile({ displayName: window.userName });
        }
      }
    });
  
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return(
    <Row justify='center' align="middle" className="core">
      <Col xs={24}>
        {children}
      </Col>
    </Row>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);