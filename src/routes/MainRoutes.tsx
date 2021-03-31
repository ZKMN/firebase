import {
  Route,
  Switch,
  RouteChildrenProps,
} from 'react-router-dom';

import { ConnectedCoreLayout } from 'containers';
import { NotFoundPage } from 'components';

import {
  routesConfig,
  getPublicRoutes,
  getPrivateRoutes,
} from './routeHelpers';

export const MainRoutes = ({
  location,
  history,
  match,
}: RouteChildrenProps) => (
  <ConnectedCoreLayout
    location={location}
    history={history}
    match={match}
  >
    <Switch>
      { getPublicRoutes(routesConfig.publicRoutes) }
      { getPrivateRoutes(routesConfig.privateRoutes) }
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </ConnectedCoreLayout>
);
