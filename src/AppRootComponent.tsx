import { Route } from 'react-router';
import { Provider } from 'react-redux';
import { History } from "history";
import { ConnectedRouter } from 'connected-react-router';

import { configureStore } from './redux-base/configureStore';
import { MainRoutes } from './routes/MainRoutes';

export interface IAppRootComponent {
  history: History,
  store: ReturnType<typeof configureStore>
}

export const AppRootComponent = ({
  history,
  store,
}: IAppRootComponent) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route
        render={({ location, history, match }) => (
          <MainRoutes
            location={location}
            history={history}
            match={match}
          />
        )}
      />
    </ConnectedRouter>
  </Provider>
);
