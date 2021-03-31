import produce from "immer";
import { LOCATION_CHANGE } from 'react-router-redux';
import {
  SHOW_ERROR,

  RESET_REDUCER,
} from 'redux-base/actions';
import { IAppAction } from 'utils';

interface IReducerState {
  error: string | null | Record<string, unknown>;
}

const INITIAL_STATE: IReducerState = { error: null };

const error = produce(
  (draft: IReducerState, action: IAppAction) => {
    switch (action.type) {
      case SHOW_ERROR:
        draft.error = action.data.error;
        break;
      case LOCATION_CHANGE:
      case RESET_REDUCER:
        return INITIAL_STATE;
    }
  }, 
  INITIAL_STATE,
);

export default error;
