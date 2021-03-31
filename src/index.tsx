import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";

import { configureStore } from 'redux-base/configureStore';
import { AppRootComponent } from 'AppRootComponent';
import * as serviceWorkerRegistration from 'serviceWorkerRegistration';
import reportWebVitals from 'reportWebVitals';

import 'firebase';

import 'antd/dist/antd.css';
import 'index.css';

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    recaptchaWidgetId: any;
    userName: string;
  }
}

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhPd5BSgrcRhRf-ggO0S_eKLECYrPxwrY",
  authDomain: "test-ece03.firebaseapp.com",
  projectId: "test-ece03",
  storageBucket: "test-ece03.appspot.com",
  messagingSenderId: "991533934500",
  appId: "1:991533934500:web:a74adb621b2fb940308331",
  measurementId: "G-W5E8QR7ZJ0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();

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
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
