import produce from "immer";
import {
  LOGIN_SUCCESS,

  SHOW_ERROR,
  RESET_REDUCER,
} from 'redux-base/actions';
import { IAppAction } from 'utils';

const INITIAL_STATE = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
};

const login = produce(
  (draft, action: IAppAction) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        draft.isLoading = false;
        draft.isLoggedIn = true;
        draft.user = action.data;
        break;
      case SHOW_ERROR:
        draft.isLoading = false;
        draft.isLoggedIn = false;
        break;
      case RESET_REDUCER:
        return INITIAL_STATE;
    }
  },
  INITIAL_STATE,
);

export default login;
