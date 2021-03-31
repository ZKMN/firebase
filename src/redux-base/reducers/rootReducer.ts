import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { BrowserHistory } from "history";
import login from "./login";
import error from "./error";

const rootReducer = (history: BrowserHistory) => combineReducers({
  router: connectRouter(history),
  login,
  error,
});

export default rootReducer;
