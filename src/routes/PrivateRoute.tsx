import React from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

import { RootState } from 'index';
import Links from 'links';

interface IPrivateRoute extends RouteProps {
  isLoggedIn: boolean;
  user: Record<string, unknown> | null;
  component: React.FC<RouteComponentProps>
}

export const PrivateRoute = ({
  component: Component,
  isLoggedIn,
  user,
  path,
  ...rest
}: IPrivateRoute) => (
  <Route
    {...rest}
    path={path}
    render={({
      location,
      match,
      history,
    }) => {
      if (!isLoggedIn && !user) {
        // not loggedIn - redirect to login page
        return (
          <Redirect
            to={{
              pathname: Links.Login,
              state: { redirectFrom: location.pathname },
            }}
          />
        );
      }

      return (
        <Component
          key={location.key} // leave key for update component when you click on same link in navigaton
          location={location}
          match={match}
          history={history}
        />
      );
    }}
  />
);

export default connect((state: RootState) => ({
  isLoggedIn: state.login.isLoggedIn,
  user: state.login.user,
}))(PrivateRoute);
