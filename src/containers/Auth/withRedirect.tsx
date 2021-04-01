import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import { RootState } from 'index';
import Links from 'links';
import { useSelector } from 'react-redux';

export const withRedirectHOC = <T extends Record<string, unknown>>(WrappedComponent: React.FC<T>) => (props: T) => {
  const history = useHistory();
  const user = useSelector((state: RootState) => state.login.user);
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && user) {
      history.replace(Links.Home);
    }
  }, [user, isLoggedIn]);

  return <WrappedComponent {...props}/>;
};

