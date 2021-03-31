import {
  createRequestAction,
  createActionType,
  XHRMethod,
} from "utils";
import firebase from "firebase/app";

// ------------------------Action constants---------------
// export const LOGIN = createActionType("LOGIN", XHRMethod.Get);
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

// ------------------------Action creators----------------
// export const someActionGetRequest = createRequestAction(LOGIN, "");

export const loginSuccess = (user: firebase.User | null) => ({
  type: LOGIN_SUCCESS,
  data: user,
});