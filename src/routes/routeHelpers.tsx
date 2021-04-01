import { Key, FC } from 'react';
import {
  Route,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

import ConnectedPrivateRoute from './PrivateRoute';
import {
  // public
  ConnectedSignIn,
  ConnectedSignUp,
  // privat
  ConnectedHome,
} from 'containers';
import Links from 'links';

export const routesConfig = {
  privateRoutes: [{
    path: Links.Home,
    component: ConnectedHome,
  }],
  publicRoutes: [{
    path: '/',
    component: () => <div>Start</div>,
  }, {
    path: Links.SignUp,
    component: ConnectedSignUp,
  }, {
    path: Links.Login,
    component: ConnectedSignIn,
  }],
};

export const getPublicRoutes = (routes: RouteProps[]) => routes.map(({ path, component }: RouteProps) => (
  <Route
    exact
    key={path as Key}
    path={path}
    component={component as FC}
  />
));

export const getPrivateRoutes = (routes: RouteProps[]) => routes.map(({ path, component }: RouteProps) => (
  <ConnectedPrivateRoute
    exact
    key={path as Key}
    path={path}
    component={component as FC<RouteComponentProps>}
  />
));
