import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";

import { configureStore } from 'redux-base/configureStore';
import { AppRootComponent } from 'AppRootComponent';
import * as serviceWorkerRegistration from 'serviceWorkerRegistration';
import reportWebVitals from 'reportWebVitals';
import 'index.css';

const history = createBrowserHistory();
const store = configureStore(history);

export type RootState = ReturnType<typeof store.getState>;

ReactDOM.render(
  <StrictMode>
    <AppRootComponent
      history={history}
      store={store}
    />
  </StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
