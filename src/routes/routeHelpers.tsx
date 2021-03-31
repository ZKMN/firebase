import { Key, FC } from 'react';
import {
  Route,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

import ConnectedPrivateRoute from './PrivateRoute';
import { Login } from 'containers';
import Links from 'links';

export const routesConfig = {
  privateRoutes: [],
  publicRoutes: [{
    path: '/',
    component: Login,
  }, {
    path: Links.Login,
    component: Login,
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
