import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_LOGIN,
  GET_LOGGED_ERROR,
  GET_LOGGED_SUCCESS,
  LOAD_LOGGED,
  LOAD_LOGGED_SUCCESS,
  LOAD_LOGGED_ERROR,
  SET_LOGOUT,
} from './constants';

export const initialState = {
  error: false,
  logged: false,
  currentUserName: false,
};

/* eslint-disable default-case, no-param-reassign */

const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SET_LOGOUT:
        draft.currentUserName = false;
        window.open('/HomePage', '_self');
        break;
      case GET_LOGIN:
        draft.error = false;
        draft.currentUserName = false;
        break;
      case GET_LOGGED_SUCCESS:
        draft.loading = false;
        draft.currentUserName = action.logged;
        break;

      case LOAD_LOGGED:
        draft.loading = true;
        draft.error = false;
        draft.logged = false;
        break;

      case LOAD_LOGGED_SUCCESS:
        draft.logged = action.logged;
        draft.loading = false;
        break;

      case LOAD_LOGGED_ERROR:
      case GET_LOGGED_ERROR:
        draft.error = 'action.error';
        draft.loading = false;
        break;
      default:
        break;
    }
  });

export default loginPageReducer;
