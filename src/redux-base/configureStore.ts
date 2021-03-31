import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "react-router-redux";
import { BrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import { LOGOUT } from './actions';
import rootSaga from "./sagas/rootSaga";
import rootReducer from "./reducers/rootReducer";

export const configureStore = (history: BrowserHistory) => {
  const sagaMiddleware = createSagaMiddleware();
  const reduxRouterMiddleware = routerMiddleware(history);

  let createRootReducer = rootReducer(history);

  createRootReducer = (state, action) => {
    if (action.type === LOGOUT) {
      return rootReducer(history)(undefined, action);
    }

    return rootReducer(history)(state, action);
  };

  const store = createStore(
    createRootReducer,
    composeWithDevTools(
      applyMiddleware(
        reduxRouterMiddleware,
        sagaMiddleware,
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
